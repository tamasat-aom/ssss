import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema({
  name: String,
  Good: String,
  Bad: String,
});

const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);
export default Review;
