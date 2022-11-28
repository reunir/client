import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import { setUserAvatar } from "../utils/generateAvatar";
import socket from "../utils/socket";
import useMeetDataHandler from "./meetDataHandler";
const listenRequest = (event) => {
    socket.on(event, (args) => {
        console.log(args);
        return args;
    })
}

const sendRequest = (event, data) => {
    socket.emit(event, data);
}

const useMeetSocketServer = (addNotification) => {
    const navigate = useNavigate();
    const {totalParticipants,  newParticipant, meetId, removeParticipant, allParticipants, pinnedParticipant,setParticipantCount, setPinnedParticipantHandler, removePinnedParticipant, newChat, previousChat } = useMeetDataHandler();
    useEffect(() => {
        // addNotification({ status: 1, error: {}, success: { data: "", message: "Hi there it is a notification!" } });
        //TODO: useMeetDataHandler initialized twice, to be corrected
        socket.on('removeparticipant', (args) => {
            removeParticipant(args.socketId);
        });
        socket.on("successful_create", (args) => {
            const { roomId } = args;
            navigate(`/meet/${roomId}`)
        })
        socket.on("receiveChat", (args) => {
            newChat(args);
        })
        socket.on("successful_join",({totalParticipants,admin}) => {
            console.log(totalParticipants)
            setParticipantCount(totalParticipants);
        })
        socket.on('user_connected', (args) => { //On successful joining of meet
            console.log(args.totalParticipants)
            setParticipantCount(args.totalParticipants);
            addNotification({ status: 1, error: {}, success: { data: "", message: `${args.userData.firstName} joined` } })
            newParticipant(args.userData);
        })

    }, [])
    return {totalParticipants,  newParticipant}
}
export { useMeetSocketServer, sendRequest };