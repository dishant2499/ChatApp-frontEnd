// @ts-ignore
import io from 'socket.io-client';
import React, { useState, useEffect } from 'react';
// @ts-ignore
import {useRouter} from "next/router";
import axios from "axios";
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';


 const Data = () => {
     const [messages, setMessages] = useState([]);
     const [messageInput, setMessageInput] = useState('');

     const [selectFile, setSelectFile] = useState("");
     const router = useRouter()


     // Create a Socket.IO instance and connect to the server
     const socket = io('http://localhost:4001');
const user = router.query.data
     console.log("router",router.query.data)
     // Listen for messages from the server
     useEffect(() => {
         socket.on('response', (message:any) => {
             console.log("message",message)
             // @ts-ignore
             setMessages([...messages, message]);
         });

         // socket.on('joined', (message:any) => {
         //     console.log("message",message)
         //     // @ts-ignore
         //     setMessages([...messages, message]);
         // });

         socket.on('responsefile', (message:any) => {
             console.log("message",message)
             // @ts-ignore
             setMessages([...messages, message]);
         });

     }, [messages]);

     // Send a message to the server
     const sendMessage = () => {
         socket.emit('message', {message : messageInput,user: user });
         setMessageInput("");
     };

     const sendFile = async() => {
         const formData = new FormData();

         // Update the formData object
         formData.append(
             "myFile",
             selectFile,

         );
         const dataList = await axios.post("https://chatapp-backend-qd3r.onrender.com/form",formData)
         console.log("dataList",dataList)
         if(dataList){
             socket.emit('myFile', {form : dataList.data.res ,type :dataList.data.type ,user:user});
         }

         setMessageInput("");
     };

const getmessages = async() =>{
   const messageData =  await axios.get("https://chatapp-backend-qd3r.onrender.com/message")
    setMessages(messageData.data.data)
}

     useEffect(()=>{
         if(!localStorage.getItem("authToken")){
             router.push("/")
         }
          getmessages()
       socket.emit("joined user",{user,type:"new joined"})
   },[])

console.log("messages",messages)

     const fileData = (e:any)=>{
         setSelectFile(e.target.files[0])
     }
     console.log("selectFile",selectFile)

    // @ts-ignore
     return ( <>
        <div style={{height:"100vh",width:'100vw',backgroundColor:'skyblue',position:'relative',}}>

            <div style={{height:"90vh",overflow:"scroll",overflowX: "hidden"}}>
            <ul>
                {messages.map((text, index) => {return (

                    <div style={{textAlign:text.user === user ? "right" :"left"}}>
                        {/*{text?.type === "new joined" && text.user !== user && <div style={{textAlign:"center"}}>{user} joined the chat</div> }*/}
<div style={{display:"flex",justifyContent:text.user === user ? "right" :"left",alignItems:"baseline",padding:"10px 2px"}}>
    {text?.type !== "new joined" && text?.user && text.user !== user && <Avatar>{text.user.slice(0,1).toUpperCase()}</Avatar>}
                        {
                            text?.type === "image/png" && <div style={{display:"flex",justifyContent:text.user === user ? "right" :"left",margin:"10px 2px"}}><img  src={text.form} alt="Girl in a jacket" width="200" height="600"/></div>
                        }
                        {
                            text?.type === "video/mp4" &&
                            <div style={{display:"flex",justifyContent:text.user === user ? "right" :"left",margin:"10px 2px"}}>
                                <video width="200" height="240" controls>
                                    <source src={text.form} type="video/mp4"/>

                                </video>
                            </div>
                        }
                        <li  key={index}>{text.message}</li>
                        {text?.type !== "new joined" && text.user === user && <Avatar>{text.user.slice(0,1).toUpperCase()}</Avatar>}
</div>
                    </div>
                )})}
            </ul>
            </div>

            <div style={{marginBottom:"10px",position:'absolute',bottom:'10px'}}>
            <input
                type="text"
                value={messageInput}
                style={{border : '2px solid black'}}
                onChange={(event) => setMessageInput(event.target.value)}
            />
            <button onClick={sendMessage} style={{border : '2px solid blue',backgroundColor:'blue',color:'white'}}>Send</button>
                <input type={"file"} onChange={fileData}/>
                <button onClick={sendFile} style={{border : '2px solid blue',backgroundColor:'blue',color:'white'}}>upload</button>
            </div>
        </div>

        </>
    )
}

 export default Data
