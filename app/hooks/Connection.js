const URL = process.env.URL_API;

import axios from 'axios';

export const GET = async (resource, token="NONE") => {
    let headers = {
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json"
        }
    }
    if (token != 'NONE') {
        let headers = {
            headers:{
                "Accept": "application/json",
                "X-Access-Token": token
            }
        }
    }
    return await axios.get(URL + resource, headers)
}

export const POST = async (resource, data, token="NONE") => {
    let headers = {
        "Accept": "application/json",
        "Content-type": "application/json"
    }
    if (token != "NONE") {
        headers = {
            headers: {
                "Accept": "application/json",
                "X-Access-Token": token,
            }
        }
    }
    return await axios.post(URL + resource, data, headers)
}