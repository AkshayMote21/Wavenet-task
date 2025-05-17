import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import User from './user.models.js';

dotenv.config();

const createSuperAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const existing = await User.findOne({ email: "superadmin1akshay@gmail.com" });
    if (!existing) {
      const hashedPassword = await bcrypt.hash("Thecreator-1", 10);
      await User.create({
        username: "SuperAdmin Akshay",
        email: "superadmin1akshay@gmail.com",
        password: hashedPassword,
        role: "SUPER_ADMIN",
        userId: "SA1"
      });
      console.log("SuperAdmin created.");
    } else {
      console.log("SuperAdmin already exists.");
    }
  } catch (error) {
    console.error("Failed to create SuperAdmin:", error.message);
  } finally {
    mongoose.connection.close();
  }
};

createSuperAdmin();
