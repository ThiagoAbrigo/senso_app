'use client'

import Cookies from 'js-cookie';
import Menu from '../components/menu';
import { listPerson } from '../hooks/Service_person';

export default function Dashboard() {
  // let token = Cookies.get('token')
  // listPerson(token).then((info)=>{
  //   console.log(info);
  // })
  return (
    <>
      <main className="form-signin text-center mt-5">
        <Menu></Menu>
        <h1>WELCOME</h1>
      </main>
    </>
  )
}