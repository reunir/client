import { useEffect, useState } from "react"
import socket from "../utils/socket";
import useMeetDataHandler from "./meetDataHandler";
const listenRequest = (event) => {
    socket.on(event,(args)=>{
        console.log(args);
        return args;
    })
}

 const sendRequest =  (event,data) => {
    socket.emit(event,data);
}


const useMeetSocketServer = () => {
    const [me,setMe] = useState("");
    const {newParticipant, removeParticipant, allParticipants, pinnedParticipant, setPinnedParticipantHandler, removePinnedParticipant,newChat,previousChat} = useMeetDataHandler();
    useEffect(()=>{
        setMe(listenRequest('me')); // setting socket id
        socket.on("newparticipant",(args)=>{
            newParticipant(args);
        });
        socket.on('removeparticipant',(args)=>{
            removeParticipant(args.socketId);
        });
        socket.on("receiveChat",(args)=>{
            newChat(args);
        })
    },[])
    // socket.on()
    
    return {me , sendRequest};
}
export default useMeetSocketServer;