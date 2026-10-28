import mongoose from "mongoose";

const outletSchema = new mongoose.Schema(
  {
    brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand", required: true },
    listingName: { type: String, required: true },
    area: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    type: { type: String, default: "Official" },
    rating: { type: Number, required: true, default: 4.0 },
    reviews: { type: Number, required: true, default: 0 },
    hasHours: { type: Boolean, default: false },
    hasPhone: { type: Boolean, default: true },
    hasWebsite: { type: Boolean, default: true },
    phone: { type: String, default: "" },
    website: { type: String, default: "" },
    gaps: [{ type: String }],
    status: { type: String, enum: ["Healthy", "Needs Attention", "Critical"], default: "Healthy" },
    unansweredReviews: { type: Number, default: 0 },
    qnaCount: { type: Number, default: 0 },
    postsCount: { type: Number, default: 3 }
  },
  { timestamps: true }
);

const Outlet = mongoose.models.Outlet || mongoose.model("Outlet", outletSchema);
export default Outlet;
