'use client';

import * as Yup from 'yup';

import { allType, save_censado } from '@/app/hooks/Service_person';

import Cookies from 'js-cookie';
import swal from 'sweetalert';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

export default function SaveSensado(){
    const router = useRouter();
    let [civilStatus, setCivilStatus] = useState(null);
    let [estado, setEstado] = useState(null);
    let token = Cookies.get('token');
    if (!estado) {
        allType (token).then((info) => {
            if (info.code == '200') {
                setCivilStatus(info.datos);
                console.log(info.datos);
            }else {
                setCivilStatus([]);
            }
        });
        setEstado(true);

    }
    const validationSchema = Yup.object().shape({
        name: Yup.string().trim().required('El nombre es requerido'),
        lastname: Yup.string().trim().required('El apellido es requerido'),
        date: Yup.date().required('La fecha de nacimiento es requerida'),
        civilstatus: Yup.string().trim().required('El estado civil es requerido')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, formState } = useForm(formOptions);
    let { errors } = formState;
    const sendInfo = async (data) => {
        console.log(data);
        let date = new Date(data.date);
        let year = date.getFullYear();
        let month = ('0' + (date.getMonth() + 1)).slice(-2); 
        let day = ('0' + date.getDate()).slice(-2);
        data.date = `${year}-${month}-${day}`;
        const info = await save_censado(data, token);
        if (info && info.status == '200') {
            swal({
                title: "Registro exitoso",
                text:  "Registro exitoso",
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
                text: info ? info.datos.error : 'Error desconocido',
                icon: "error",
                button: "Aceptar",
                timer: 4000,
                closeOnEsc: true,
            });
        }
    };
    return(
        <div>
            <form onSubmit={handleSubmit(sendInfo)}>
                <div className="form-group">
                    <label className="form-label">Nombre:</label>
                    <input type="text"  {...register('name')} name="name" className="form-control"/>
                    {errors.name && <div>{errors.name?.message}</div>}
                </div>
                <div className="form-group">
                    <label className="form-label">Apellido:</label>
                    <input type="text" name="lastname" {...register('lastname')} className="form-control"/>
                    {errors.lastname && <div>{errors.lastname?.message}</div>}
                </div>
                <div className="form-group">
                    <label className="form-label">Fecha nacimiento:</label>
                    <input type="date" name="date" {...register('date')} className="form-control"/>
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