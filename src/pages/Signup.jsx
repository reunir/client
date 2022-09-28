import { useState } from "react"
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import SignupHelper from "./Signup/SignupHelper";

export default function Signup(){
    const [whichPart,setwhichPart] = useState(0);
    const [percentageCompleted,setpercentageCompleted] = useState(parseInt((whichPart)/3*100));
    const partTitle = ['Your Profile','Verification Process','Voice and Face Verification'];
    const [isNextDisabled,setisNextDisabled] = useState(true);
    const handleFormCompletion = (nextPart) => {
        setwhichPart(nextPart);
        setpercentageCompleted(parseInt((nextPart)/3*100))
    }
    const { user } = useAuth();
     if(user){
        <Navigate to="/h" replace={true}/>
     }
    return(
        <div className="grid place-content-center bg-[#F9FAFB]">
            <div className="grid bg-white rounded-md w-full lg:w-[700px]">
                <div className="grid grid-flow-row lg:grid-flow-col mx-[20px] my-[20px] border-b-2">
                    <div className="grid place-self-start lg:pb-[12px]">
                        <div className="grid font-semibold text-sm text-gray-400">STEP: {whichPart+1} of 3</div>
                        <div className="font-bold text-lg">{partTitle[whichPart]}</div>
                    </div>
                    <div className="grid grid-flow-col content-center justify-start lg:justify-end gap-[6px] pb-[12px]">
                        <div className="bg-gray-200 rounded-xl self-center w-[200px] h-[10px] overflow-hidden">
                            <div className={`grid h-full bg-green-500 rounded-r-xl`} style={{width:percentageCompleted+'%'}}>

                            </div>
                        </div>
                        <div className="grid self-center text-gray-600">{percentageCompleted}%</div>
                    </div>
                </div>
                <div className="grid mx-[20px] mb-[20px]">
                    <SignupHelper whichPart={whichPart} setisNextDisabled={setisNextDisabled}/>
                </div>
                <div className="grid grid-flow-col mx-[20px] mb-[20px]">
                    <button onClick={()=>{handleFormCompletion(whichPart-1)}} className={`grid cursor-pointer hover:bg-gray-100 place-self-start text-gray-400 font-extrabold px-[30px] place-content-center py-[10px] border rounded-md ${whichPart===0?'hidden':''}`}>Previous</button>
                    <button disabled={isNextDisabled} onClick={()=>{handleFormCompletion(whichPart+1)}} className={`grid cursor-pointer disabled:bg-[#698dd4] disabled:cursor-default hover:bg-[#1654cf] place-self-end font-extrabold px-[40px] place-content-center py-[10px] text-white bg-[#1C64F2] rounded-md ${whichPart===3?'hidden':''}`}>Next</button>
                </div>
            </div>
        </div>
    )
}