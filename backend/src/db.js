import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost/residenciadb');
    console.log('DB Connected');
  } catch (error) {
    console.error(error);
  }
};
