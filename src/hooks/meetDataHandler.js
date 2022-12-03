import { useEffect, useState } from "react";


const useMeetDataHandler = () => {
    const [allParticipants,setallParticipants] = useState(new Map());
    const [participantCount,setParticipantCount] = useState(1);
    const [meetId,setMeetId] = useState(null);
    const [pinnedParticipant,setPinnedParticipant] = useState(null);
    const [renderedParticipants, setRenderedParticipants] = useState(null);
    const [chats,setChats] = useState([]);
    const newParticipant = (data) => {
        setallParticipants(
           new Map([...allParticipants,[data]])
        )
        setParticipantCount(data.participants);
    }

    const previousChat = (data) => {
        setChats(data);
    }

    const newChat = (data) => {
        
        setChats(chats=> chats.concat(data));
    }

    const removeParticipant = (socketId) => {
        const alreadyParticipated = allParticipants;
        setallParticipants(alreadyParticipated.delete(socketId));
        setParticipantCount(participantCount-1);
    }

    const setPinnedParticipantHandler = (socketId) => {
        setPinnedParticipant(new Map([[socketId,allParticipants.get(socketId)]]));
    }

    const removePinnedParticipant = () => {
        setPinnedParticipant(null);
    }
    return { chats, totalParticipants: participantCount, setParticipantCount , setMeetId, meetId, newChat,previousChat, newParticipant, removeParticipant, allParticipants, pinnedParticipant, setPinnedParticipantHandler, removePinnedParticipant }
}
export default useMeetDataHandler;