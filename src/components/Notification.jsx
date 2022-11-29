import { Close } from "@styled-icons/ionicons-sharp";

export default function Notification({notification,deleteAfterExpiryTime}){
    const deleteNotification = (timeOutId,arrayIndex) => {
        clearTimeout(timeOutId);
        deleteAfterExpiryTime(arrayIndex)
    }
    return(
        <>
        {
            notification.map((data,i) => (
                <div key={i} className={`grid left-full animate-notification opacity-100 relative cursor-pointer group w-[300px] text-lg font-inter rounded-lg place-content-center border shadow-[rgba(0,0,0,0.16)_0px_3px_6px,_rgba(0,0,0,0.23)_0px_3px_6px] h-[60px] ${data.status? 'bg-gray-500 dark:bg-gray-600 text-gray-100 dark:text-gray-100 dark:border-slate-800 border-gray-600': 'bg-red-500 text-gray-50 border-red-600'}`}>
                    {
                        data.status?
                        <div>
                            {data.success.message}
                        </div>
                        :
                        <div>
                            {data.error.message}
                        </div>
                    }
                    <div className={`absolute ${data.status? 'bg-gray-600 text-gray-100': 'bg-red-700 text-gray-100'} hidden group-hover:grid -top-[8px] -left-[8px] p-[3px] w-[25px] h-[25px] rounded-full`}>
                        <Close onClick={() => {deleteNotification(data.timeOutId,data.arrayIndex)}}/>
                    </div>
                </div>
            ))
        }
        </>
    )
}