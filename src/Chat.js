import { Avatar, Button, IconButton } from '@material-ui/core'
import { AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import { Redirect, useParams } from 'react-router';
import "./Chat.css"
import db, { auth } from './firebase';
import { useStateValue } from './StateProvider';
import firebase from 'firebase'
import Login from './Login';
import { Link } from 'react-router-dom';

function Chat() {
const [input,setinput]=useState("")
const [roomName,setroomName]=useState("");
const [messages,setmessages]=useState([]);
const {roomId}=useParams();
const [{user},dispatch]=useStateValue();
useEffect(()=>
{
    if(roomId)
    {
db.collection("rooms").doc(roomId).onSnapshot((snapshot)=>{
setroomName(snapshot.data().name)
db.collection("rooms").doc(roomId).collection("messages").orderBy("timestamp",'asc').onSnapshot(snapshot=>(
    setmessages(snapshot.docs.map((doc)=>doc.data()))
))
})
    }
},[roomId])
const signout=()=>{
    auth.signOut().then(()=>{
      alert("Logged Out")

    })
}
const sendmessage=(e)=>{
e.preventDefault();
console.log("You typed",input)
db.collection("rooms").doc(roomId).collection("messages").add({
    message:input,
    name:user.displayName,
    timestamp:firebase.firestore.FieldValue.serverTimestamp()
})
setinput("")
}
    const [seed,setseed]=useState("");
    useEffect(()=>{
        setseed(Math.floor(Math.random()*5000))

    },[roomId])
    return (
        <div className="chat">
         <div className="chat__header">
<Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}></Avatar>
<div className="chat__headerInfo">
<h3>{roomName}</h3>
<p>{new Date(
    messages[messages.length-1]?.
    timestamp?.toDate()).toUTCString()
}
</p>



</div>
<div className="chat__headerRight">
<IconButton>
 <SearchOutlined></SearchOutlined>   
</IconButton>
<IconButton>
 <AttachFile></AttachFile>  
</IconButton>
<IconButton>
 <MoreVert></MoreVert>  
</IconButton>


</div>
         </div>
         <div className="chat__body">
        {messages.map(message=>(
 <p className={`chat__message ${message.name===user.displayName&&"chat__reciever"}`}> <span className="chat__name">{message.name}</span>{message.message}<span className="chat__timestamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span></p>  
        ))}
          
         
          
             
          
        </div>  
         <div className="chat__footer">
<InsertEmoticon></InsertEmoticon>
<form>
<input value={input} onChange={e=>setinput(e.target.value)} placeholder="Type a Message"type="text"></input>
<button type="submit" onClick={sendmessage}>Send A Message</button>
   
</form>
<Mic></Mic>


         </div>
        </div>
    )
}

export default Chat
