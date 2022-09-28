import { useState } from "react";
    function  useStreamInit(){
    const [error,setError] = useState(0);
    const [videoTrack,setVideoTrack] = useState(true);
    const [audioTrack,setAudioTrack] = useState(true);
    const [localStream,setLocalStream] = useState(null);
    const initStream = async (id) => {
        if(navigator.mediaDevices){
            await navigator.mediaDevices.getUserMedia({video: {
                width: { min: 640, ideal: 1920, max: 1920 },
                height: { min: 480, ideal: 1080, max: 1080 }
              },
              audio: true}).then((stream) => {
                console.log(stream);
                    setLocalStream(stream);
                    setVideoTrack(true)
                    setAudioTrack(true)
                    document.getElementById(id).srcObject = stream;
                    document.getElementById(id).volume = 0;
                    document.getElementById(id).muted = 0;
                    setError(0);
              }).catch((err)=> {
                console.error(err);
                setVideoTrack(false)
                setAudioTrack(false)
                setError(1);
              })
            }else{
                setError(1);
                setVideoTrack(false)
                setAudioTrack(false)
            }
    }
    const toggleCamera = async () => {
        let localvideoTrack = localStream.getTracks().find(track => track.kind==='video')
        if(localvideoTrack.enabled){
            localvideoTrack.enabled = false;
            setVideoTrack(false)
        }else{
            localvideoTrack.enabled = true;
            setVideoTrack(true)
        }
    }
    const toggleAudio = async () => {
        let localaudioTrack = localStream.getTracks().find(track => track.kind==='audio')
        if(localaudioTrack.enabled){
            localaudioTrack.enabled = false;
            setAudioTrack(false)
        }else{
            localaudioTrack.enabled = true;
            setAudioTrack(false)
        }
    }
    return {initStream,error,videoTrack,audioTrack,toggleAudio,toggleCamera}
}
export default useStreamInit;