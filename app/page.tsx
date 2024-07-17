import Image from "next/image";
import CustomerForm from "../components/forms/CustomerForm"
import Link from "next/link";


export default function Home() {
  return (
   <div className="flex h-screen max-h-screen">
    <section className="remove-scrollbar container my-auto">
      <div className="sub-contaienr max-w-[496px]">
        <Image src="/assets/icons/coachAppLogo.png" alt="coach" width={1000} height={1000} className="mb-12 h-20 w-20 object-contain bg-gray-200 rounded-full"/>
        <CustomerForm />

        <div className="text-14-regular mt-20 flex justify-between">
          <p className="justify-items-end text-dark-600 xl:text-left">© 2024 Coachs Management</p>
          <Link href="/?admin=true" className="text-green-500">Admin</Link>
          </div>
      </div>
    </section>

    <Image  src="/assets/images/student1.jpg" alt="student" width={1000} height={1000}
     className="side-img maw-w-[50%]"/>
   </div>
  );
}
