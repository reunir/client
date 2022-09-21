import React, { useCallback } from 'react'

export const MeetContext = React.createContext()
MeetContext.displayName = 'MeetContext';

function MeetProvider(props) {
    return <MeetContext.Provider {...props} />
}

export {MeetProvider}
