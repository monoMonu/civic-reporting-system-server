import mongoose, { Schema, Document } from "mongoose";

export interface IIssueHistory extends Document {
  issue: mongoose.Types.ObjectId;
  changedBy: mongoose.Types.ObjectId;
  oldStatus: string;
  newStatus: string;
  changedAt: Date;
}

const issueHistorySchema = new Schema<IIssueHistory>(
  {
    issue: { type: Schema.Types.ObjectId, ref: "Issue", required: true },
    changedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    oldStatus: {
      type: String,
      enum: ["acknowledged", "in_progress", "resolved"],
    },
    newStatus: {
      type: String,
      enum: ["acknowledged", "in_progress", "resolved"],
    },
    changedAt: { type: Date, default: Date.now },
  },
  { timestamps: false }
);

export default mongoose.model<IIssueHistory>(
  "IssueHistory",
  issueHistorySchema
);
