const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

// user model
const userSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
  },
  password: {
    type: String,
  },
  username: {
    type: String,
    default: "新用戶",
  },
  gender: {
    type: String,
    enum: ["男", "女", "其他"],
  },
  age: { type: Number, min: 0, max: 120 },
  googleID: { type: String },
  description: { type: String },
  createdDate: { type: Date, default: Date.now },
  email_verified: { type: Boolean, default: false },
  mySite: { type: [Schema.Types.ObjectId], default: [], ref: "Site" }, // Site 的 primary key
  myFollowSite: { type: [Schema.Types.ObjectId], default: [], ref: "Site" },
});

// 儲存前，密碼雜湊處理的中繼站

userSchema.pre("save", async function (next) {
  // 給 google 授權登入繞過用的
  if (!this.password && this.googleID) {
    next();
  }

  // 如果改的不是密碼
  if (this.password.length > 20) {
    // 代表是一個hash值
    next();
  }

  const hashPassword = await bcrypt.hash(this.password, 10);
  this.password = hashPassword;
  next();
});

module.exports = mongoose.model("User", userSchema);
