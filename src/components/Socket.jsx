import {useEffect,useState} from 'react'
import {socket} from '../utils/socket'
export default function Socket(){
    const [info,setinfo] = useState('')
    useEffect(() => {
        console.log('socket connection')
        socket.emit('hello','hello from client')
        socket.on('from-server',(data) => {
            setinfo(data)
        })
    })
    return(
        <div>
            {info}
        </div>
    )
}