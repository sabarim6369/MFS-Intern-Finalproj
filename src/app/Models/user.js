import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['teacher', 'student'],
    required: true,
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.models.User || mongoose.model('User', userSchema);
