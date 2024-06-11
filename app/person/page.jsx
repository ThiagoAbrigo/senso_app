'use client';

import Cookies from 'js-cookie';
import Link from 'next/link'
import Menu from '../components/menu';
import { listPerson } from '../hooks/Service_person';
import { useState } from 'react';
export default function Person() {
  let token = Cookies.get('token');
  let [persons, setPersons] = useState(null);
  let [status, setStatus] = useState(false);
  if (!status) {
    listPerson(token).then((info) => {
        if(info.code ==  200){
            setPersons(info.data)
        }
    });
    setStatus(true)
  }
  return (
    <>
      <main className="container text-center mt-5">
        <Menu></Menu>
        <div className='container-fluid'>
            <div className='col-3'>
                <Link href = "/person/new" style={{margin:"10px"}} className="btn btn-info">Nuevo</Link>
            </div>
            <table className='table table-hover'>
                <thead>
                    <tr>
                        <th>Nro</th>
                        <th>Usuario</th>
                        <th>Estado</th>
                        <th>Fecha</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {persons && persons.map((data, i) => (
                        <tr key={i}>
                            <td>{i+1}</td>
                            <td>{data.lastname} {data.name}</td>
                            <td>{data.civilstatus}</td>
                            <td>{data.date}</td>
                            <td>
                              <Link href= {'/person/' + data.external_id} className='btn btn-danger'> Modificar </Link>
                            </td>
                        </tr>  
                    ))}
                </tbody>
            </table>
        </div>
      </main>
    </>
  )
}