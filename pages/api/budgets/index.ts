import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import BudgetModel from "../../../models/budget";
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
    query: { years, month },
  } = req;

  try {
    const filters: BudgetFilters = {
      ...(years?.length > 0 && { year: { $in: stringListToArray(years) } }),
      ...(month && { month: { $eq: Number(month) } }),
    };

    const result = await getDetailedBudgets(filters);

    res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ success: false });
  }
}

const getDetailedBudgets = async (filters: BudgetFilters = {}) => {
  return await BudgetModel.find(filters).populate(["category", "expenses"]);
};

const getSummarizedBudgets = async (filters: BudgetFilters = {}) => {
  return await BudgetModel.find(filters, { expenses: 0, category: 0 });
};

// const getBudgetsWithExpensesAmounts = async () => {
//     return await BudgetModel.find({}, )
// }
