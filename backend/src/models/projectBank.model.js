import mongoose from 'mongoose';

const projectBankSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: true,
      trim: true,
    },
    requestingCompany: {
      type: String,
      required: true,
      trim: true,
    },
    year: {
      type: Number,
      required: true,
      min: 2000,
      max: 2100,
    },
    semester: {
      type: String,
      required: true,
      enum: ['Spring', 'Fall'],
    },
    managerName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email',
      ],
    },
    contactPhone: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    shortDescription: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    descriptionPDF: {
      type: String, // Store URL/path instead of Buffer
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('ProjectBank', projectBankSchema);
