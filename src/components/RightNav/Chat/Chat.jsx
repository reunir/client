import { useEffect } from "react"
import dateFormat, { masks } from "dateformat";
import { useState } from "react";
import { ArrowReply } from "@styled-icons/fluentui-system-filled";
export default function Chat(){
    useEffect(() => {
        return () => {
        }
      }, [])
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
    const [replyTo,setReplyTo] = useState(-1);
    const convertToLocale = (date) => {
        return dateFormat(date,'shortTime');
    }
    const sendMessage = () => {
        let message = document.getElementById('newChat').value;
        if(message!==''){
        setChats(current => [...current,{
            senderName: 'Chitwan Bindal',
            senderProfile:'',
            senderEmail:'chitwan001@gmail.com',
            text: message,
            inReplyTo: replyTo,
            reacts: [],
            type: 'text',
            language: 'en-US',
            timeAndDate: new Date()
        }])
        document.getElementById('newChat').value='';
        document.getElementById('newChat').focus();
        let scrollToBottom = document.getElementById('chat-scrollbar');
        scrollToBottom.scrollTop=scrollToBottom.scrollHeight;
        setReplyTo(-1);
        }
    }
    return(
        <div className="w-[400px] grid grid-rows-[auto_1fr] h-full pt-[50px]">
            <div className={`overflow-y-scroll ${replyTo===-1?'h-[615px]':'h-[605px]'} grid`} id="chat-scrollbar">
                <div className="h-fit relative self-end pr-[10px]">
                <div className="grid bottom-0 left-0 w-full">
                    {chats.map((chat,id)=>(
                        chat.senderEmail!=='chitwan001@gmail.com'?
                        <div key={id} className={`grid group grid-cols-[30px_auto_auto] gap-[10px] w-full place-content-start ${id===0?'pt-0':chats[id-1].senderEmail===chat.senderEmail?'pt-[4px]':'pt-[10px]'}`}>
                            <div className={` place-self-center place-content-center w-[30px] h-[30px] rounded-lg bg-violet-700 text-white text-sm ${id===0?'grid':chats[id-1].senderEmail===chat.senderEmail?'hidden':'grid'}`}>
                                AS
                            </div>
                            <div className="break-words bg-slate-300 select-text dark:bg-gray-900 px-[10px] py-[5px] rounded-xl rounded-bl-none grid text-left text-gray-900 dark:text-slate-300 w-fit max-w-[250px]">
                                {
                                    chat.inReplyTo===-1?'':
                                    <div className="grid bg-slate-400 dark:bg-gray-800 place-content-start pl-[4px] rounded-md cursor-pointer">
                                        <div className="font-bold pt-[3px] grid content-center text-purple-700 text-sm pr-[30px]">{chats[chat.inReplyTo].senderName}</div>
                                        <div className=" text-gray-700 dark:text-gray-500 pb-[3px]">
                                            {chats[chat.inReplyTo].text}
                                        </div>
                                    </div>
                                }
                                {chat.text}
                            </div>
                            <div className="opacity-0 grid grid-flow-col place-content-center place-self-center w-max h-fit group-hover:opacity-100 text-gray-500 dark:text-gray-300 text-xs">
                                <div className="grid place-content-center place-self-center cursor-pointer hover:dark:text-gray-300 hover:text-gray-700">
                                    <ArrowReply onClick={()=>{setReplyTo(id)}} width={20}/>
                                </div>
                                {convertToLocale(chat.timeAndDate)}
                            </div>
                        </div>
                        :
                        <div key={id} className={`grid group justify-self-end grid-cols-[auto_auto_30px] gap-[10px] w-full place-content-end ${id===0?'pt-0':chats[id-1].senderEmail===chat.senderEmail?'pt-[4px]':'pt-[10px]'}`}>
                            <div className="opacity-0 grid grid-flow-col place-content-center place-self-center w-max h-fit group-hover:opacity-100 text-gray-500 dark:text-gray-300 text-xs">
                                {convertToLocale(chat.timeAndDate)}
                                <div className="grid place-content-center place-self-center cursor-pointer hover:dark:text-gray-300 hover:text-gray-700">
                                    <ArrowReply onClick={()=>{setReplyTo(id)}} width={20}/>
                                </div>
                            </div>
                            <div className="break-words gap-[3px] bg-slate-300 select-text dark:bg-gray-900 px-[10px] py-[5px] rounded-xl rounded-br-none grid text-left text-gray-900 dark:text-slate-300 w-fit max-w-[250px]">
                                {
                                    chat.inReplyTo===-1?'':
                                    <div className="grid bg-slate-400 dark:bg-gray-800 place-content-start pl-[4px] rounded-md cursor-pointer">
                                        <div className="font-bold pt-[3px] grid content-center text-purple-700 text-sm pr-[30px]">{chats[chat.inReplyTo].senderName}</div>
                                        <div className=" text-gray-700 dark:text-gray-500 pb-[3px]">
                                            {chats[chat.inReplyTo].text}
                                        </div>
                                    </div>
                                }
                                {chat.text}
                            </div>
                            <div className={` place-self-center place-content-center w-[30px] h-[30px] rounded-lg bg-green-600 text-white text-sm ${id===0?'grid':chats[id-1].senderEmail===chat.senderEmail?'hidden':'grid'}`}>
                                CB
                            </div>
                        </div>
                    ))}
                </div>
                </div>
            </div>
            <div className="grid w-[95%] h-[90%] place-self-center">
                <div className={`grid grid-flow-row ${replyTo!==-1?'grid-rows-[1fr_auto_1.5fr]':'grid-rows-[1fr_1.5fr]'}`}>
                    <div>

                    </div>
                    {
                        replyTo===-1?
                        ''
                        :
                        <div className={`w-full`}>
                            {
                                    <div className="grid grid-flow-col gap-[5px] text-xs text-gray-900 dark:text-slate-300 place-content-start pl-[4px]">
                                        <ArrowReply width={15}/>
                                        In reply to {chats[replyTo].senderName}
                                    </div>
                            }
                        </div>
                    }
                    <div className="grid grid-flow-col">
                    <div className="w-[90%] h-[70%] place-self-center">
                        <input type="text" name="newChat" id="newChat" placeholder="Type a message..." className="w-full h-full bg-transparent pl-[5px] outline-none text-gray-800 dark:text-slate-200"/>
                    </div>
                    <div onClick={sendMessage} className="grid place-content-center w-[100px] h-[70%] rounded-md cursor-pointer hover:bg-green-600 text-lg mx-[10px] place-self-center bg-green-500 text-white">
                        Send
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}