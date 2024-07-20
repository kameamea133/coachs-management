"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/customer.actions"
import { FormFieldType } from "./CustomerForm"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { GenderOptions } from "@/constants"
import { Label } from "../ui/label"

 
 
const RegisterForm = ({ user }: {user: User}) => {
  
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  })
 
  
  const onSubmit = async ({ name, email, phone }: z.infer<typeof UserFormValidation>) => {
    setIsLoading(true);

    try {
      const user = {
      name,
      email,
      phone   
      };

      const newUser = await createUser(user);
     
      
      if(newUser) {
        router.push(`/customers/${newUser.$id}/register`)
      }
    } catch(error) {
      console.log(error)
    }
    setIsLoading(false)
  };


  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
      <section className="space-y-4">
        <h1 className="header">Welcome</h1>
        <p className="text-dark-700">Let us know more about yourself</p>
      </section>

      <section className="space-y-4">
        <h2 className="header">Personal Information</h2>
      </section>
      
      <CustomFormField
      fieldType={FormFieldType.INPUT} 
      control={form.control}
      name="name"
      placeholder="Stephane"
      iconSrc="/assets/icons/user.svg"
      iconAlt="user"
      />

      <div className="flex flex-col gap-6 xl:flex-row xl:justify-between">
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
      </div>

    <div className="flex flex-col gap-6 xl:flex-row">
    <CustomFormField
      fieldType={FormFieldType.DATE_PICKER} 
      control={form.control}
      name="birthDate"
      label="Day of Birth"
     
      />

      <CustomFormField
      fieldType={FormFieldType.SKELETON} 
      control={form.control}
      name="gender"
      label="Gender"
      renderSkeleton={(field) => (
        <FormControl>
            <RadioGroup className="flex h-11 gap-6 xl:justify-between" 
            onValueChange={field.onChange}
            defaultValue={field.value}
            >
                {GenderOptions.map((option, i) => (
                      <div key={option + i} className="radio-group">
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option} className="cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
            </RadioGroup>
        </FormControl>
      )}
      />
    </div>

  
    <CustomFormField
      fieldType={FormFieldType.INPUT} 
      control={form.control}
      name="adress"
      label="Address"
      placeholder="7 av des Champs élysées, Paris"
      />
      
   

    <div className="flex flex-col gap-6 xl:flex-row xl:justify-between">
    <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="emergencyContactName"
              label="Emergency contact name"
              placeholder="Guardian's name"
            />

            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="emergencyContactNumber"
              label="Emergency contact number"
              placeholder="(555) 123-4567"
            />
    </div>

    <section className="space-y-4">
        <h2 className="sub-header">Training Informations</h2>
      </section>

      <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="emergencyContactNumber"
              label="Emergency contact number"
              placeholder="(555) 123-4567"
            />

      <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
    </form>
  </Form>
  )
}

export default RegisterForm