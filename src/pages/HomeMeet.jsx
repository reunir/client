import { Video } from "@styled-icons/fluentui-system-filled";
import randomstring from 'randomstring';
import { useState } from "react";
import PuffLoader from 'react-spinners/PuffLoader'
export default function HomeMeet() {
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
        console.log(meetId);
    }
    const joinMeetAndRedirect = () => {
        const meetId = generateMeetId();
        setLoading(true);
    }
    const [loading, setLoading] = useState(false);
    return (
        <>
            {
                loading ?
                <div className="grid bg-black place-content-center">
                    <div className="grid grid-cols-[1fr_auto] tracking-wider text-[#808080] font-medium font-inter text-4xl">
                        <div className="grid">
                            <PuffLoader size={150} color="gray"/>
                        </div>
                    </div>
                </div>
            :
                    <div className="grid">
                        <div className="grid relative place-self-center w-full h-full bg-slate-200">
                            <div className="grid absolute top-0 justify-self-center text-black font-inter text-6xl font-bold">
                                reunir
                            </div>
                            <div className="grid grid-rows-[auto_1fr] place-self-center">
                                <button onClick={joinMeetAndRedirect} type="button" class="gap-[5px] px-6 pt-2.5 pb-2 bg-blue-600 text-white font-medium text-xs leading-normal uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex align-center">
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