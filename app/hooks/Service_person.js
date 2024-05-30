import {GET} from './Connection';

export async function listPerson () {
    let data = null
    try {
        data = await GET('person');
    } catch (error) {
        // console.log(error.response.data);
        return error.response.data
    }
    return data.data;
    //Errors
    
}
