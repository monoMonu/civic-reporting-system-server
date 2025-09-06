import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name?: string;
  email: string;
  password: string;
  role: "citizen" | "admin";
  emailVerified: boolean
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["citizen", "admin"],
      default: "citizen",
    },
    emailVerified: false
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", userSchema);
