import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    projectName: { type: String, required: true, index: true },
    requestingCompany: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    assigned: { type: Boolean, required: false, default: false },
    assignees: { type: [String], default: [] },
    releaseDate: { type: Date, required: false, index: true },
    advisor: { type: String, required: false },
    advisorMail: {
      type: String,
      required: false,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email',
      ],
    },
    advisorContactPhone: {
      type: String,
      required: false,
      trim: true,
      match: [/^\d{10}$/, 'Please enter a valid phone number'],
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
    reportCount: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export default mongoose.model('Project', projectSchema);
