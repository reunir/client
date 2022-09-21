import useUIMode from "../hooks/setMode"

export default function Home(){
    const {mode} = useUIMode();
    return(
        <div className="relative dark:text-[#DFDFDF] text-[#2a2a2a] bg-[#E29578]">
            <div className="absolute top-0 left-0 w-full h-[70px] "></div>
        </div>
    )
}