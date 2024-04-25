import mongoose, { Schema } from "mongoose";

const quaterSchema = new Schema({
  quater: Number,
  content: [{ headers: String, desc: String, date: String }],
});

const Quater = mongoose.models.Quater || mongoose.model("Quater", quaterSchema);
export default Quater;
