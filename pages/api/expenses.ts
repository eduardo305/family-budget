// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/dbConnect";
import ExpenseModel from "../../models/Expense";
import { Expense } from "../../types";

interface Expenses {
  success: boolean;
  expenses?: Expense[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Expenses>
) {
  try {
    await dbConnect();

    /* find all the data in our database */
    const result = await ExpenseModel.find({});
    const expenses = result.map((doc: any) => {
      const expense = doc.toObject();
      return {
        ...expense,
        _id: expense._id.toString(),
      };
    });

    res.status(200).json({ success: true, expenses });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}
