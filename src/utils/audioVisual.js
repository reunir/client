const initVisualizer = (canvasId,localStream) => {
    let canvasRef = document.getElementById(`${canvasId}-audiovisual`);
    let ctx = canvasRef.getContext("2d");
    let audioCtx = new AudioContext();
    let analyser = audioCtx.createAnalyser();
    analyser.fftSize = 2048;
    let source = audioCtx.createMediaStreamSource(localStream);
    source.connect(analyser)
    let data = new Uint8Array(analyser.frequencyBinCount)
    const draw = () => {
        ctx.fillStyle = 'white';  //white background          
        ctx.lineWidth = 2; //width of candle/bar
        ctx.strokeStyle = '#d5d4d5';
        let tempData = [...data];
        ctx.clearRect(0,0,canvasRef.width,canvasRef.height);
        let space = canvasRef.width / tempData.length;
        tempData.forEach((value,i) => {
            ctx.beginPath();
            ctx.moveTo(space*i,canvasRef.height);
            ctx.lineTo(space*i,canvasRef.height-value);
            ctx.stroke();
        });
    }
    const loopingFunction = () => {
        requestAnimationFrame(loopingFunction);
        analyser.getByteFrequencyData(data);
        draw();
    }
    requestAnimationFrame(loopingFunction);
}
export default initVisualizer