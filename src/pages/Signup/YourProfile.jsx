import { useEffect, useState } from "react"
export default function YourProfile({ setisNextDisabled }) {
    const alterRedBorderToInvalid = (e) => {
        if(e.target.validity.valid===false){
            e.target.classList.add('');

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
        <div></div>
    )
}