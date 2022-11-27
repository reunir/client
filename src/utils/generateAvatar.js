import axios from 'axios';

const sprites = [
    'male',
    'female',
    'human',
    'identicon',
    'initials',
    'bottts',
    'avataaars',
    'jdenticon',
    'gridy',
    'micah'
]

const generateOrGetAvatar = async () => {
    if (sessionStorage.getItem(window.btoa("reunir-user-avatar"))) {
        return sessionStorage.getItem(window.btoa("reunir-user-avatar"));
    } else {
        const stripe = sprites[Math.floor(Math.random() * sprites.length)];
        const seed = (await axios.get("https://random-word-api.herokuapp.com/word")).data[0];
        const avatar = await axios.get(`https://avatars.dicebear.com/api/${stripe}/${seed}.svg?background=%230000ff`);
        sessionStorage.setItem(window.btoa("reunir-user-avatar"),avatar.data);
        return avatar.data;
    }
}
export default generateOrGetAvatar