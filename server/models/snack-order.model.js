import mongoose from "mongoose";

const SnackOrderSchema = new mongoose.Schema({
  created_at: {
    type: String,
    required: true,
  },
  updated_at: {
    type: String,
    required: true,
  },
  order_url: {
    type: String,
    required: true,
  },
  orderer: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    required: true,
  },
  order_id: {
    type: String,
    required: true,
  },
  snack_name: {
    type: String,
    required: true,
  },
  updated_memo: {
    type: String,
    required: false,
  },
});

export default mongoose.model("SnackOrder", SnackOrderSchema);
