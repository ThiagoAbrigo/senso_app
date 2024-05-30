
'use client'

import './login.css';

import * as Yup from 'yup';

import { login } from '../hooks/Service_authenticate';
import swal from 'sweetalert';
import { useForm } from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

export default function Session() {
  const validationShema = Yup.object().shape({
    email: Yup.string().trim().required('Ingrese su correo'),
    password: Yup.string().trim().required('Ingrese clave')
  });

  //metodo para que los nombres se guarden en mayuscula
  
  const formOptions = {resolver: yupResolver(validationShema)}
  const {register, handleSubmit, formState} = useForm(formOptions);
  let {errors} = formState;
  const sendInfo = (data) => {
    console.log(data);
    login(data).then((info) => {
      if (info.code == '200') {
        console.log(info);
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