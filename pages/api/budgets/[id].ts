import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import BudgetModel from "../../../models/budget";
import ExpenseModel from "../../../models/expenses";
import { stringListToArray } from "../../../utils/stringListToArray";

interface BudgetFilters {
  year?: { $in: string[] };
  month?: { $eq: number };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  await dbConnect();

  const {
    query: { id },
  } = req;

  try {
    const result = await getDetailedBudget(id as string);

    res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ success: false });
  }
}

const getDetailedBudget = async (id: string) => {
  const budget = await BudgetModel.findById(id);
  const expenses = await ExpenseModel.find({
    category: { $eq: budget.category },
  });

  const totalSpent = expenses.reduce((total, expense) => {
    return total + expense.amount;
  }, 0);

  return {
    description: budget,
    expenses,
    totalSpent,
  };
};

const getSummarizedBudgets = async (filters: BudgetFilters = {}) => {
  return await BudgetModel.find(filters, { expenses: 0, category: 0 });
};

// const getBudgetsWithExpensesAmounts = async () => {
//     return await BudgetModel.find({}, )
// }
