 import express from "express";
import { JWT_SECRET } from "@repo/backend-common/config";
import jwt from "jsonwebtoken"  
import { middleware } from "./middleware";
import {CreateUser,SigninSchema,CreateRoomSchema} from "@repo/common/types"
import {prismaClient} from "@repo/db/client"
 const app=express();
 app.use(express.json());

 app.post("/signup",async (req,res)=>{
    console.log(req.body)
    const parsedData=CreateUser.safeParse(req.body);
    
    if(!parsedData.success){
        console.log(parsedData)
     res.json({
        message:"request body is not valid"
    })
    return
    }

  try {
    const user=await prismaClient.user.create({
    data : {

        email:parsedData.data?.username,
        //TODO hash password
        password:parsedData.data.password,
        name:parsedData.data.name

    }
    

   })
   res.json({
    userId:user.id
   })
}
catch(e){
    res.status(411).json({
        message:"user already exists"
    })
}

 })
 app.post("/signin",async (req,res)=>{
    const parsedData=SigninSchema.parse(req.body);
    if(!parsedData){
        res.json({
            message:"request body is not valid"
        })
        return
    }
 const user=await prismaClient.user.findFirst({
    where:{
        email:parsedData.username,
        password:parsedData.password

    }
 })
 if(!user){
    res.json({
        message:"invalid credentials"
    })
    return 
 }
    const token=jwt.sign({
        userId:user?.id
    },JWT_SECRET)
     res.json({
        token
     })
 })
 app.post("/room",middleware,async (req,res)=>{
    const parsedData=CreateRoomSchema.parse(req.body);
    if(!parsedData){
        res.json({
            message:"request body is invalid"
        })
        return;
    }
    const userId=req.userId||"";
    
  try { const room = await prismaClient.room.create({
        data:{
            slug:parsedData.name,
            adminId:userId
        }
    })
    res.json({
        roomId:room.id
    })
}
catch(e){
    res.json({
        message:"room already exists"
    })
}


 })
 app.get("/chats/:roomId",middleware,async(req,res)=>{
    const roomId=Number(req.params.roomId);
    const chat=await prismaClient.chat.findMany({
        where:{
            roomId:roomId
        },
        orderBy:{
            id:"desc"
        },
        take:50

    })
    res.json({
        chat
    })
 })
 app.get("room/:slug",middleware,async(req,res)=>{
    const slug=req.params.slug;
    const room =await prismaClient.room.findFirst({
      where:{
        slug
      }
    })
    if(!room){
        res.json({
            message:"incorrect slug "
        })
        return
    }
    const roomId=room.id
    
    res.json({
        roomId
    })
 })
 app.listen(3001)
