import {WebSocketServer} from 'ws';
const wss=new WebSocketServer({port:8080});
import jwt from 'jsonwebtoken';
import {JWT_SECRET}  from "@repo/backend-common/config";
wss.on('connection',function connection(ws,request){
    const url=request.url;
    if(!url){
        return;
    }
    const queryParams=new URLSearchParams(url.split('?')[1]);
    const token=queryParams.get('token')||"";
    const decoded=jwt.verify(token,JWT_SECRET) as {userId:string};
    if(!decoded||decoded.userId){
        ws.close();
    }
    ws.on('message',function message(data){
        ws.send('pong')
        });
     
});