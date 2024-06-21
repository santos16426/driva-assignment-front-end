import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { personalDetailSchema } from "../utils/validation";
import { useFormContext } from "../contexts/useFormContext";
import { EmploymentStatus } from "../constants";
import { useNavigate } from "react-router-dom";
import FormField from "../components/form/FormField";
import Wrapper from "../components/form/Wrapper";
import Button from "../components/form/Button";
import { PersonalDetails } from "../types";

const PersonalDetailsForm: React.FC = () => {
  const { personalDetails, setPersonalDetails } = useFormContext();
  const navigate = useNavigate();

  const { control, handleSubmit, watch, setValue } = useForm<PersonalDetails>({
    resolver: zodResolver(personalDetailSchema),
    defaultValues: personalDetails,
  });

  const employmentStatus = watch("employmentStatus");

  const onSubmit: SubmitHandler<PersonalDetails> = (data) => {
    setPersonalDetails(data);
    navigate("/loan-details");
  };

  useEffect(() => {
    if (employmentStatus !== EmploymentStatus.EMPLOYED) {
      setValue("employerName", "");
    }
  }, [employmentStatus, setValue]);

  return (
    <Wrapper title="Personal Detail Form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField control={control} name="firstName" label="First Name" />
        <FormField control={control} name="lastName" label="Last Name" />
        <FormField
          control={control}
          name="dob"
          label="Date of Birth"
          type="date"
        />
        <FormField control={control} name="email" label="Email" type="email" />
        <FormField control={control} name="mobile" label="Mobile" />
        <FormField control={control} name="address" label="Address" />
        <FormField
          control={control}
          name="employmentStatus"
          label="Employment Status"
          type="select"
          options={Object.keys(EmploymentStatus).map((key) => ({
            value: EmploymentStatus[key as keyof typeof EmploymentStatus],
            label: EmploymentStatus[key as keyof typeof EmploymentStatus],
          }))}
        />
        {employmentStatus === EmploymentStatus.EMPLOYED && (
          <FormField
            control={control}
            name="employerName"
            label="Employer Name"
          />
        )}
        <FormField
          control={control}
          name="annualIncome"
          label="Annual Income"
          type="number"
        />
        <Button type="submit" variant="submit">
          Next
        </Button>
      </form>
    </Wrapper>
  );
};

export default PersonalDetailsForm;
