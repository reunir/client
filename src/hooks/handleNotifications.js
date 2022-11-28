import { useEffect, useState } from "react";
const useNotificationHandler = () => {
    const [notification, setNotification] = useState([]);
    const expiryTime = 5500; //Delete after 5.5 seconds
    const addNotification = (data) => {
        const theData = { ...data, timeOutId: setTimeout(() => {deleteAfterExpiryTime(notification.length)}, expiryTime), arrayIndex: notification.length }
        // console.log(theData);
        setNotification([...notification, theData]);
    }
    const deleteAfterExpiryTime = (arrayIndex) => {
        setNotification([
            ...notification.slice(0,arrayIndex),
            ...notification.slice(arrayIndex+1)
        ]);
    }
    return {notification,addNotification,deleteAfterExpiryTime}
}
export default useNotificationHandler