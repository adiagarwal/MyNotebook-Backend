let { mongodb } = require("../../db");

let notesSchema = new mongodb.Schema({
  user: {
    type: mongodb.Schema.Types.ObjectId,
    ref: "users",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    default: "General",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const note = mongodb.model("note", notesSchema);
module.exports = note;
