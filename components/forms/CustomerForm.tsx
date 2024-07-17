"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFomrValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"


export enum FormFieldType {
  INPUT = 'input',
  TEXTAREA = 'textarea',
  PHONE_INPUT = 'phoneInput',
  CHECKBOX = 'checkbox',
  DATE_PICKER = 'datePicker',
  SELECT = 'select',
  SKELETON = 'skeleton',
}
 
 
const CustomerForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof UserFomrValidation>>({
    resolver: zodResolver(UserFomrValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  })
 
  
  async function onSubmit({ name, email, phone }: z.infer<typeof UserFomrValidation>) {
    setIsLoading(true);

    try {
      // const userData = {
      // name,
      // email,
      // phone   
      // };

      // const user = await createUser(userData);

      // if(user) {
      //   router.push(`/customer/${user.id}/register`)
      // }
    } catch(error) {
      console.log(error)
    }
  }


  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
      <section className="mb-12 space-y-4">
        <h1>Welcome</h1>
        <p>Book your first training</p>
      </section>
      
      <CustomFormField
      fieldType={FormFieldType.INPUT} 
      control={form.control}
      name="name"
      label="Full name"
      placeholder="Stephane"
      iconSrc="/assets/icons/user.svg"
      iconAlt="user"
      />

      <CustomFormField
      fieldType={FormFieldType.INPUT} 
      control={form.control}
      name="email"
      label="Email"
      placeholder="monnier1977@gmail.com"
      iconSrc="/assets/icons/email.svg"
      iconAlt="email"
      />

      <CustomFormField
      fieldType={FormFieldType.PHONE_INPUT} 
      control={form.control}
      name="phone"
      label="Phone number"
      placeholder="07 11 11 11 11"
      iconSrc="/assets/icons/email.svg"
      iconAlt="email"
      />
      <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
    </form>
  </Form>
  )
}

export default CustomerForm