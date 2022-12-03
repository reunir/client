import axios from "axios";
import Peer from "peerjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosExternal } from "../axiosDefault";
import { generateAndReturnAvatar } from "../utils/generateAvatar";
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

const disconnectSocket = () => {
  socket.disconnect();
}

const removeRenderedParticipant = (userId) => {
  document.getElementById(`${userId}-video`).remove()
  document.getElementById(`${userId}-wrapper`).remove()
  document.getElementById(`${userId}-stackedtile`).remove()
}
const generateNewParticipantComponent = (localStream, id) => {
  console.log("here")
  if (document.contains(document.getElementById(id + "-video"))) {
    document.getElementById(id + "-video").remove()
    document.getElementById(id+"-wrapper").remove()
  }
    const videoWrapper = document.createElement("div");
    videoWrapper.className="grid relative w-fit h-fit place-content-center self-center"
    videoWrapper.id=id+"-wrapper";


    // const stackedTile = document.createElement('div');
    // stackedTile.id = id+'-stackedtile'
    // stackedTile.className="absolute hidden overflow-hidden rounded-full w-[80px] h-[80px]";

    const nameDiv = document.createElement('div');
    nameDiv.className = "grid place-content-center absolute top-[100%] left-[5px] dark:text-white text-gray-700 w-fit h-fit"
    axios.post("user/getDetailsById",{userId:id}).then((res) => {
      const user = res.data.success.message;
      nameDiv.innerHTML = user.firstName+ ' '+user.lastName;
    })


    const video = document.createElement("video");
    video.id = id + "-video";
    video.className = "renderVideo -scale-x-100 rounded-lg w-fit h-fit place-self-center"
    video.autoplay = true;
    video.srcObject = localStream;
    video.controls = false;
    videoWrapper.appendChild(video)
    videoWrapper.appendChild(nameDiv)
    const parent = document.getElementById("users-stream");
    parent.insertBefore(videoWrapper,parent.children[0]);
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
    chats,
    previousChat,
  } = useMeetDataHandler();

  const myPeer = new Peer(peerId) 

  useEffect(() => {
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
            axios.get('user/getDetailsById',{userId:args.userId}).then((res) => {
              newParticipant(res.data)
            })
          })
        })
      }
    );
    socket.on("user_connected", (args) => {
      //On successful joining of meet
      // addNotification({ status: 1, error: {}, success: { data: "", message: `${args.userData.firstName} joined` } })
      newParticipant(args.userData);

      const remotePeer = myPeer.connect(args.peerId)

      const remotePeerCall = myPeer.call(args.peerId, document.getElementById(me._id + "-video").srcObject)
      
      remotePeerCall.on("stream", (remoteStream) => {
        console.log(remoteStream.id);
        generateNewParticipantComponent(remoteStream, args.userId);
        setParticipantCount(args.totalParticipants);
        axios.post("user/getDetailsById",{userId:args.userId}).then((res) => {
          addNotification({ status: 1, error: {}, success: { data: "", message: `${res.data.success.message.firstName} joined the metting!` } })
        })
      });
      remotePeer.on("close",() =>{
        removeRenderedParticipant(args.userId);
      })

      // connect for sending data
      remotePeer.on("open", () => {
        remotePeer.send({
          userId: me._id
        })
      })

    });

    socket.on("user_disconnected", args => {
      console.log(args);
      setParticipantCount(args.totalParticipants)
      removeRenderedParticipant(args.userId);
    })

  }, []);
  return { totalParticipants, newParticipant,chats,newChat,allParticipants };
};
export { useMeetSocketServer, sendRequest, disconnectSocket };
