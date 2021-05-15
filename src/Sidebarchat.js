import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import db from './firebase'
import "./Sidebarchat.css"
function Sidebarchat({id,name,addNewChat}) {
    const [seed,setseed]=useState("");
   const [messages,setmessages]=useState("")
   useEffect(()=>{
       if(id){
           db.collection("rooms").doc(id).collection("messages").orderBy('timestamp','desc').onSnapshot(snapshot=>(
               setmessages(snapshot.docs.map((doc)=>
               doc.data()
               ))
           ))
       }
   },[id])
  
    useEffect(()=>{
        setseed(Math.floor(Math.random()*5000))

    },[])
    const createChat=()=>{
const roomName=prompt("please Enter Name for the chat");
if(roomName){
    db.collection("rooms").add({

        name:roomName,

    })
}
    }
    return !addNewChat ?(
    <Link to={`/rooms/${id}`}>
        <div className="sidebarChat">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}></Avatar>
            <div className="sidebarChat__info">
<h2>{name}</h2>
<p>{messages[0]?.message}</p>

            </div>
        </div>
        </Link>
    ):(
        <div onClick={createChat}
        className="sidebarChat">
        <h2>Add New Chat</h2>
        </div>
    )

    }
export default Sidebarchat
