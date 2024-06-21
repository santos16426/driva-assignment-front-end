import React from "react";
import AppRoutes from "./routes/Routes";
import { FormProvider } from "./contexts/FormContext";

const App: React.FC = () => {
  return (
    <FormProvider>
      <AppRoutes />
    </FormProvider>
  );
};

export default App;
