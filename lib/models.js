import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    formType: {
      type: String,
      enum: ["mission", "ticket", "donation", "bulk_booking"],
      required: true,
    },
    name: { type: String, trim: true },
    churchName: { type: String, trim: true },
    churchAddress: { type: String, trim: true },
    email: { type: String, trim: true },
    phone: { type: String, trim: true },
    bookingDate: { type: String, trim: true },
    preferredCinema: { type: String, trim: true },
    localChurchNameAndAddress: { type: String, trim: true },
    pastorName: { type: String, trim: true },
    calling: { type: String, trim: true },
    mode: { type: String, trim: true },
    quantity: { type: Number, default: 1 },
    amount: { type: Number, default: 0 },
    reference: { type: String, trim: true },
    source: { type: String, trim: true },
    status: { type: String, trim: true },
    metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

export const Submission = mongoose.models.Submission || mongoose.model("Submission", submissionSchema);
