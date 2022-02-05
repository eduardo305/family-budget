import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema({
  name: String,
  date: Date,
  amount: Number,
});

const ExpenseModel =
  mongoose.models.Expense || mongoose.model("Expense", ExpenseSchema);

export default ExpenseModel;
