import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Project' },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  link: { type: String, required: true }
},{ timestamps: true });

export default mongoose.model('Report', reportSchema);
