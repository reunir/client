export default function FormInfo({className,title,description}){
    return(
        <div className={`hidden z-[1] group-hover:grid shadow-[rgba(99,_99,_99,_0.2)_0px_2px_8px_0px] absolute bg-white w-fit rounded-md ${className}`}>
            <div className="grid font-bold text-black text-xs px-[10px] pt-[10px] pb-[8px]">{title}</div>
            <div className="grid px-[10px] pb-[10px] text-gray-500 font-thin text-xs">
            {description}
            </div>
        </div>
    )
}