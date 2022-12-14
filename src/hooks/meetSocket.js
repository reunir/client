import axios from "axios";
import Peer from "peerjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../utils/socket";
import useMeetDataHandler from "./meetDataHandler";
import { getRoomId } from "../utils/getRoomId";
const listenRequest = (event) => {
  socket.on(event, (args) => {
    console.log(args);
    return args;
  });
};

const sendRequest = (event, data) => {
  socket.emit(event, {...data,roomId:getRoomId});
};
const generateNewParticipantComponent = (localStream, id) => {
  if (!document.contains(document.getElementById(id + "-video"))) {
    const video = document.createElement("video");
    video.id = id + "-video";
    video.width = 640;
    video.autoplay = true;
    video.srcObject = localStream;
    video.controls = false;
    const parent = document.getElementById("users-stream");
    parent.appendChild(video);
  }
}

const useMeetSocketServer = (addNotification, peerId, me) => {
  const navigate = useNavigate();
  const {
    totalParticipants,
    newParticipant,
    meetId,
    removeParticipant,
    allParticipants,
    pinnedParticipant,
    setParticipantCount,
    setPinnedParticipantHandler,
    removePinnedParticipant,
    newChat,
    chats,
    previousChat,
  } = useMeetDataHandler();

  const myPeer = new Peer(peerId)

  useEffect(() => {
    socket.on("removeparticipant", (args) => {
      // addNotification({ status: 1, error: {}, success: { data: "", message: "Hi there it is a notification!" } });=
      removeParticipant(args.socketId);
    });
    socket.on("successful_create", (args) => {
      const { roomId } = args;
      navigate(`/meet/${roomId}`);
    });
    socket.on(
      "successful_join",
      ({ totalParticipants, admin, peerId, userId }) => {
        setParticipantCount(totalParticipants);
        console.log(peerId);
        myPeer.on("call", (call) => {
          call.answer(document.getElementById(me._id + "-video").srcObject);
            call.on("stream", (remoteStream) => {
              // console.log()
              generateNewParticipantComponent(remoteStream, "gvgggvhjvjh");
            });
            
        });
        // myPeer.on("connection",(conn) => {
        //     conn.on("data",(data) => {
        //         console.log(data)
        //     })
        // })
      }
    );
    socket.on("receive_chat",(args) => {
        console.log(args)
        newChat(args);
    })

    socket.on("user_connected", (args) => {
      //On successful joining of meet
      setParticipantCount(args.totalParticipants);
      // addNotification({ status: 1, error: {}, success: { data: "", message: `${args.userData.firstName} joined` } })
      newParticipant(args.userData);
      const remotePeerCall = myPeer.call(
        args.peerId,
        document.getElementById(me._id + "-video").srcObject
      );
      console.log(remotePeerCall);
      remotePeerCall.on("stream", (remoteStream) => {
        console.log(remoteStream.id);
        generateNewParticipantComponent(remoteStream, 'erbwerb');
      });
      // console.log(args.peerId);
      // const remotePeerCall = myPeer.connect(args.peerId);
      // remotePeerCall.on("open",() => {
      //     remotePeerCall.send("hi!!");
      // })
    });
  }, []);
  return { totalParticipants, newParticipant, chats, newChat };
};
export { useMeetSocketServer, sendRequest };
