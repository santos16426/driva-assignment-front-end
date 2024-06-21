import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loanDetailSchema } from "../utils/validation";
import { useFormContext } from "../contexts/useFormContext";
import { useNavigate } from "react-router-dom";
import Wrapper from "../components/form/Wrapper";
import { LoanDetails } from "../types";
import FormField from "../components/form/FormField";
import { LoanPurpose } from "../constants";
import Button from "../components/form/Button";

const LoanDetailsForm: React.FC = () => {
  const { loanDetails, setLoanDetails } = useFormContext();
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm<LoanDetails>({
    resolver: zodResolver(loanDetailSchema),
    defaultValues: loanDetails,
  });

  const onSubmit: SubmitHandler<LoanDetails> = (data) => {
    setLoanDetails(data);
    navigate("/summary");
  };

  return (
    <Wrapper title="Loan Detail Form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField
          control={control}
          name="vehiclePrice"
          label="Vehicle Price"
          type="number"
        />
        <FormField
          control={control}
          name="deposit"
          label="Deposit"
          type="number"
        />
        <FormField
          control={control}
          name="loanPurpose"
          label="Loan Purpose"
          type="select"
          options={Object.keys(LoanPurpose).map((key) => ({
            value: LoanPurpose[key as keyof typeof LoanPurpose],
            label: LoanPurpose[key as keyof typeof LoanPurpose],
          }))}
        />
        <FormField
          control={control}
          name="loanTerm"
          label="Loan Term (years)"
          type="number"
        />
        <div>
          <Button className="mr-4" onClick={() => navigate(-1)}>
            Back
          </Button>
          <Button type="submit" variant="submit">
            Next
          </Button>
        </div>
      </form>
    </Wrapper>
  );
};

export default LoanDetailsForm;
