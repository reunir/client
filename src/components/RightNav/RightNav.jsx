import Chat from "./Chat/Chat";
import Participants from "./Participants";

export default function RightNav({what}){
    if(what===0)
        return('');
    else if(what===1)
        return(<Chat/>)
    else if(what===2)
        return(<Participants/>)
    else
        return('')
}