const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const mongoose = require("mongoose")
const PhotoSchema = new mongoose.Schema({
  name: String,
  url: String,
  key: String,
  size: Number,
  productId: String,
  userId: String,
}, {
  timestamps: true
});
PhotoSchema.pre("save", function() {
  if (!this.url) {
    this.url = `${process.env.APP_URL}/files/${this.key}`;
  }
});
PhotoSchema.pre("findOneAndDelete", async function(next) {
  const doc = await this.model.findOne(this.getQuery())  
  return promisify(fs.unlink)(
    path.resolve(__dirname, "..", "tmp", "uploads", doc.key)
  );
})
const PhotoModel = mongoose.model("photo", PhotoSchema);
module.exports = PhotoModel;