const mongoose = require("mongoose");

const transectionSchema = new mongoose.Schema(
  {
    userid: {
      type: String,
      require: true,
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
    },
    type: {
      type: String,
      required: [true, "Type is required"],
      enum: ["Income", "Expense"], // Ensuring only "Income" or "Expense" is allowed
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    refrence: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
  },
  { timestamps: true }
);

const transectionModel = mongoose.model("Transection", transectionSchema);

module.exports = transectionModel;
