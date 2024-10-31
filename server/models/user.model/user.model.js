import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  pin: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'admin' 
  }
});

const User = mongoose.model('User', UserSchema);

export default User;
