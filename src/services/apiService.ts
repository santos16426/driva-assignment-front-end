import axios from 'axios';
import { Lender } from '../types';

const BASE_URL = 'http://localhost:3001';  //apply base url

export const fetchLoanDetails = async (): Promise<Lender[]> => {
  try {
    const response = await axios.get<Lender[]>(`${BASE_URL}/offers`);
    return response.data;
  } catch (error) {
    console.error('Error fetching loan details:', error);
    throw error;
  }
};

interface LoanBody {
  loanValue: number;
  term: number;
}

export const submitLoan = async <LoanSummary>(id: number, body: LoanBody): Promise<LoanSummary> => {
  try {
    const response = await axios.post<LoanSummary>(`${BASE_URL}/submit/${id}`, body);
    return response.data;
  } catch (error) {
    console.error('Error submitting loan:', error);
    throw error;
  }
};