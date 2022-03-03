import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: String,
});

const CategoryModel =
  mongoose.models.category || mongoose.model("category", categorySchema);

export default CategoryModel;
