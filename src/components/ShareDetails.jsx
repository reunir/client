import { Share } from '@styled-icons/entypo'
import { Copy } from '@styled-icons/ionicons-sharp';
import { useState } from 'react'
import useClippy from 'use-clippy';
export default function ShareDetails({ id, addNotification }) {
    const [show, setShow] = useState(false);
    const [clipboard, setClipboard] = useClippy()
    const copyToClipboard = () => {
        const link = `https://reunir.in/meet/${id}`;
        setClipboard(link)
        setShow(false)
        addNotification({ status: 1, error: {}, success: { data: "", message: "Copied to clipboard!" } })
    }
    return (
        <div className='grid place-content-center relative'>
            <div className='grid' onClick={() => { setShow(!show) }}>
                <Share width={30} className="text-gray-500 cursor-pointer dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700" />
            </div>
            <div className={`${show ? 'grid' : 'hidden'} px-[20px] content-center absolute top-[110%] z-[999] border border-gray-300 right-0 bg-white rounded-md w-[400px] h-[100px]`}>
                <div className='w-full h-[40px] grid grid-cols-[1fr_auto] gap-[10px]'>
                    <input type="text" value={'https://reunir.in/meet/' + id} readOnly disabled className='bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                    <div className='grid place-content-center'>
                        <button onClick={copyToClipboard} class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-indigo-100 border border-indigo-500 rounded-lg shadow-sm cursor-pointer hover:text-white bg-gradient-to-br from-purple-500 via-indigo-500 to-indigo-500">
                            <Copy className='cursor-pointer w-5 h-5' onClick={copyToClipboard} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}