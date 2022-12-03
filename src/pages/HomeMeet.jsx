import { Video } from "@styled-icons/fluentui-system-filled";
import randomstring from 'randomstring';
import { useState, useEffect } from "react";
import Lottie from "react-lottie";
import { useNavigate, useOutletContext } from "react-router-dom";
import Loading from "../components/Loading";
import homemeet from "../assets/homemeet.json"
export default function HomeMeet() {
    const [me, sendRequest] = useOutletContext();
    const navigate = useNavigate();
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: homemeet,
        // here is where we will declare lottie animation
        // "animation" is what we imported before animationData: animation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };
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
        sendRequest("create", { roomId, userId: me._id, type: 0 })
        setLoading(false);
        navigate(`/meet/${roomId}`)
    }
    const joinByCode = () => {
        let meetcode = document.getElementById("meetcode").value;
        navigate(`/meet/${meetcode}`)
    }
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, [me])
    return (
        <>
            {
                loading ?
                    <Loading />
                    :
                    <div className="grid">
                        <div className="grid relative place-self-center w-full h-full bg-slate-200">
                            <div className="grid absolute top-0 justify-self-center text-black font-inter text-6xl font-bold">
                                reunir
                            </div>
                            <div className="grid grid-cols-[1fr_auto]">
                                <div className="grid grid-flow-row place-content-center gap-[20px] ml-[30px] bg-gray-300 border border-gray-200 w-[700px] h-[600px] self-center rounded-lg">
                                    <div className="grid place-content-center">

                                    <button onClick={joinMeetAndRedirect} type="button" className="gap-[5px] px-6 pt-2.5 pb-2 bg-blue-600 text-white font-medium text-xs leading-normal uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex align-center">
                                        <Video width={'20px'} />
                                        Create Meet
                                    </button>
                                    </div>
                                    <div className="grid w-full h-[1px] bg-gray-500">
                                    </div>
                                    <div className="grid">
                                        <form onSubmit={joinByCode} action="">
                                        <input
                                            type="text"
                                            class="text-md outline-[#1C64F2] border border-gray-300 bg-[#F9FAFB] rounded-md p-[10px] "
                                            id="meetcode"
                                            placeholder="Enter the code"
                                            />
                                            <input type="submit" value="" hidden />
                                            </form>
                                    </div>
                                </div>
                                <div className="grid">
                                    <Lottie options={defaultOptions} isClickToPauseDisabled={true} style={{ placeSelf: 'center', cursor: 'default', width: '80%' }} />
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}