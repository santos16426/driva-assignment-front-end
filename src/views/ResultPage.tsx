import React, { useEffect, useState } from "react";
import { useFormContext } from "../contexts/useFormContext";
import { Lender, LoanDetails, LoanSummary } from "../types";
import Wrapper from "../components/form/Wrapper";
import { fetchLoanDetails, submitLoan } from "../services/apiService";
import LenderCard from "../components/LenderCard";
import Button from "../components/form/Button";
import { useNavigate } from "react-router-dom";
const ResultPage: React.FC = () => {
  const [lenders, setLenders] = useState<Lender[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLender, setSelectedLender] = useState<number | null>(null);
  const { setLoanSummary, loanDetails } = useFormContext();

  const navigate = useNavigate();
  useEffect(() => {
    const fetchLendersData = async () => {
      try {
        const data = await fetchLoanDetails();
        setLenders(data);
      } catch (error) {
        setError("Failed to fetch lenders.");
      } finally {
        setLoading(false);
      }
    };

    fetchLendersData();
  }, []);

  const {} = useFormContext();

  const handleSubmit = async () => {
    if (
      !selectedLender ||
      !loanDetails ||
      loanDetails.vehiclePrice === undefined ||
      loanDetails.deposit === undefined ||
      loanDetails.loanTerm === undefined
    )
      return;
    const data = {
      loanValue: loanDetails?.vehiclePrice - loanDetails?.deposit,
      term: loanDetails?.loanTerm,
    };

    if (selectedLender !== null) {
      try {
        const summary: LoanSummary = await submitLoan(selectedLender, data);
        setLoanSummary(summary);
        navigate("/success");
      } catch (error) {
        setError("Failed to submit loan.");
      }
    }
  };
  const renderLenders = () => {
    if (error) return <div>{error}</div>;
    else if (loading) return <div>Loading...</div>;
    else {
      return (
        <div className="flex flex-row gap-4">
          {lenders.map((lender) => (
            <LenderCard
              active={lender.id === selectedLender}
              lender={lender}
              onClick={() => setSelectedLender(lender.id)}
            />
          ))}
        </div>
      );
    }
  };
  return (
    <Wrapper title="Results Page">
      <p className="mb-2">
        <p className="font-bold">Loan Amount:</p>{" "}
        {loanDetails && loanDetails?.vehiclePrice - loanDetails?.deposit}
      </p>
      <p className="mb-2">
        <p className="font-bold">Loan Purpose:</p> {loanDetails?.loanPurpose}
      </p>
      <p className="mb-2">
        <p className="font-bold">Loan Term:</p> {loanDetails?.loanTerm} years
      </p>

      <p className="text-xl text-center font-bold mb-4">List of Lenders</p>
      {renderLenders()}
      <div className="my-4 flex flex-row justify-center">
        <Button className="mr-4" onClick={() => navigate(-1)}>
          Back
        </Button>
        <Button
          onClick={handleSubmit}
          variant="submit"
          disabled={!selectedLender}
          className={!selectedLender ? "bg-opacity-50 cursor-not-allowed" : ""}
        >
          Submit
        </Button>
      </div>
    </Wrapper>
  );
};
export default ResultPage;
