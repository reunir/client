import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import { useForm } from "react-hook-form";
import FormInfo from "../components/FormInfo";
import { useEffect } from "react";
import parse from 'html-react-parser';
import { generateNewAvatar } from "../utils/generateAvatar";
import axios from "axios";
import ClipLoader from 'react-spinners/ClipLoader'
export default function Signup() {
    const [whichPart, setwhichPart] = useState(0);
    const [percentageCompleted, setpercentageCompleted] = useState(parseInt((whichPart) / 1 * 100));
    const partTitle = ['Your Profile'];
    const [avatarLoader,setAvatarLoader] = useState(false);
    // const partTitle = ['Your Profile','Verification Process','Voice and Face Verification'];
    const [isNextDisabled, setisNextDisabled] = useState(false);
    const handleFormCompletion = (nextPart) => {
        setwhichPart(nextPart);
        setpercentageCompleted(parseInt((nextPart) / 1 * 100))
    }
    const { user , setUser} = useAuth();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setshowPassword] = useState(false);
    const [avatar, setAvatar] = useState("");
    const [seed, setSeed] = useState("");
    const [stripe, setStripe] = useState("");
    const [backgroundColor, setBackground] = useState("");
    const formSubmit = (data, e) => {
        e.preventDefault();
        axios.post('auth/register',{...data , seed,stripe,backgroundColor}).then((resData) => {
            if(setUser){
                setUser(resData.data.success.data)
            }
            navigate('/meet')
        }).catch((error) => {
        })
    }
    const onError = (errors, e) => {
        e.preventDefault()
        console.log(errors)
    }
    const avatarCallback = () => {
        setAvatarLoader(true);
        generateNewAvatar().then(({ seed, stripe, randomColor, avatar }) => {
            setAvatar(avatar);
            setSeed(seed);
            setStripe(stripe);
            setBackground(randomColor);
            setAvatarLoader(false);
        });
    }
    useEffect(() => {
        avatarCallback();
    }, [])
    return (
        <div className="grid place-content-center bg-[#F9FAFB]">
            <div className="grid bg-white rounded-md w-full lg:w-[700px]">
                <div className="grid grid-flow-row lg:grid-flow-col mx-[20px] my-[20px] border-b-2">
                    <div className="grid place-self-start lg:pb-[12px]">
                        <div className="grid font-semibold text-sm text-gray-400">STEP: {whichPart + 1} of 1</div>
                        <div className="font-bold text-lg">{partTitle[whichPart]}</div>
                    </div>
                    <div className="grid grid-flow-col content-center justify-start lg:justify-end gap-[6px] pb-[12px]">
                        <div className="bg-gray-200 rounded-xl self-center w-[200px] h-[10px] overflow-hidden">
                            <div className={`grid h-full bg-green-500 rounded-r-xl`} style={{ width: percentageCompleted + '%' }}>

                            </div>
                        </div>
                        <div className="grid self-center text-gray-600">{percentageCompleted}%</div>
                    </div>
                </div>
                <div className="grid mx-[20px] mb-[20px]">
                    <div className="grid place-self-center grid-rows-[1fr_auto] gap-[10px]">
                        <div className={`grid w-[100px] h-[100px] rounded-full overflow-hidden bg-[${backgroundColor}]`}>
                            {
                                avatarLoader?
                                <div className="bg-gray-400 grid place-content-center">
                                    <ClipLoader color="white"/>
                                </div>
                                :
                                parse(avatar)
                            }
                        </div>
                        <div className="grid ">
                            <button disabled={avatarLoader} onClick={avatarCallback} className="px-5 py-2.5 relative rounded group overflow-hidden disabled:cursor-not-allowed font-medium bg-purple-50 text-purple-600 inline-block">
                                <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 group-disabled:bg-purple-50 bg-purple-600 group-hover:h-full opacity-90"></span>
                                <span className="relative grid grid-cols-[1fr_auto] gap-[5px] group-disabled:text-purple-600 group-hover:text-white">
                                    Refresh
                                    {
                                        avatarLoader?
                                        <ClipLoader className="group-hover:!border-[white_white_transparent] group-disabled:!border-[rgb(147_51_234)_rgb(147_51_234)_transparent] !border-[rgb(147_51_234)_rgb(147_51_234)_transparent] !w-[20px] !h-[20px] place-self-center"/>
                                        :
                                        ''
                                    }
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
                <form className="grid mx-[20px] mb-[20px]" onSubmit={handleSubmit(formSubmit, onError)}>
                    <div className="grid">
                        <div className="grid grid-flow-row lg:grid-flow-col lg:gap-[15px]">
                            <div className="grid grid-rows-[auto_1fr] gap-[7px] mb-[10px]">
                                <div className="grid text-gray-700 font-bold text-sm">First Name</div>
                                <input type="text" name="firstName" id="firstName" {
                                    ...register("firstName", {
                                        required: true
                                    })
                                } placeholder="John" spellCheck={false} className={`text-sm  rounded-md border bg-[#F9FAFB] outline-[#1C64F2] p-[10px] ${errors.firstName ? 'border-red-700' : ''}`} />
                            </div>
                            <div className="grid grid-rows-[auto_1fr] gap-[7px] mb-[10px]">
                                <div className="grid text-gray-700 font-bold text-sm">Last Name</div>
                                <input type="text" name="lastName" id="lastName" {
                                    ...register("lastName", {
                                        required: true
                                    })
                                } placeholder="Doe" spellCheck={false} className={`text-sm  rounded-md border bg-[#F9FAFB] outline-[#1C64F2] p-[10px] ${errors.lastName ? 'border-red-700' : ''}`} />
                            </div>
                        </div>
                        <div className="grid grid-rows-[auto_1fr] gap-[7px] mb-[10px]">
                            <div className="grid grid-cols-[auto_1fr] gap-[5px] text-gray-700 font-bold text-sm">
                                Email
                                <div className="grid group relative border border-[#1C64F2] text-[#1C64F2] cursor-pointer rounded-full w-[17px] h-[17px] text-xs self-center place-content-center">
                                    ?
                                    <FormInfo className="left-[25px] -top-[300%] w-[230px] lg:w-[300px]" title="Why we require your email?" description="We require your email to verify your identity and to provide alerts about your scheduled meetings. Please re-verify your email as it cannot be changed after." />
                                </div>
                            </div>
                            <div className="grid grid-cols-[1fr_auto]">
                                <input type="email" name="email" id="email" {
                                    ...register("email", {
                                        required: true
                                    })
                                } placeholder="johndoe@gmail.com" spellCheck={false} className={`text-sm  rounded-md border bg-[#F9FAFB] outline-[#1C64F2] p-[10px] ${errors.email ? 'border-red-700' : ''}`} />
                            </div>
                        </div>
                        {/* <div className="grid grid-rows-[auto_1fr] gap-[7px] mb-[10px]">
                <div className="grid grid-cols-[auto_1fr] gap-[5px] text-gray-700 font-bold text-sm">
                    Phone Number
                    <div className="grid group relative border border-[#1C64F2] text-[#1C64F2] cursor-pointer rounded-full w-[17px] h-[17px] text-xs self-center place-content-center">
                        ?
                        <FormInfo className="left-[25px] -top-[300%] w-[170px] lg:w-[300px]" title="Why we require your phone?" description="We require your phone to provide alerts about your scheduled meetings on WhatsApp."/>
                    </div>
                </div>
                <div className="grid grid-cols-[1fr_auto]">
                    <input type="text" name="phno" id="phno" placeholder="1234567890" required onBlur={(e)=>{alterRedBorderToInvalidPhone(e)}} spellCheck={false} className="border rounded-md bg-[#F9FAFB] outline-[#1C64F2] p-[10px]" />
                </div>
            </div> */}
                        <div className="grid grid-rows-[auto_1fr] gap-[7px] mb-[10px]">
                            <div className="grid text-gray-700 font-bold text-sm">Password</div>
                            <input type={showPassword ? 'text' : 'password'} name="password" id="password" placeholder="•••••••••" {
                                ...register("password", {
                                    required: true,
                                    pattern: {
                                        value: /[A-Za-z0-9](?!.*\s).{8,}$/
                                    }
                                })
                            } spellCheck={false} className={`text-sm  rounded-md border bg-[#F9FAFB] outline-[#1C64F2] p-[10px] ${errors.pass ? 'border-red-700' : ''}`} />
                        </div>
                        <div className="grid grid-flow-col mb-[10px]">
                            <div className="grid grid-cols-[auto_1fr] gap-[8px] place-self-start">
                                <input type="checkbox" name="showpass" checked={showPassword} onChange={() => { setshowPassword(!showPassword) }} id="showpass" className=" outline-[#1C64F2] border border-gray-300 bg-[#F9FAFB] w-[15px] rounded-md" />
                                <div className="text-sm text-black  font-medium">Show Password</div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-flow-col mx-[20px] mb-[20px]">
                        <button type="submit" className={`grid cursor-pointer disabled:bg-[#698dd4] disabled:cursor-default hover:bg-[#1654cf] place-self-end font-extrabold px-[40px] place-content-center py-[10px] text-white bg-[#1C64F2] w-[120px] rounded-md ${whichPart === 3 ? 'hidden' : ''}`}>Next</button>
                    </div>
                </form>
            </div>
        </div>
    )
}