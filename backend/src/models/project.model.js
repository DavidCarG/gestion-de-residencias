import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  requestingCompany: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  assigned: { type: Boolean, required: true },
  assignees: { type: [String], default: [] },
  semester: {
    type: String,
    required: true,
    enum: ["Spring", "Fall"],
  },
  releaseDate: { type: Date, required: true, index: true },
  advisor: { type: String, required: true },
  advisorMail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email",
    ],
  },
  advisorContactPhone: {
    type: String,
    required: true,
    trim: true,
    match: [
      /^\d{10}$/,
      "Please enter a valid phone number",
    ],
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    required: true,
    trim: true,
  },
  career: { type: String, required: true },
  summary: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Project", projectSchema);