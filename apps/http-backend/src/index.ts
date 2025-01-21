 import express from "express";
import { JWT_SECRET } from "./config";
import jwt from "jsonwebtoken"  
 const app=express();
 app.post("/signup",(req,res)=>{

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
 app.listen(3001)