/* eslint-disable no-unused-vars */

declare type SearchParamProps = {
    params: { [key: string]: string };
    searchParams: { [key: string]: string | string[] | undefined };
  };
  
  declare type Gender = "Male" | "Female" | "Other";
  declare type Status = "pending" | "scheduled" | "cancelled";
  
  declare interface CreateUserParams {
    name: string;
    email: string;
    phone: string;
  }
  declare interface User extends CreateUserParams {
    $id: string;
  }
  
  declare interface RegisterUserParams extends CreateUserParams {
    userId: string;
    birthDate: Date;
    gender: Gender;
    address: string;
    emergencyContactName: string;
    emergencyContactNumber: string;
  }
  
  declare type CreateClassParams = {
    userId: string;
    customer: string;
    reason: string;
    schedule: Date;
    status: Status;
    note: string | undefined;
  };
  
  declare type UpdateClassParams = {
    classId: string;
    userId: string;
    class: Class;
    type: string;
  };