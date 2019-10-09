const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  id: { type: String, required: true },
  path:{ type: String, required: true},
  metaData: {
    name: {
      type: String,
      required: true,
      default: Date.now.toString() + "_NewFile"
    },
    lastModified: { type: Date },
    lastModifiedDate: { type: String },
    type: { type: String },
    size: { type: Number }
  },
  addedDate: { type: Date, default: Date.now }
});

schema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Document", schema);
