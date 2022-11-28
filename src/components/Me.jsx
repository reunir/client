import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import useNotificationHandler from "../hooks/handleNotifications";
import Notification from "./Notification";
import { getUserAvatar, setUserAvatar } from '../utils/generateAvatar';
import Loading from "./Loading";
export default function Me() {
    const [me, setMe] = useState({});
    const { notification, addNotification, deleteAfterExpiryTime } = useNotificationHandler();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        axios.get('auth/me').then((user) => {
            if (user.data.status) {
                console.log(user.data.success.user)
                setMe(user.data.success.user)
                if (getUserAvatar() == "") {
                    setLoading(true);
                    setUserAvatar(user.data.success.user);
                    setLoading(false);
                }
            }else{
                //TODO: Display error and logout user
            }
        }).catch((e) => {
            console.log(e);
        })
    }, [])
    return (
        <div className="grid relative">
            {loading ?
                <Loading />
                :
                <>
                    <Outlet context={[me, addNotification]} />
                    <div className="absolute overflow-hidden grid grid-flow-row gap-[10px] top-0 h-fit right-0 p-[10px]">
                        <Notification notification={notification} deleteAfterExpiryTime={deleteAfterExpiryTime} />
                    </div>
                </>
            }
        </div>
    )
}