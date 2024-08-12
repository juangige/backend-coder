import { Schema, model } from "mongoose";
import { createHash } from "../utils/hash.js";

const userSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  cart: { type: Schema.Types.ObjectId, ref: "carts" },
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

// Hashea la contraseña del usuario en el registro (Se hashea dos veces)
// userSchema.pre("save", async function (next) {
//   const newPassword = await createHash(this.password);
//   this.password = newPassword;
//   next();
// })

export const userModel = model("users", userSchema)