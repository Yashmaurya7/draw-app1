import {z} from "zod";

export const CreateUser = z.object({
    username:z.string().min(3).max(20),
    name:z.string(),
    password:z.string()
   
})
export const SigninSchema = z.object({
    username:z.string().min(3).max(20),
   password:z.string()
   
})
export const CreateRoomSchema=z.object({
    name:z.string().min(3).max(20)

})