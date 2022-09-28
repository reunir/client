import { useState } from "react";

const useNotifications = () => {
    const [data,setData] = useState([]);
    const deleteNotification = (index) => {
    }
    return {data,setData,deleteNotification};
}
export default useNotifications;