 import express from "express";
import { JWT_SECRET } from "@repo/backend-common/config";
import jwt from "jsonwebtoken"  
import { middleware } from "./middleware";
import {CreateUser} from "@repo/common/types"
 const app=express();
 app.post("/signup",(req,res)=>{
    const data=CreateUser.safeParse(req.body);
    if(!data.success){
     res.json({
        message:data.error.message
    })
    return
    }
    res.json({
        message:"123"
    })

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