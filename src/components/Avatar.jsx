import { useEffect } from "react";
import { useState } from "react";
import parse from 'html-react-parser';
import generateOrGetAvatar from "../utils/generateAvatar";
export default function Avatar(){
    const [svg,setSvg] = useState('');
    useEffect(() => {
        generateOrGetAvatar().then((data) => {
            setSvg(data)
        })
    },[])
    return (
        <>
        {parse(svg)}
        </>
    );
}