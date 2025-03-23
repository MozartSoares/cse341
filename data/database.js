import { config } from 'dotenv';
config();
import mongoose from 'mongoose';

const initDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.error('Error connnecting to:', error);
    process.exit(1);
  }
};

export default initDb;
