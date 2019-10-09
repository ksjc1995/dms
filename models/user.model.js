const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const schema = new Schema({
  userEmail: { type: String, unique: true, required: true },
  hash: { type: String, required: true },
  docs: { type: Array, default: [] },
  roleId: { type: Number, default: 1 },
  createdDate: { type: Date, default: Date.now },
  activeToken: { type: String }
});

schema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("User", schema);
