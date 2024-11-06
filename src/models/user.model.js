import { Schema, model } from "mongoose";
import { createHash } from "../utils/hash.js";

const userSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  carts: { type: [
    {
      cart : { type: Schema.Types.ObjectId, ref: "Cart" },
    }
  ] },
  role: {
    type: String,
    required: true,
    enum: ["admin", "user"],
    default: "user",
  },
});

// Moongose
userSchema.pre("save", function (next) {
  if(this.email.includes("@") && this.email.includes(".")){
    next();
  }
  
  next(new Error("Email inválido"));
});

export const userModel = model("users", userSchema)