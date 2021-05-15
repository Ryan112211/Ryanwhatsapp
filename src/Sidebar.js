import { Avatar, IconButton } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import "./sidebar.css"
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import { Chat, MoreVert, SearchOutlined } from '@material-ui/icons'
import Sidebarchat from './Sidebarchat'
import db from './firebase'
import { useStateValue } from './StateProvider'
function Sidebar() {
const [{user},dispatch]=useStateValue();
const [rooms,setrooms]=useState([]);
    useEffect(()=>{
const unsubscribe=db.collection("rooms").onSnapshot((snapshot)=>
    setrooms(
        snapshot.docs.map((doc)=>({
id:doc.id,
data:doc.data()
    })))

)
return ()=>{
    unsubscribe();
}

    },[])
    return (
        <div className="sidebar">
            <div className="sidebar__header">
        <Avatar src={user?.photoURL}></Avatar>
        <div className="sidebar__headerRight">
        <IconButton>
         <DonutLargeIcon></DonutLargeIcon>
         </IconButton>
         <IconButton>
         <Chat>

        </Chat>
         </IconButton>
         <IconButton>
         <MoreVert></MoreVert>

         </IconButton>
         
         
        

        </div>


            </div>
            <div className="sidebar__search">
<div className="sidebar__searchContainer">



<SearchOutlined></SearchOutlined>
<input placeholder="Search or Start a New Chat" type="text"></input>

                
            </div>
        </div>

            <div className="sidebar__chats">
                <Sidebarchat addNewChat></Sidebarchat>
                {rooms.map(room=>(

                    <Sidebarchat key={room.id} id={room.id}
                    name={room.data.name}></Sidebarchat>
                ))}


            </div>
       

        </div>
    )
}

export default Sidebar
