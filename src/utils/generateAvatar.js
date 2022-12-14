import axios from 'axios';
import { axiosExternal } from '../axiosDefault';

const sprites = [
    'male',
    'female',
    'human',
    'identicon',
    'bottts',
    'avataaars',
    'jdenticon',
    'gridy',
    'micah'
]
const getColorCode = () => {
    var makeColorCode = '0123456789ABCDEFabcdef';
    var code = '';
    for (var count = 0; count < 8; count++) {
       code =code+ makeColorCode[Math.floor(Math.random() * 16)];
    }
    return code;
 }
const generateNewAvatar = async () => {
        const stripe = sprites[Math.floor(Math.random() * sprites.length)];
        const seed = (await axios.get("https://random-word-api.herokuapp.com/word")).data[0];
        const randomColor = getColorCode();
        const avatar = await axios.get(`https://avatars.dicebear.com/api/${stripe}/${seed}.svg?background=%23${randomColor}`);
        return {avatar:avatar.data,stripe,seed,randomColor};
}
const generateAndReturnAvatar = async (stripe,seed,backgroundColor) => {
    const avatar = await axiosExternal.get(`https://avatars.dicebear.com/api/${stripe}/${seed}.svg?background=%23${backgroundColor}`);
    return avatar;
}
const getUserAvatar = () => {
    return sessionStorage.getItem(window.btoa("reunir-user-avatar")) || "";
}
const setUserAvatar = async ({stripe,seed,backgroundColor}) => {
    const avtr = await axiosExternal.get(`https://avatars.dicebear.com/api/${stripe}/${seed}.svg?background=%23${backgroundColor}`)
    sessionStorage.setItem(window.btoa("reunir-user-avatar"),avtr.data);
}
export {generateNewAvatar,getUserAvatar,setUserAvatar, generateAndReturnAvatar}