import { useEffect } from "react";
import { useContext } from "react";
import { useRef } from "react"
import { MeetContext } from "../context/meet-context";
import initVisualizer from "../utils/audioVisual";
export default function AudioVisual({ canvasId }) {
    const canvasRef = useRef();
    let { localStream } = useContext(MeetContext);
    // initVisualizer(canvasId,localStream)
    return (
        <canvas width={100} ref={canvasRef} height={100} id={`${canvasId}-audiovisual`}></canvas>
    )
}