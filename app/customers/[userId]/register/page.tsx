import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import RegisterForm from '@/components/forms/RegisterForm'
import { getUser } from '@/lib/actions/customer.actions'

const Register = async ({ params: { userId }}: SearchParamProps) => {
  const user = await getUser(userId);
  return (
    <div className="flex h-screen max-h-screen">
    <section className="remove-scrollbar container my-auto">
      <div className="sub-contaienr max-w-[496px]">
        <Image src="/assets/icons/coachAppLogo.png" alt="coach" width={1000} height={1000} className="mb-12 h-20 w-20 object-contain bg-gray-200 rounded-full"/>
       <RegisterForm user={user}/>

        <div className="text-14-regular mt-20 flex justify-between">
          <p className="justify-items-end text-dark-600 xl:text-left">© 2024 Coachs Management</p>
          <Link href="/?admin=true" className="text-green-500">Admin</Link>
          </div>
      </div>
    </section>

    <Image  src="/assets/images/student2.png" alt="student" width={1000} height={500}
     className="side-img maw-w-[390px]"/>
   </div>
  )
}

export default Register