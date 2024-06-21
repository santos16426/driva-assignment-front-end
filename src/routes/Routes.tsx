import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PersonalDetail from "../views/PersonalDetailsForm";
import LoanDetail from "../views/LoanDetailsForm";
import ResultDetail from "../views/ResultPage";
import SuccessPage from "../views/Success";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PersonalDetail />} />
        <Route path="/loan-details" element={<LoanDetail />} />
        <Route path="/summary" element={<ResultDetail />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
