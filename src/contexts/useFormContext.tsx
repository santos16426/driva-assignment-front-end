import { useContext } from "react";
import { FormContext } from "./FormContext";

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error("useFormContext hook must be added within <FormProvider/>");
  }
  return context;
};
