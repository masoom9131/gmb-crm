import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  businessName: { type: String, required: true },
  gmbLink: { type: String },
  category: { type: String },
  city: { type: String },
  status: { type: String, default: "Active" },
  notes: { type: String }
}, { timestamps: true });

const Client = mongoose.model("Client", clientSchema);
export default Client;