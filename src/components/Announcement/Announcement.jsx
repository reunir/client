import useNotifications from "../../hooks/useNotifications.js"
export default function Announcement(){
    const {data,removeData} = useNotifications();
    return(
        <div className="grid gap-[20px] h-fit max-h-[350px] w-[100px] z-[999]">

        </div>
    )
}