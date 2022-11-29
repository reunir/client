import { useState } from "react";
import { useEffect } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import { MeetProvider } from "../context/meet-context";
import { useMeetSocketServer, sendRequest } from "../hooks/meetSocket";
import Loading from "./Loading";
import Peer from 'peerjs'

export default function MeetNav() {
    const [me, addNotification] = useOutletContext();
    const [loading, setLoading] = useState(true);
    const [myPeer,setMyPeer] = useState(new Peer());
    const { totalParticipants, newParticipant } = useMeetSocketServer(addNotification,myPeer,me);
    useEffect(() => {
        console.log(me)
        setLoading(false);
    }, [])
    const participants = [{ id: 'abhinavvsinhaa@gmail.com', name: 'Abhinav Sinha' }, { id: 'armaanbgp@gmail.com', name: 'Rhythm Shandlya' }]
    return (
        <>
            {
                loading ?
                    <Loading />
                    :
                    <Outlet context={[me, addNotification, participants, sendRequest, totalParticipants, newParticipant, myPeer]} />
            }
        </>
    )
}