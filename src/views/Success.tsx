import React from "react";
import Wrapper from "../components/form/Wrapper";
import { useFormContext } from "../contexts/useFormContext";

const SuccessPage: React.FC = () => {
  const { loanSummary, personalDetails } = useFormContext();
  return (
    <Wrapper title="Success!">
      <div>
        <p className="mb-2">
          <p className="font-bold">Name: </p> {personalDetails?.firstName}{" "}
          {personalDetails?.lastName}
        </p>
        <p className="mb-2">
          <p className="font-bold">Email:</p> {personalDetails?.email}
        </p>
        <p className="mb-2">
          <p className="font-bold">Mobile:</p> {personalDetails?.mobile}
        </p>
        <hr />
        <p className="mb-2">
          <p className="font-bold">Lender: </p> {loanSummary?.name}
        </p>
        <p className="mb-2">
          <p className="font-bold">Interest Rate:</p>{" "}
          {loanSummary?.interestRate}%
        </p>
        <p className="mb-2">
          <p className="font-bold">Fee:</p> {loanSummary?.fee}
        </p>
        <p className="mb-2">
          <p className="font-bold">Monthly Repayment:</p>{" "}
          {loanSummary?.monthlyRepayment}
        </p>
      </div>
    </Wrapper>
  );
};

export default SuccessPage;
