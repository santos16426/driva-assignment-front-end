import React from "react";
import { Lender } from "../types";

interface Props {
  lender: Lender;
  onClick: () => void;
  active: boolean;
}

const LenderCard = (props: Props) => {
  const { lender, onClick, active } = props;
  return (
    <div
      className={`lender-card flex flex-col p-4 bg-accent w-52 cursor-pointer rounded-md bg-opacity-50 hover:bg-opacity-60 ${
        active && "bg-opacity-100"
      }`}
      onClick={onClick}
    >
      <strong>Name:</strong> {lender.name}
      <strong>Interest Rate:</strong> {lender.interestRate}%
      <strong>Fee:</strong> {lender.fee}
    </div>
  );
};

export default LenderCard;
