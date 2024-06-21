import React, { createContext, useState } from "react";
import { PersonalDetails, LoanDetails, LoanSummary } from "../types";

type FormContextType = {
  personalDetails: PersonalDetails;
  loanDetails: LoanDetails;
  loanSummary: LoanSummary;
  setPersonalDetails: (details: PersonalDetails) => void;
  setLoanDetails: (details: LoanDetails) => void;
  setLoanSummary: (details: LoanSummary) => void;
};

const FormContext = createContext<FormContextType | undefined>(undefined);

const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>({
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    mobile: "",
    address: "",
    employmentStatus: "",
    employerName: "",
    annualIncome: "",
  });
  const [loanDetails, setLoanDetails] = useState<LoanDetails>({
    vehiclePrice: 0,
    deposit: 0,
    loanPurpose: "Vehicle",
    loanTerm: 0,
  });
  const [loanSummary, setLoanSummary] = useState<LoanSummary>({
    fee: "",
    id: 0,
    interestRate: 0,
    monthlyRepayment: 0,
    name: "",
  });
  return (
    <FormContext.Provider
      value={{
        personalDetails,
        loanDetails,
        loanSummary,
        setPersonalDetails,
        setLoanDetails,
        setLoanSummary,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export { FormProvider, FormContext };
