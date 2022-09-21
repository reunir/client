import { useState } from "react";
import { useParams } from "react-router-dom"
import ModeSwitcher from "../components/ModeSwitcher";
import {ChatbubbleEllipses} from '@styled-icons/ionicons-sharp'
import {PeopleTeam} from '@styled-icons/fluentui-system-filled'
import RightNav from "../components/RightNav/RightNav";
import MainVideo from "../components/Video/MainVideo";
import VideoControls from "../components/VideoControls";
import useStreamInit from "../hooks/userStream";
import { MeetProvider } from "../context/meet-context";
import { useEffect } from "react";
export default function Meet(){
    const {id} = useParams();
    const [rightNav,setRightNav] = useState(0);
    const setRightNavHelper = (what) => {
        if(what===rightNav)
            setRightNav(0);
        else
            setRightNav(what);
    }
    const {error,videoTrack,audioTrack,initStream,toggleAudio,toggleCamera} = useStreamInit();
    useEffect(()=>{
        initStream("chitwan001@gmail.com-video");
    },[])
const participants = [{id:'abhinavvsinhaa@gmail.com',name:'Abhinav Sinha'},{id:'armaanbgp@gmail.com',name:'Rhythm Shandlya'}]
    return(
        <div className="bg-[#f0f0f0] dark:bg-gray-800 relative">
            <div className="static grid grid-flow-col pr-[10px] lg:pr-0 lg:grid-cols-[3fr_12fr_1fr_1fr] grid-cols-[2fr_1fr_1fr] top-0 left-0 w-full lg:h-[80px] h-[60px] bg-slate-100 dark:bg-gray-700">
                <div></div>
                <div></div>
                <div className="grid place-content-center">
                    <ModeSwitcher/>
                </div>
                <div className="grid lg:w-[60px] w-[40px] lg:text-lg text-sm cursor-pointer text-white place-content-center lg:h-[60px] h-[40px] rounded-full bg-green-700 place-self-center">
                    CB
                </div>
            </div>
            <MeetProvider value={{participants}}>
            <div className="grid h-[calc(100%-140px)] lg:h-[calc(100%-180px)] gap-[10px] grid-cols-[1fr_auto]">
                <MainVideo videoTrack={videoTrack} audioTrack={audioTrack} error={error} />
                <RightNav what={rightNav}/>
            </div>
            </MeetProvider>
            <div className="static grid grid-flow-col pr-[10px] lg:pr-0 lg:grid-cols-[4fr_1fr] bottom-0 left-0 w-full lg:h-[100px] h-[80px] bg-[#f0f0f0] dark:bg-gray-800">
                <VideoControls error={error} toggleAudio={toggleAudio} toggleCamera={toggleCamera} />
                <div className="grid w-[80%] h-[50%] grid-cols-[1fr_1.5fr] bg-[#e1e1e1] dark:bg-gray-700 place-self-center rounded-md">
                    <div onClick={()=>{setRightNavHelper(1)}} className={`cursor-pointer rounded-md grid grid-flow-col place-content-center gap-[5px] ${rightNav===1?'text-white bg-green-500 scale-[1.15] hover:bg-green-600':'dark:hover:bg-gray-600 hover:bg-[#cacaca] dark:text-[#f0f0f0] text-gray-800'}`}>
                        <div>
                            <ChatbubbleEllipses className={`w-[20px]`}/>
                        </div>
                        <div>Chat</div>
                    </div>
                    <div onClick={()=>{setRightNavHelper(2)}} className={`cursor-pointer rounded-md grid grid-flow-col place-content-center gap-[5px] ${rightNav===2?'text-white bg-red-700 scale-[1.15] hover:bg-red-800':'dark:hover:bg-gray-600 hover:bg-[#cacaca] dark:text-[#f0f0f0] text-gray-800'}`}>
                        <div>
                            <PeopleTeam className={`w-[20px]`}/>
                        </div>
                        <div>Participants</div>
                    </div>
                </div>
            </div>
        </div>
    )
}