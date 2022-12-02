import React, { useContext, useEffect, useState } from "react";
import { MeetContext } from "../../context/meet-context";
import AudioVisual from "../AudioVisual";
import Avatar from "../Avatar";
import Pinned from "./Pinned";
import Video from "./Video";
export default function MainVideo({videoTrack,audioTrack,error}){
    let {participants} = React.useContext(MeetContext);
    const {me} = useContext(MeetContext)
    const [inTile,setInTile] = useState(false);
    return(
        <div className={`"grid"`}>
            <div className="flex p-[10px] relative h-full justify-center">
                <Pinned/>
                <div id="users-stream">
                {/* <Video/> */}
                </div>
                <div id={me.email} className={`grid ${videoTrack===false?'rounded-md bg-slate-300 dark:bg-gray-900':''} ${inTile===true?'absolute lg:w-[300px] w-fit h-fit bottom-0 right-0':'w-full h-full place-content-center  self-center'}`}>
                    <video id={`${me._id}-video`} autoPlay playsInline className={`${videoTrack===false?'hidden':'block'} -scale-x-100 aspect-video rounded-lg w-full h-full place-self-center`}></video>
                    <div className={`${videoTrack===false?'grid':'hidden'} w-[200px] relative rounded-full overflow-hidden `}>
                        <Avatar/>
                        <div className="w-fit h-fit absolute -z-[1] place-self-center">
                            <AudioVisual canvasId={me._id}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}