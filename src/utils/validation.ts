import { z } from 'zod'
import {
  EmploymentStatus,
  LoanPurpose,
  MIN_VEHICLE_PRICE
} from '../constants';

export const personalDetailSchema = z.object({
  firstName: z.string({ required_error: "First name is required" }).min(2, { message: "Must be 2 or more characters long"  }),
  lastName: z.string({ required_error: "Last name is required" }).min(2, { message: "Must be 2 or more characters long"  }),
  dob: z.preprocess((arg) => {
    if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
  }, z.date({ required_error: "Date of birth is required" }).max(new Date(), { message: "Too young" }).refine((val) => !isNaN(val.getTime()), { message: "Must be a valid date" })),
  email: z.string({ required_error: "Email address is required" }).email({ message: "Must be 2 or more characters long"  }),
  mobile: z.string({ required_error: "Mobile is required" }).min(8, { message: "Must be 8 or more characters long"  }),
  address: z.string({ required_error: "Address is required" }).min(2, { message: "Must be 2 or more characters long"  }),
  employmentStatus: z.enum(Object.values(EmploymentStatus) as [string, ...string[]], { message: "Employment status is required" }),
  employerName: z.string().optional(),
  annualIncome: z.number({required_error: 'Annual income is required'}).positive({ message: "Annual income must be greater than 0" })
}).refine((data) => {
  return data.employmentStatus === 'Employed' ? Boolean(data.employerName) : true},{
  message: "Employer name is required",
  path: ["employerName"],
});

export const loanDetailSchema = z.object({
  vehiclePrice: z.number().min(MIN_VEHICLE_PRICE, { message: `Vehicle price must be at least greater than $${MIN_VEHICLE_PRICE}`}).positive({ message: "Vehicle price must be greater than $0" }),
  deposit: z.number().min(0, { message: "Deposit cannot be less than $0" }),
  loanPurpose: z.enum(Object.values(LoanPurpose) as [string, ...string[]]),
  loanTerm: z.number().min(1, "Loan term must be at least a year").max(7, "Loan term must be at most 7 years")
}).refine(data => {
  const maxAllowedDeposit = data.vehiclePrice - MIN_VEHICLE_PRICE;
  return data.deposit <= data.vehiclePrice && data.deposit <= maxAllowedDeposit;
}, {
  message: `Deposit should not exceed vehicle price or ${MIN_VEHICLE_PRICE} less than vehicle price`,
  path: ['deposit']
});