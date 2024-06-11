'use client';

import * as Yup from 'yup';

import { allType, get_person, update_person } from '@/app/hooks/Service_person';
import { useEffect, useState } from 'react';

import Cookies from 'js-cookie';
import swal from 'sweetalert';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';

export default function Edit(params){
    const router = useRouter();
    let [civilStatus, setCivilStatus] = useState(null);
    let [estado, setEstado] = useState(null);
    let[censado, setCensado] = useState(null);
    let token = Cookies.get('token');
    if (!estado) {
        allType (token).then((info) => {
            if (info.code == '200') {
                setCivilStatus(info.datos);
            }
        });
        setEstado(true);
    }
    if (!estado){
        get_person(token,params.params).then((info) => {
            if (info.code == '200') {
                setCensado(info.datos);
            }
            setEstado(true);
        }
        );
    }
    const validationSchema = Yup.object().shape({
        name: Yup.string().trim().required('El nombre es requerido'),
        lastname: Yup.string().trim().required('El apellido es requerido'),
        date: Yup.date().required('La fecha de nacimiento es requerida'),
        civilstatus: Yup.string().trim().required('El estado civil es requerido')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, formState, setValue } = useForm(formOptions);
    let { errors } = formState;
    const sendInfo = async (data) => {
        let date = new Date(data.date);
        let year = date.getFullYear();
        let month = ('0' + (date.getMonth() + 1)).slice(-2); 
        let day = ('0' + date.getDate()).slice(-2);
        data.date = `${year}-${month}-${day}`;
        const info = await update_person(data, params.params, token);
        if (info && info.status == '200') {
            swal({
                title: "Registro exitoso",
                text:  "Persona actulizada correctamente",
                icon: "success",
                button: "Aceptar",
                timer: 4000,
                closeOnEsc: true,
            });
            router.push('/person')
            router.refresh()
        } else {
            swal({
                title: "Error",
                text: info ? info.data.error : 'Error desconocido',
                icon: "error",
                button: "Aceptar",
                timer: 4000,
                closeOnEsc: true,
            });
        }
    };
    useEffect(() => {
        if (!censado && params.params) {
            get_person(token, params.params).then((info) => {
                if (info.code == '200') {
                    setCensado(info.datos);
                    // Aquí usas setValue para cada campo, asegurándote de que los nombres coincidan con los de tu formulario
                    setValue('name', info.data.name);
                    setValue('lastname', info.data.lastname);
                    setValue('date', info.data.date);
                    setValue('civilstatus', info.data.civilstatus.toLowerCase());
                }
                setEstado(true);
            });
        }
    }, [params.params, censado, setValue, token]); 
    return(
        <div>
            <form onSubmit={handleSubmit(sendInfo)}>
                <div className="form-group">
                    <label className="form-label">Nombre:</label>
                    <input type="text" defaultValue={censado && censado.name}  {...register('name')} name="name" className="form-control"/>
                    {errors.name && <div>{errors.name?.message}</div>}
                </div>
                <div className="form-group">
                    <label className="form-label">Apellido:</label>
                    <input type="text" name="lastname" defaultValue={censado && censado.lastname} {...register('lastname')} className="form-control"/>
                    {errors.lastname && <div>{errors.lastname?.message}</div>}
                </div>
                <div className="form-group">
                    <label className="form-label">Fecha nacimiento:</label>
                    <input type="date" name="date" defaultValue={censado && censado.date} {...register('date')} className="form-control"/>
                    {errors.date && <div>{errors.date?.message}</div>}
                </div>
                <div className="form-group">
                    <label className="form-label">Estado Civil:</label>
                    <select name="civilstatus" {...register('civilstatus')} className="form-control">
                            <option value="">Selecciona...</option>
                            {civilStatus && civilStatus.map((estado, index) => (
                                <option key={index} value={estado.toLowerCase()}>{estado}</option>
                            ))}
                    </select>
                    {errors.civilstatus && <div>{errors.civilstatus?.message}</div>}
                </div>
                <button type="submit" className="btn btn-primary">Primary</button>
            </form>
        </div>
    )
}