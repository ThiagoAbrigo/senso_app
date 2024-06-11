import {GET, POST} from './Connection';

export async function listPerson (token) {
    let datos = null
    try {
        datos = await GET('person', token);
    } catch (error) {
        console.log(error.response.data);
        return{"code": 500}
    }
    return datos.data;
}

export async function save_censado (data, token) {
    try {
        return await POST('person/save/censado', data, token);
    } catch (error) {
        console.error(error);
        return null; 
    }
}

export async function update_person(data, params, token) {
    console.log(data, params);
    try {
        return await POST('modify_person/'+params.external, data, token);
    } catch (error) {
        console.error(error);
        return null;
    }
}  

export async function allType(token) {
    let datos = null
    try {
        datos = await GET('list_status', token);
    } catch (error) {
        console.log(error.response.data);
        return{"code": 500}
    }
    return datos.data;
}

export async function  get_person(token,params){
    let datos = null;
    try {

        datos = await GET('person/'+params.external,token);
    } catch (error) {
        console.log(error.response.data);
        return{"code": 500}
    }
    return datos.data;
}
