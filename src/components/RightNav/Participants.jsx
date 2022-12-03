import { useContext, useEffect } from "react"
import { MeetContext } from "../../context/meet-context"
import { generateAndReturnAvatar } from "../../utils/generateAvatar";
import parse from 'html-react-parser'
export default function Participants(){
  const {allParticipants} = useContext(MeetContext);
    useEffect(() => {
      console.log(allParticipants)
      return () => {
      }
    }, [])
    
    return(
      <div className="w-[400px] grid h-full mt-[10px] mr-[10px] place-content-center border rounded-md bg-gray-200 dark:bg-gray-700 dark:border-gray-600 border-gray-400">
        <div className="grid p-[20px]">
          {
            allParticipants.forEach((value,key) => (
              Object.keys(key).map(obj =>(
                <div className="grid w-full h-fit grid-cols-[1fr_auto] gap-[10px]">
                  <div className="grid rounded-full overflow-hidden w-[45px] h-[45px]">
                    {(generateAndReturnAvatar(key["stripe"],key["seed"],key["backgroundColor"]))}
                  </div>
                  <div className="grid content-center dark:text-white text-gray-700">
                    {key["firstName"]+key["lastName"]}
                  </div>
              </div>
              ))
            ))
          }
        </div>
      </div>
    )
}