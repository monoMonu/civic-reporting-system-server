import mongoose, { Schema, Document } from "mongoose";

export interface IIssue extends Document {
  user: mongoose.Types.ObjectId;
  description: string;
  imageUrl?: string[];
  latitude: number;
  longitude: number;
  category: "pothole" | "garbage" | "other";
  severity: "high" | "low";
  status: "acknowledged" | "in_progress" | "resolved";
  createdAt: Date;
  updatedAt: Date;
}

const issueSchema = new Schema<IIssue>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    description: { type: String, required: true },
    imageUrl: [{ type: String }],
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    category: {
      type: String,
      enum: ["pothole", "garbage", "other"],
      default: "other",
    },
    severity: {
      type: String,
      enum: ["high", "low"],
      default: "low",
    },
    status: {
      type: String,
      enum: ["acknowledged", "in_progress", "resolved"],
      default: "acknowledged",
    },
  },
  { timestamps: true }
);

export default mongoose.model<IIssue>("Issue", issueSchema);
