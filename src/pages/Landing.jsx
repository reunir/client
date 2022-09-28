import React from "react";
import Lottie from "react-lottie";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import loading from '../assets/land1.json'
import ChatbotComponent from "../components/ChatBot/ChatBot";

const Landing = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loading,
        rendererSettings: {
           filterSize: {
            width: '30%',
            height: '30%',
            x: '-70%',
            y: '-30%'
           }
        },
     };
     const { user } = useAuth();
     if(!user){
        <Navigate to="/login" replace={true}/>
     }
    return (
        <div className="relative dark:text-[#DFDFDF] text-[#2a2a2a] bg-[#000000] overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[70px] ">
            {
                    !user && (
                        <>
                            <Link to='/login'>
                                <button>Login</button>
                            </Link>
                            <Link to='/signup'>
                                <button>Signup</button>
                            </Link>
                        </>
                    ) 
                }
            </div>
            <ChatbotComponent/>
        </div>
    );
}

export default Landing;