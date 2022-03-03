import mongoose, { Schema } from "mongoose";

const expenseSchema = new mongoose.Schema({
  name: String,
  date: Date,
  amount: Number,
  category: { type: Schema.Types.ObjectId, ref: "category" },
});

const ExpenseModel =
  mongoose.models.expense || mongoose.model("expense", expenseSchema);

export default ExpenseModel;
