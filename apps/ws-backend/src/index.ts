import {WebSocketServer,WebSocket} from 'ws';
const wss=new WebSocketServer({port:8080});
import jwt from 'jsonwebtoken';
import {prismaClient} from "@repo/db/client"
import {JWT_SECRET}  from "@repo/backend-common/config";
interface User{
    ws:WebSocket,
    rooms:string[],
    userId:string
}
const  users:User[]=[];

function checkUser(token:string):string|null{
    try{
        const decoded=jwt.verify(token,JWT_SECRET) ;
        console.log(typeof decoded)
        // console.log(decoded)
    if (typeof decoded=="string"){
       return null
        
    }
    if(!decoded||!decoded.userId){
        return null
    }
return decoded.userId
}
catch(e){
    return null
}
}
wss.on('connection',function connection(ws,request){
    const url=request.url;
    
    if(!url){
        return;
    }
    const queryParams=new URLSearchParams(url.split('?')[1]);
    const token=queryParams.get('token')||"";
    
    const userId=checkUser(token)
    console.log(userId)
    if(!userId){
        ws.close();
        return null
    }
    users.push({
       
        
        rooms:[],
        userId,
        ws
        


    })
    ws.on('message',async function message(data){
       const parsedData=JSON.parse(data as unknown as string);
       console.log(parsedData)
       if(parsedData.type==="join_room"){
        const user=users.find(x=> x.ws === ws )
        user?.rooms.push(parsedData.roomId)
       }
       if(parsedData.type==="leave_room"){
        const user=users.find(x=>x.ws===ws);
        if(!user){
            return ;
        }
        user.rooms=user?.rooms.filter(x=>x===parsedData.room)
       }
       if(parsedData.type==="chat"){
        const roomId=parsedData.roomId;
        const message=parsedData.message;
        await prismaClient.chat.create({
            data:{
            roomId ,
            message,
            userId}
            
        })
        users.forEach(user=>{
            if(user.rooms.includes(roomId)){
                user.ws.send(JSON.stringify({
                    type:"chat",
                    message:message,
                    roomId
                }))

            }
        })
       }
       
        });

     
});