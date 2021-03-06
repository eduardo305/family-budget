import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/dbConnect";
import ExpenseModel from "../../models/expenses";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  await dbConnect();

  try {
    const result = await getAllExpenses();

    res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ success: false });
  }
}

const getAllExpenses = async () => {
  return await ExpenseModel.find({}).populate("category");
};
