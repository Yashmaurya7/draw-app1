'use client'
import { useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";


export default function Home() {
  const router=useRouter();
  const [roomId,setRooId]=useState("")
  return (
  <div style={{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    height:"100vh",
    width:"100vw"


  }}
    > 
      <input style ={{
        padding:10
      }}value={roomId} onChange={(e)=>{
        setRooId(e.target.value);
      }} type="text" placeholder="roomId">



      </input>
      <button style={{
        padding:10
      }} onClick={()=>{
        router.push(`/room/${roomId}`)
      }}>Join</button>

  </div>
  )
}