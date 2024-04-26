import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema({
  name: String,
  good: String,
  bad: String,
});

const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);
export default Review;
