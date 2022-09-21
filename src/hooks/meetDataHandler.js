import { useState } from "react";


const useMeetDataHandler = () => {
    const [allParticipants,setallParticipants] = useState(new Map());
    const [pinnedParticipant,setPinnedParticipant] = useState(null);
    const [renderedParticipants, setRenderedParticipants] = useState(null);
    const newParticipant = (data) => {
        setallParticipants(alreadyParticipated => {
           new Map([...alreadyParticipated,[data.socketId,data.userData]])
        })
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

    return { newParticipant, allParticipants, pinnedParticipant }
}
