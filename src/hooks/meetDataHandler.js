import { useState } from "react";


const useMeetDataHandler = () => {
    const [allParticipants,setallParticipants] = useState(new Map());
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
        setallParticipants(alreadyParticipated => {
           new Map([...alreadyParticipated,[data.socketId,data.userData]])
        })
    }

    const previousChat = (data) => {
        setChats(data);
    }

    const newChat = (data) => {
        setChats(curr=> [...curr, data]);
    }

    const removeParticipant = (socketId) => {
        const alreadyParticipated = allParticipants;
        setallParticipants(alreadyParticipated.delete(socketId));
    }

    const setPinnedParticipantHandler = (socketId) => {
        setPinnedParticipant(new Map([[socketId,allParticipants.get(socketId)]]));
    }

    const removePinnedParticipant = () => {
        setPinnedParticipant(null);
    }

    return { chats, newChat,previousChat, newParticipant, removeParticipant, allParticipants, pinnedParticipant, setPinnedParticipantHandler, removePinnedParticipant }
}
export default useMeetDataHandler;