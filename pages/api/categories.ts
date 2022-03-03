import { NextApiRequest, NextApiResponse } from "next";
import CategoryModel from "../../models/categories";
import dbConnect from "../../lib/dbConnect";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  await dbConnect();

  try {
    const result = await CategoryModel.find({});

    res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ success: false });
  }
}
