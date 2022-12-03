import { useState } from "react";
import { useEffect } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import { MeetProvider } from "../context/meet-context";
import { useMeetSocketServer, sendRequest } from "../hooks/meetSocket";
import Loading from "./Loading";
import Peer from "peerjs";
import {v4 as uuid} from 'uuid'
export default function MeetNav() {
  const [ me, addNotification ] = useOutletContext();
  const [ loading, setLoading ] = useState(true);
  const [ peerId, setPeerId ] = useState(uuid())
  const { totalParticipants, newParticipant,chats,newChat,allParticipants } = useMeetSocketServer(
    addNotification,
    peerId,
    me
  );
  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Outlet
          context={[
            me,
            addNotification,
            allParticipants,
            sendRequest,
            totalParticipants,
            newParticipant,
            peerId,
            chats,
            newChat
          ]}
        />
      )}
    </>
  );
}
