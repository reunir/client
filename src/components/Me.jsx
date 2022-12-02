import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import useNotificationHandler from "../hooks/handleNotifications";
import Notification from "./Notification";
import { getUserAvatar, setUserAvatar } from '../utils/generateAvatar';
import Loading from "./Loading";
export default function Me({me}) {
    const { notification, addNotification, deleteAfterExpiryTime } = useNotificationHandler();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        console.log(me);
        // axios.get('auth/me').then((user) => {
        //     if (user.data.status) {
        //         setMe(user.data.success.user)
        //         if (getUserAvatar() == "") {
        //             setLoading(true);
        //             setUserAvatar(user.data.success.user);
        //             setLoading(false);
        //         }
        //     }else{
        //         //TODO: Display error and logout user
        //     }
        // }).catch((e) => {
        //     console.log(e);
        // })
    }, [])
    return (
        <div className="grid relative">
            {loading ?
                <Loading />
                :
                <>
                    <Outlet context={[me, addNotification]} />
                    <div className="absolute overflow-hidden grid grid-flow-row gap-[10px] top-0 h-fit right-0 p-[10px]">
                        {
                            notification.length!=0?
                            // <Notification notification={notification} deleteAfterExpiryTime={deleteAfterExpiryTime} />
                            ''
                            :
                            ''
                        }
                    </div>
                </>
            }
        </div>
    )
}