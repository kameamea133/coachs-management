import { Models } from "node-appwrite";

export interface Customer extends Models.Document {
  userId: string;
  name: string;
  email: string;
  phone: string;
  birthDate: Date;
  gender: Gender;
  address: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
}

export interface Class extends Models.Document {
  customer: Customer;
  schedule: Date;
  status: Status;
  reason: string;
  note: string;
  userId: string;
  cancellationReason: string | null;
}