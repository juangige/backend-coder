import { Schema, model } from "mongoose";

const ticketSchema = new Schema({
    code: { type: String, required: true },
    purchase_date: { type: Date, required: true, default: Date.now },
    amount: { type: Number, required: true },
    purchaser: { type: Schema.Types.ObjectId, ref: "users", required: true },
});

ticketSchema.pre("save", async function (next) {
    this.populate("purchaser");
    next();
  });

export const ticketModel = model("tickets", ticketSchema)