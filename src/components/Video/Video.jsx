import { useEffect } from "react"

export default function Video({participants}){
    useEffect(()=> {
        return(()=> {

        })
    },[])
    return(
        participants.map((data,id)=>(
            <div className="">
                <video src=""></video>
            </div>
        ))
    )
}