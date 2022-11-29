import { useEffect } from "react";
import { useState } from "react";
import parse from 'html-react-parser';
import {getUserAvatar} from "../utils/generateAvatar";
export default function Avatar(){
    const [svg,setSvg] = useState('');
    useEffect(() => {
        setSvg(getUserAvatar())
    },[])
    return (
        <>
        {parse(svg)}
        </>
    );
}