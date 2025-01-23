import { NextFunction, Request, Response } from "express";
import { JWT_SECRET } from "@repo/backend-common/config";
import jwt from "jsonwebtoken"
export function middleware(req: Request,res:Response,next:NextFunction){
    const token=req.headers["authorization"]??"";
    const decoded=jwt.verify(token,JWT_SECRET) as {userId:string}; ;
    if(decoded){
     req.userId=decoded.userId;
     next();
    }else{
        res.status(403).json({
            message:"unauthorized"
        })
    }

}