import Cookies from 'js-cookie';
import {GET} from './Connection';

export async function listPerson (token) {
    let data = null
    try {
        data = await GET('person', token);
    } catch (error) {
        return error.response.data
    }
    return data.data;
}
