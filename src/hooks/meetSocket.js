import { useEffect, useState } from "react"
import { useAuth } from "../context/auth-context";
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


const useMeetSocketServer = (addNotification) => {
    const {user} = useAuth();
    const [me,setMe] = useState(user.user.id);
    const {newParticipant,meetId, removeParticipant, allParticipants, pinnedParticipant, setPinnedParticipantHandler, removePinnedParticipant,newChat,previousChat} = useMeetDataHandler();
    useEffect(()=>{
        addNotification({status:1,error:{},success:{data:"",message:"Hi there it is a notification!"}});
        socket.on('removeparticipant',(args)=>{
            removeParticipant(args.socketId);
        });
        socket.on("receiveChat",(args)=>{
            newChat(args);
        })
        socket.on('user_connected',(args)=>{
            console.log(args);
            newParticipant(args);
        })
    },[])
    // socket.on()
    
    return {me};
}
export {useMeetSocketServer,sendRequest};