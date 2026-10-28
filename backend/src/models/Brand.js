import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    category: { type: String, required: true },
    logo: { type: String, default: "" },
    website: { type: String, default: "" },
    corporateEmail: { type: String, default: "" },
    phone: { type: String, default: "" },
    totalOutlets: { type: Number, default: 0 },
    avgRating: { type: Number, default: 4.0 },
    totalReviews: { type: Number, default: 0 },
    lowRatingOutletsCount: { type: Number, default: 0 },
    under50ReviewsCount: { type: Number, default: 0 },
    statesCovered: [{ type: String }],
    citiesCount: { type: Number, default: 0 },
    status: { type: String, enum: ["Active", "Lead", "Onboarding", "Paused"], default: "Active" },
    pipelineStage: { type: String, default: "RESEARCHED" },
    decisionMakers: [
      {
        name: { type: String, default: "" },
        designation: { type: String, default: "" },
        contact: { type: String, default: "" }
      }
    ],
    recommendedActions: [{ type: String }]
  },
  { timestamps: true }
);

const Brand = mongoose.models.Brand || mongoose.model("Brand", brandSchema);
export default Brand;
