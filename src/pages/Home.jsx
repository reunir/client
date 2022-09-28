import { useAuth } from "../context/auth-context";
import useUIMode from "../hooks/setMode"
import {Navigate} from "react-router-dom";
export default function Home(){
    const {mode} = useUIMode();
    const { user } = useAuth();
     if(!user){
        <Navigate to="/login" replace={true}/>
     }
    return(
        <div className="relative dark:text-[#DFDFDF] text-[#2a2a2a] bg-[#E29578]">
            <div className="absolute top-0 left-0 w-full h-[70px] "></div>
        </div>
    )
}