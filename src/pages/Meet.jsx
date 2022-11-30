import { useContext, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom"
import ModeSwitcher from "../components/ModeSwitcher";
import { ChatbubbleEllipses } from '@styled-icons/ionicons-sharp'
import { PeopleTeam } from '@styled-icons/fluentui-system-filled'
import RightNav from "../components/RightNav/RightNav";
import MainVideo from "../components/Video/MainVideo";
import VideoControls from "../components/VideoControls";
import useStreamInit from "../hooks/userStream";
import { useEffect } from "react";
import {sendRequest } from "../hooks/meetSocket";
import { useAuth } from "../context/auth-context";
import Avatar from "../components/Avatar";
import ShareDetails from "../components/ShareDetails";
import { MeetContext, MeetProvider } from "../context/meet-context";
import Loading from "../components/Loading";
export default function Meet() {
    const { user } = useAuth();
    if (user === undefined) {
        useNavigate("/login")
    }
    const [me, addNotification, participants, sendRequest, totalParticipants, newParticipant, peerId] = useOutletContext();
    const { id } = useParams();
    const [loading,setLoading] = useState(true);
    const [rightNav, setRightNav] = useState(0);
    const setRightNavHelper = (what) => {
        if (what === rightNav)
            setRightNav(0);
        else
            setRightNav(what);
    }
    const { error, videoTrack, createOffer, localStream, audioTrack, initStream, finishStream, toggleAudio, toggleCamera } = useStreamInit();
    useEffect(() => {
        if(me != {} && peerId!=null ){
            console.log(peerId);
            sendRequest("join_room", { roomId: id, userId: me._id, peerId });
            initStream(`${me._id}-video`);
            setLoading(false);
        }
        return () => {
            finishStream();
        }
    }, [])
    return (
        loading?
        <Loading/>
        :
        <div className="bg-[#f0f0f0] dark:bg-gray-800 relative">
            <div className="static grid grid-flow-col pr-[10px] lg:pr-0 lg:grid-cols-[3fr_11fr_1fr_1fr_1fr] grid-cols-[2fr_1fr_1fr] top-0 left-0 w-full lg:h-[80px] h-[60px] bg-slate-100 dark:bg-gray-700">
                <div className="grid place-content-center font-inter font-medium dark:text-gray-100 text-4xl text-gray-700">
                    reunir
                </div>
                <div></div>
                <div className="grid">
                    <ShareDetails addNotification={addNotification} id={id}/>
                </div>
                <div className="grid place-content-center">
                    <ModeSwitcher />
                </div>
                <div className="grid lg:w-[60px] w-[40px] cursor-pointer rounded-full place-self-center overflow-hidden">
                    <Avatar />
                </div>
            </div>
            <MeetProvider value={{ localStream,sendRequest, participants,me }}>
                <div className="grid h-[calc(100%-140px)] lg:h-[calc(100%-180px)] gap-[10px] grid-cols-[1fr_auto]">
                    <MainVideo videoTrack={videoTrack} audioTrack={audioTrack} error={error} />
                    <RightNav what={rightNav} />
                </div>
            </MeetProvider>
            <div className="static grid grid-flow-col pr-[10px] lg:pr-0 lg:grid-cols-[4fr_1fr] bottom-0 left-0 w-full lg:h-[100px] h-[80px] bg-[#f0f0f0] dark:bg-gray-800">
                <VideoControls error={error} toggleAudio={toggleAudio} toggleCamera={toggleCamera} />
                <div className="grid w-[80%] h-[50%] grid-cols-[1fr_1.5fr] bg-[#e1e1e1] dark:bg-gray-700 place-self-center rounded-md">
                    <div onClick={() => { setRightNavHelper(1) }} className={`cursor-pointer rounded-md grid grid-flow-col place-content-center gap-[5px] ${rightNav === 1 ? 'text-white bg-green-500 scale-[1.15] hover:bg-green-600' : 'dark:hover:bg-gray-600 hover:bg-[#cacaca] dark:text-[#f0f0f0] text-gray-800'}`}>
                        <div>
                            <ChatbubbleEllipses className={`w-[20px]`} />
                        </div>
                        <div>Chat</div>
                    </div>
                    <div onClick={() => { setRightNavHelper(2) }} className={`cursor-pointer rounded-md grid grid-flow-col place-content-center gap-[5px] ${rightNav === 2 ? 'text-white bg-red-700 scale-[1.15] hover:bg-red-800' : 'dark:hover:bg-gray-600 hover:bg-[#cacaca] dark:text-[#f0f0f0] text-gray-800'}`}>
                        <div>
                            <PeopleTeam className={`w-[20px]`} />
                        </div>
                        <div className="">
                            Participants {totalParticipants}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}