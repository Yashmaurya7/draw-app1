import { BACKEND_URL } from "../config";
import axios from "axios";
async function getChats(roomId:string){
  const response=await axios.get( `${BACKEND_URL}/chats/${roomId}`)
  return response.data.chat;
}

export function ChatRoom({id}:{id:string}){

  
}