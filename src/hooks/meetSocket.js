import axios from "axios";
import Peer from "peerjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../utils/socket";
import useMeetDataHandler from "./meetDataHandler";
import "./video.css"

const listenRequest = (event) => {
  socket.on(event, (args) => {
    console.log(args);
    return args;
  });
};

const sendRequest = (event, data) => {
  socket.emit(event, data);
};

const generateNewParticipantComponent = (localStream, id) => {
  if (document.contains(document.getElementById(id + "-video"))) {
    document.getElementById(id + "-video").remove()
  }

    const video = document.createElement("video");
    video.id = id + "-video";
    video.className = "renderVideo"
    video.autoplay = true;
    video.srcObject = localStream;
    video.controls = false;
    const parent = document.getElementById("users-stream");
    parent.appendChild(video);
};

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
    previousChat,
  } = useMeetDataHandler();

  const myPeer = new Peer(peerId) 

  useEffect(() => {
    // addNotification({ status: 1, error: {}, success: { data: "", message: "Hi there it is a notification!" } });=
    socket.on("removeparticipant", (args) => {
      removeParticipant(args.socketId);
    });
    socket.on("successful_create", (args) => {
      const { roomId } = args;
      navigate(`/meet/${roomId}`);
    });
    socket.on("receiveChat", (args) => {
      newChat(args);
    });
    socket.on(
      "successful_join",
      ({ totalParticipants, admin, peerId, userId }) => {
        setParticipantCount(totalParticipants);
        console.log(peerId);

        let rStream;
        myPeer.on("call", (call) => {
            call.answer(document.getElementById(me._id + "-video").srcObject);
            call.on("stream", (remoteStream) => {
              console.log(remoteStream);
              rStream = remoteStream

              // checks if the incoming stream is streaming(unmute) or not (mute)
              remoteStream.getVideoTracks()[0].addEventListener("mute", () => {
                console.log("video muted")
              })
            });
        });

        // get userId from all connected users and create the video element with userId as id
        myPeer.on("connection", (conn) => {
          conn.on("data", data => {
            console.log(data)
            generateNewParticipantComponent(rStream, data.userId);
          })
        })
      }
    );
    socket.on("user_connected", (args) => {
      //On successful joining of meet
      setParticipantCount(args.totalParticipants);
      // addNotification({ status: 1, error: {}, success: { data: "", message: `${args.userData.firstName} joined` } })
      newParticipant(args.userData);

      // userId of user joined
      console.log(args.userId)

      const remotePeer = myPeer.connect(args.peerId)

      const remotePeerCall = myPeer.call(args.peerId, document.getElementById(me._id + "-video").srcObject)
      
      remotePeerCall.on("stream", (remoteStream) => {
        console.log(remoteStream.id);
        generateNewParticipantComponent(remoteStream, args.userId);
      });

      // connect for sending data
      remotePeer.on("open", () => {
        remotePeer.send({
          userId: me._id
        })
      })

    });

    socket.on("user_disconnected", args => {
      console.log(args);

      // on disconne
      document.getElementById(`${args.userId}-video`).remove()
    })

  }, []);
  return { totalParticipants, newParticipant };
};
export { useMeetSocketServer, sendRequest };
