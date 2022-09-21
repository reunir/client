import { useEffect, useState } from "react"
import socket from "../utils/socket";

const listenRequest = (event) => {
    socket.on(event,(args)=>{
        console.log(args);
        return args;
    })
}



export default useMeetSocketServer = () => {
    const [me,setMe] = useState("");
    useEffect(()=>{
        setMe(listenRequest('me')); // setting socket id
    },[])
    // socket.on()
    
    return {me};
}