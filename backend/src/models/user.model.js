const { Schema, model } = require("mongoose");
const { encrypt } = require("../services/hash");

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
});

userSchema.pre("save", async function (next) {
  if (this.isNew) {
    this.password = await encrypt(this.password);
  }
  next();
});

const User = model("User", userSchema);

module.exports = User;
