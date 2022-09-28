import React, { useEffect, useState } from "react";
import { MeetContext } from "../../context/meet-context";
import Pinned from "./Pinned";
import Video from "./Video";

export default function MainVideo({videoTrack,audioTrack,error}){
    let {participants} = React.useContext(MeetContext);
    const [inTile,setInTile] = useState(false);
    return(
        <div className="grid">
            <div className="flex p-[10px] relative">
                <Pinned/>
                <Video participants={participants}/>
                <div id="chitwan001@gmail.com" className={`grid ${inTile===true?'absolute lg:w-[300px] w-fit h-fit bottom-0 right-0':'w-fit'}`}>
                    <video id="chitwan001@gmail.com-video" autoPlay playsInline className={`${videoTrack===false?'hidden':'block'} -scale-x-100 aspect-video rounded-lg w-full h-full place-self-center`}></video>
                    <div className={`${videoTrack===false?'grid':'hidden'} `}></div>
                </div>
            </div>
        </div>
    )
}