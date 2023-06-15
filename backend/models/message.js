import mongoose from "mongoose";

const MessageSchema = mongoose.Schema({
  text: {
    type: String,
    required: true,
    minLength: 5,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Message", MessageSchema);
