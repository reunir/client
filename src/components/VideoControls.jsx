import { Camera, CameraOff, Mic, MicOff } from "@styled-icons/fluentui-system-filled";
import { useEffect, useState } from "react";
import useStreamInit from "../hooks/userStream";

export default function VideoControls({error,toggleAudio,toggleCamera}){
    const [videoStatus,setVideoStatus] = useState('off');
    const [micStatus,setMicStatus] = useState('off');
    const toggleCameraState = () => {
        if(videoStatus==='off')
            setVideoStatus('on')
        else
            setVideoStatus('off')
        toggleCamera()
    }
    const toggleMicState = () => {
        if(micStatus==='off')
            setMicStatus('on')
        else
            setMicStatus('off')
        toggleAudio()
    }
    return(
        <div className="grid place-content-center">
            <div className="grid grid-cols-[auto_auto_auto] gap-[10px]">
                <button disabled={error} onClick={toggleMicState} className={`grid cursor-pointer place-content-center place-self-center w-[50px] h-[50px] rounded-full ${micStatus==='on'?'bg-red-700 hover:bg-red-800 text-white':'bg-slate-400 dark:bg-red-700 dark:hover:bg-red-800 hover:bg-slate-500 text-gray-800 dark:text-white'} `}>
                    {
                        micStatus==='on'?
                        <MicOff width={30}/>
                        :
                        <Mic width={30}/>
                    }
                </button>
                <div className="grid grid-flow-col place-content-center w-[150px] h-[60px] font-medium dark:bg-red-700 bg-red-800 rounded-lg text-xl text-white">
                    <div className="grid place-content-center place-self-start">
                        Leave call
                    </div>
                </div>
                <button disabled={error} onClick={toggleCameraState} className={`grid cursor-pointer place-content-center place-self-center w-[50px] h-[50px] rounded-full ${videoStatus==='on'?'bg-red-700 hover:bg-red-800 text-white':'bg-slate-400 dark:bg-red-700 dark:hover:bg-red-800 hover:bg-slate-500 text-gray-800 dark:text-white'} `}>
                    {
                        videoStatus==='on'?
                        <CameraOff width={30}/>
                        :
                        <Camera width={30}/>
                    }
                </button>
            </div>
        </div>
    )
}