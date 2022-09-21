import { useEffect } from "react";
import Pinned from "./Pinned";
import Video from "./Video";

export default function MainVideo({initStream,videoTrack,audioTrack,error}){
    useEffect(()=>{
        initStream("chitwan001@gmail.com-video");
    },[])
    const participants = [{id:'abhinavvsinhaa@gmail.com',name:'Abhinav Sinha'},{id:'armaanbgp@gmail.com',name:'Rhythm Shandlya'}]
    return(
        <div className="grid">
            <div className="flex p-[10px]">
                <Pinned/>
                <Video participants={participants}/>
                <div id="chitwan001@gmail.com" className="grid">
                    <video id="chitwan001@gmail.com-video" autoPlay playsInline className={`${videoTrack===false?'hidden':'block'} aspect-video rounded-lg w-full h-full place-self-center`}></video>
                    <div className={`${videoTrack===false?'grid':'hidden'} `}></div>
                </div>
            </div>
        </div>
    )
}