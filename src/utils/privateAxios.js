import axios from "axios"

const privateGetRequest = async (url) => {
    axios(
        {
            headers:{
                'Authorization': axios.defaults.headers.common['Authorization'],
                'Accept':'application/json',
                'Content-Type': 'application/json'
            },
            url,
            method: 'GET'
        }
    ).then(res => {
        console.log(res.data)
        return res.data;
    }).catch(err => {console.log(err)})
}

export {privateGetRequest}