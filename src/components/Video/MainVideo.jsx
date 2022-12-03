import React, { useContext, useEffect, useState } from "react";
import { MeetContext } from "../../context/meet-context";
import { getUserAvatar } from "../../utils/generateAvatar";
import parse from 'html-react-parser'
import AudioVisual from "../AudioVisual";
import Avatar from "../Avatar";
import Pinned from "./Pinned";
import Video from "./Video";
export default function MainVideo({videoTrack,audioTrack,error}){
    let {allParticipants} = React.useContext(MeetContext);
    const {me} = useContext(MeetContext)
    const [inTile,setInTile] = useState(false);
    const expandStack = () => {
        console.log("works")
        document.getElementById('stacked-participants').style.height = "500px"
        childs = document.getElementById('stacked-participants').childNodes;
        for(child in childs){
            child.style.display = "grid"
        }
    }
    return(
        <div className={`grid`}>
            <div className="p-[10px] relative overflow-hidden max-h-full">
                <Pinned/>
                <div id="users-stream" className="flex relative gap-[10px] w-full place-content-center">
                {/* <Video/> */}
                <div id={me.email} className={`grid ${videoTrack===false?'rounded-md w-[1000px] h-full bg-slate-300 dark:bg-gray-900':''} ${inTile===true?'absolute lg:w-[300px] w-fit h-fit bottom-0 right-0':'w-fit h-fit place-content-center  self-center'}`}>
                    <div className="grid relative">
                        <video id={`${me._id}-video`} autoPlay playsInline className={`${videoTrack===false?'hidden':'block'} -scale-x-100 renderVideo rounded-lg w-fit h-fit place-self-center`}></video>
                        <div className="absolute top-full left-[5px] dark:text-white text-gray-700 w-fit h-fit">
                            You
                        </div>
                    </div>
                    <div className={`${videoTrack===false?'grid':'hidden'} w-[200px] relative rounded-full overflow-hidden `}>
                        <Avatar/>
                        <div className="w-fit h-fit absolute -z-[1] place-self-center">
                            <AudioVisual canvasId={me._id}/>
                        </div>
                    </div>
                </div>
                {/* <div onClick={expandStack} className="absolute transition-transform cursor-pointer justify-center grid bottom-0 right-0 w-[100px] h-[100px]" id="stacked-participants">
                    <div className="absolute hidden overflow-hidden rounded-full w-[80px] h-[80px] shadow-lg">
                    {parse(getUserAvatar())}
                    </div>
                </div> */}
                </div>
            </div>
        </div>
    )
}