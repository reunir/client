import loading from '../assets/loading.json'
import Lottie from 'react-lottie';
export default function Loading(){
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loading,
        // here is where we will declare lottie animation
        // "animation" is what we imported before animationData: animation,
        rendererSettings: {
           preserveAspectRatio: "xMidYMid slice",
        },
     };
    return(
        <div className='grid place-content-center w-screen h-screen cursor-none'>
            <Lottie options={defaultOptions} height={120} width={120} isClickToPauseDisabled={true} style={{placeSelf:'center',cursor:'none'}}/>
        </div>
    )
}