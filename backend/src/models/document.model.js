const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const collaboratorSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  permission: {
    type: String,
    enum: ["editor", "owner"],
    default: "owner",
  },
});

const documentSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    default: "",
  },
  collaborators: [collaboratorSchema],
  public_access: {
    type: String,
    enum: ["View Only", "Anyone with the link can edit", "Private"],
    default: "Private",
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
});

documentSchema.pre("save", function (next) {
  this.updated = new Date();
  next();
});

const Document = mongoose.model("Document", documentSchema);

module.exports = Document;
