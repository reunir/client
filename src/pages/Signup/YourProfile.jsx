import { useState } from "react"
import FormInfo from "../../components/FormInfo";

export default function YourProfile({ setisNextDisabled }) {
    const [showPassword,setshowPassword] = useState(false);
    const alterRedBorderToInvalid = (e) => {
        if(e.target.validity.valid===false){
            e.target.classList.add('border-red-700');
        }else{
            e.target.classList.remove('border-red-700');
        }
    }
    const alterRedBorderToInvalidPhone = (e) => {
        var anyChar = /[]/.test(e.target.value);
        var noSpaces = e.target.value.replace(" ","");
        if(noSpaces.length===10 && anyChar===false){
            e.target.classList.remove('border-red-700');
        }else{
            e.target.classList.add('border-red-700');
        }
    }
    const alterRedBorderToInvalidPassword = (e) => {
        var password = e.target.value;
        var pattern = /[A-Za-z0-9](?!.*\s).{8,}$/;
        // var pattern = /[a-zA-Z]/;
        if(password.match(pattern)){
            e.target.classList.remove('border-red-700');
        }else{
            e.target.classList.add('border-red-700');
        }
    }
    return (
        <form className="grid">
            <div className="grid grid-flow-row lg:grid-flow-col lg:gap-[15px]">
                <div className="grid grid-rows-[auto_1fr] gap-[7px] mb-[10px]">
                    <div className="grid text-gray-700 font-bold text-sm">First Name</div>
                    <input type="text" name="fname" id="fname" placeholder="John" required onBlur={(e)=>{alterRedBorderToInvalid(e)}} spellCheck={false} className="text-sm  rounded-md border bg-[#F9FAFB] outline-[#1C64F2] p-[10px]" />
                </div>
                <div className="grid grid-rows-[auto_1fr] gap-[7px] mb-[10px]">
                    <div className="grid text-gray-700 font-bold text-sm">Last Name</div>
                    <input type="text" name="lname" id="lname" placeholder="Doe" required onBlur={(e)=>{alterRedBorderToInvalid(e)}} spellCheck={false} className="border rounded-md bg-[#F9FAFB] outline-[#1C64F2] p-[10px]" />
                </div>
            </div>
            <div className="grid grid-rows-[auto_1fr] gap-[7px] mb-[10px]">
                <div className="grid grid-cols-[auto_1fr] gap-[5px] text-gray-700 font-bold text-sm">
                    Email
                    <div className="grid group relative border border-[#1C64F2] text-[#1C64F2] cursor-pointer rounded-full w-[17px] h-[17px] text-xs self-center place-content-center">
                        ?
                        <FormInfo className="left-[25px] -top-[300%] w-[230px] lg:w-[300px]" title="Why we require your email?" description="We require your email to verify your identity and to provide alerts about your scheduled meetings. Please re-verify your email as it cannot be changed after."/>
                    </div>
                </div>
                <div className="grid grid-cols-[1fr_auto]">
                    <input type="email" name="email" id="email" placeholder="johndoe@gmail.com" required onBlur={(e)=>{alterRedBorderToInvalid(e)}} spellCheck={false} className="border rounded-md bg-[#F9FAFB] outline-[#1C64F2] p-[10px]" />
                </div>
            </div>
            <div className="grid grid-rows-[auto_1fr] gap-[7px] mb-[10px]">
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
            </div>
            <div className="grid grid-rows-[auto_1fr] gap-[7px] mb-[10px]">
                <div className="grid text-gray-700 font-bold text-sm">Password</div>
                <input type={showPassword?'text':'password'} name="pass" id="pass" placeholder="•••••••••" required onBlur={(e)=>{alterRedBorderToInvalidPassword(e)}} spellCheck={false} className="border rounded-md bg-[#F9FAFB] outline-[#1C64F2] p-[10px]" />
            </div>
            <div className="grid grid-rows-[auto_1fr] gap-[7px] mb-[20px]">
                <div className="grid text-gray-700 font-bold text-sm">Confirm Password</div>
                <input type={showPassword?'text':'password'} name="confpass" id="confpass" placeholder="•••••••••" required onBlur={(e)=>{alterRedBorderToInvalidPassword(e)}} spellCheck={false} className="border rounded-md bg-[#F9FAFB] outline-[#1C64F2] p-[10px]" />
            </div>
            <div className="grid grid-flow-col mb-[10px]">
                <div className="grid grid-cols-[auto_1fr] gap-[8px] place-self-start">
                    <input type="checkbox" name="showpass" checked={showPassword} onChange={()=>{setshowPassword(!showPassword)}} onBlur={(e)=>{alterRedBorderToInvalid(e)}} id="showpass" className=" outline-[#1C64F2] border border-gray-300 bg-[#F9FAFB] w-[15px] rounded-md" />
                    <div className="text-sm text-black  font-medium">Show Password</div>
                </div>
            </div>
        </form>
    )
}