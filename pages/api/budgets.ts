// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Budget = {
  name: string;
  label: string;
};

interface Budgets {
  budgets: Budget[];
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Budgets>
) {
  res
    .status(200)
    .json({ budgets: [{ name: "groceries", label: "Groceries" }] });
}
