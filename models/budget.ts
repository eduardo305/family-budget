import mongoose, { Schema } from "mongoose";
import ExpenseModel from "./expenses";
import CategoryModel from "./categories";
console.log("🚀 ~ file: budget.ts ~ line 3 ~ ExpenseModel", ExpenseModel);
console.log("🚀 ~ file: budget.ts ~ line 5 ~ CategoryModel", CategoryModel);

const budgetSchema = new mongoose.Schema({
  createDate: String,
  name: String,
  month: Number,
  year: Number,
  amount: Number,
  category: { type: Schema.Types.ObjectId, ref: "category" },
  expenses: [{ type: Schema.Types.ObjectId, ref: "expense" }],
});

const BudgetModel =
  mongoose.models.budget || mongoose.model("budget", budgetSchema);

export default BudgetModel;
