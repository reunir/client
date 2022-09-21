import { useState } from "react"
import {Chatbot} from '@styled-icons/simple-icons'
export default function ChatbotComponent(){
    const [isOpened,setIsOpened] = useState(false);
    return(
        <div className="absolute lg:bottom-[10%] bottom-[5%] right-[5%] lg:right-[5%] grid w-fit h-fit">
            <div className="cursor-pointer border-2 border-white hover:bg-[#1454d2] lg:w-[80px] w-[60px] h-[60px] lg:h-[80px] rounded-full bg-[#1C64F2] grid text-white place-content-center">
                <Chatbot className="lg:w-[45px] lg:h-[45px] w-[35px] h-[35px] "/>
            </div>
        </div>
    )
}