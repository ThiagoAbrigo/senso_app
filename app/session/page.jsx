
'use client'

import './login.css';

import * as Yup from 'yup';

import Cookies from 'js-cookie';
import { login } from '../hooks/Service_authenticate';
import swal from 'sweetalert';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import {yupResolver} from '@hookform/resolvers/yup';

export default function Session() {
  const router = useRouter();
  const validationShema = Yup.object().shape({
    email: Yup.string().trim().required('Ingrese su correo'),
    password: Yup.string().trim().required('Ingrese clave')
  });

  //metodo para que los nombres se guarden en mayuscula
  
  const formOptions = {resolver: yupResolver(validationShema)}
  const {register, handleSubmit, formState} = useForm(formOptions)
  let {errors} = formState;
  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      // Si no hay un token válido, redirigir al usuario a la página de inicio de sesión
      router.push('/session');
    } else {
      // Si hay un token válido, redirigir al usuario a la página del dashboard
      router.push('/dashboard');
    }
  }, []);
  const sendInfo = (data) => {
    login(data).then((info) => {
      if (info.code == '200') {
        console.log(info);
        Cookies.set('token', info.datos.token)
        Cookies.set('user', info.datos.user)
        swal({
          title:"SUCCESS",
          text: "Welcome" + info.datos.user,
          icon: "success",
          button: "Accept",
          timer: 4000,
          closeOnEsc: true
        })
        const token = Cookies.get('token');
        if (token) {
          router.push('/dashboard');
        }
      }else{
        swal({
          title:"ERROR",
          text: info.datos.error,
          icon: "error",
          button: "Accept",
          timer: 4000,
          closeOnEsc: true
        })
        console.log(info);
        console.log("NO");
      }
    })
  }
  return (
    <>
      <main className="form-signin text-center mt-5">
        <form onSubmit={handleSubmit(sendInfo)}>
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

          <div className="form-floating">
            <input type="text" {...register('email')} name='email'  className="form-control" id="floatingInput" placeholder="name@example.com" />
            <label htmlFor="floatingInput">Email address</label>
            {errors.email && <div className='text-xs inline-block py-1 px-2 rounded text-red-600'>{errors.email?.message}</div>}
          </div>
          <div className="form-floating">
            <input type="password" {...register('password')} name='password' className="form-control" id="floatingPassword" placeholder="Password" />
            <label htmlFor="floatingPassword">Password</label>
            {errors.password && <div className='text-xs inline-block py-1 px-2 rounded text-red-600'>{errors.password?.message}</div>}
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
        </form>
      </main>
    </>
  )
}