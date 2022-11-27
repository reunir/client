import { useEffect, useState } from "react";


const useMeetDataHandler = () => {
    const [allParticipants,setallParticipants] = useState(new Map());
    const [participantCount,setParticipantCount] = useState(0);
    const [meetId,setMeetId] = useState(null);
    const [pinnedParticipant,setPinnedParticipant] = useState(null);
    const [renderedParticipants, setRenderedParticipants] = useState(null);
    const [chats,setChats] = useState([{
        senderName: 'Abhinav Sinha',
        senderProfile: '',
        senderEmail:'abhinavvsinhaa@gmail.com',
        text: 'Hi there!',
        inReplyTo: -1,
        reacts: [],
        type: 'text',
        language: 'en-US',
        timeAndDate: new Date()
    },{
        senderName: 'Chitwan Bindal',
        senderProfile: '',
        senderEmail:'chitwan001@gmail.com',
        text: 'Hello Abhinav!',
        inReplyTo: 0,
        reacts: [],
        type: 'text',
        language: 'en-US',
        timeAndDate: new Date()
    }]);
    const newParticipant = (data) => {
        setallParticipants(
           new Map([...allParticipants,[data.userId,data.userData]])
        )
        console.log(data)
        setParticipantCount(data.participants);
    }

    const previousChat = (data) => {
        setChats(data);
    }

    const newChat = (data) => {
        const newArr = [...chats,data];
        setChats(newArr);
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
    return { chats, totalParticipants: participantCount , setMeetId, meetId, newChat,previousChat, newParticipant, removeParticipant, allParticipants, pinnedParticipant, setPinnedParticipantHandler, removePinnedParticipant }
}
export default useMeetDataHandler;