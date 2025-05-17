// import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema({
//   userId: { type: String, unique: true },
//   username: String,
//   email: { type: String, unique: true },
//   password: String,
//   role: { type: String, enum: ['SUPER_ADMIN', 'ADMIN', 'UNIT_MANAGER', 'USER'] },
//   createdBy: String,
//   groupId: String,
// });

// const User = mongoose.model('User', userSchema);
// export default User;

// models/user.model.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userId: { type: String, unique: true, required: true },
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['SUPER_ADMIN', 'ADMIN', 'UNIT_MANAGER', 'USER'], required: true },
  createdBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

userSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
