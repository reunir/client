import { Video } from "@styled-icons/fluentui-system-filled";
import randomstring from 'randomstring';
import { useState,useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Loading from "../components/Loading";
export default function HomeMeet() {
    const [me,sendRequest] = useOutletContext();
    const navigate = useNavigate();
    const generateMeetId = () => {
        const meetId = randomstring.generate({
            length: 3,
            charset: 'alphabetic',
            capitalization: "lowercase"
        }) + '-' +
            randomstring.generate({
                length: 4,
                charset: 'alphabetic',
                capitalization: "lowercase"
            }) + '-' +
            randomstring.generate({
                length: 3,
                charset: 'alphabetic',
                capitalization: "lowercase"
            });
        return meetId;
    }
    const joinMeetAndRedirect = () => {
        const roomId = generateMeetId();
        setLoading(true);
        sendRequest("create",{roomId,userId:me._id,type:0})
        setLoading(false);
        navigate(`/meet/${roomId}`)
    }
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    },[me])
    return (
        <>
            {
                loading ?
                <Loading/>
            :
                    <div className="grid">
                        <div className="grid relative place-self-center w-full h-full bg-slate-200">
                            <div className="grid absolute top-0 justify-self-center text-black font-inter text-6xl font-bold">
                                reunir
                            </div>
                            <div className="grid grid-rows-[auto_1fr] place-self-center">
                                <button onClick={joinMeetAndRedirect} type="button" className="gap-[5px] px-6 pt-2.5 pb-2 bg-blue-600 text-white font-medium text-xs leading-normal uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex align-center">
                                    <Video width={'20px'} />
                                    Create Meet
                                </button>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}