import { useState } from "react"
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import SignupHelper from "./Signup/SignupHelper";
import { useForm } from "react-hook-form";
import FormInfo from "../components/FormInfo";
export default function Signup() {
    const [whichPart, setwhichPart] = useState(0);
    const [percentageCompleted, setpercentageCompleted] = useState(parseInt((whichPart) / 1 * 100));
    const partTitle = ['Your Profile'];
    // const partTitle = ['Your Profile','Verification Process','Voice and Face Verification'];
    const [isNextDisabled, setisNextDisabled] = useState(false);
    const handleFormCompletion = (nextPart) => {
        setwhichPart(nextPart);
        setpercentageCompleted(parseInt((nextPart) / 1 * 100))
    }
    const { user } = useAuth();
    if (user) {
        <Navigate to="/h" replace={true} />
    }
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword,setshowPassword] = useState(false);
    const formSubmit = (data) => {
        console.log(data);
    }
    useEffect(() => {
        console.log(errors);
    },[errors])
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
                    <form className="grid" onSubmit={handleSubmit(formSubmit)} autoComplete="off">
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
                                ...register("pass", {
                                    required: true,
                                    pattern: {
                                        value: /[A-Za-z0-9](?!.*\s).{8,}$/
                                    }
                                })
                            } spellCheck={false} className={`text-sm  rounded-md border bg-[#F9FAFB] outline-[#1C64F2] p-[10px] ${errors.pass ? 'border-red-700' : ''}`} />
                        </div>
                        <div className="grid grid-rows-[auto_1fr] gap-[7px] mb-[20px]">
                            <div className="grid text-gray-700 font-bold text-sm">Confirm Password</div>
                            <input type={showPassword ? 'text' : 'password'} name="confpass" id="confpass" placeholder="•••••••••" {
                                ...register("confpass", {
                                    required: true,
                                    pattern: {
                                        value: /[A-Za-z0-9](?!.*\s).{8,}$/
                                    }
                                })
                            } spellCheck={false} className={`text-sm  rounded-md border bg-[#F9FAFB] outline-[#1C64F2] p-[10px] ${errors.confpass ? 'border-red-700' : ''}`} />
                        </div>
                        <div className="grid grid-flow-col mb-[10px]">
                            <div className="grid grid-cols-[auto_1fr] gap-[8px] place-self-start">
                                <input type="checkbox" name="showpass" checked={showPassword} onChange={() => { setshowPassword(!showPassword) }} id="showpass" className=" outline-[#1C64F2] border border-gray-300 bg-[#F9FAFB] w-[15px] rounded-md" />
                                <div className="text-sm text-black  font-medium">Show Password</div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="grid grid-flow-col mx-[20px] mb-[20px]">
                    <button onClick={() => { handleFormCompletion(whichPart - 1) }} className={`grid cursor-pointer hover:bg-gray-100 place-self-start text-gray-400 font-extrabold px-[30px] place-content-center py-[10px] border rounded-md ${whichPart === 0 ? 'hidden' : ''}`}>Previous</button>
                    <button type="submit" className={`grid cursor-pointer disabled:bg-[#698dd4] disabled:cursor-default hover:bg-[#1654cf] place-self-end font-extrabold px-[40px] place-content-center py-[10px] text-white bg-[#1C64F2] w-[120px] rounded-md ${whichPart === 3 ? 'hidden' : ''}`}>Next</button>
                </div>
            </div>
        </div>
    )
}