import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      validate: {
        validator: async function (userId) {
          const user = await mongoose.model('User').findById(userId);
          return user && user.role === 'docente';
        },
        message: 'The author must be a teacher',
      },
    },
    project: {
      type: String,
      required: true,
      trim: true,
    },
    link: {
      type: String,
      required: true,
      trim: true,
    },
    creationDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Report', reportSchema);
