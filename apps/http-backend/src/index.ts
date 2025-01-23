 import express from "express";
import { JWT_SECRET } from "@repo/backend-common/config";
import jwt from "jsonwebtoken"  
import { middleware } from "./middleware";
import {CreateUser,SigninSchema,CreateRoomSchema} from "@repo/common/types"
import {prismaClient} from "@repo/db/client"
 const app=express();
 app.post("/signup",async (req,res)=>{
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
 app.post("/signin",(req,res)=>{
    const userId=1;
    const token=jwt.sign({
        userId
    },JWT_SECRET)
     res.json({
        token
     })
 })
 app.post("/room",middleware,(req,res)=>{

 })
 app.listen(3001)