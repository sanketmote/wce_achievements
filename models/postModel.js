const mongoose = require("mongoose");
const { Schema } = mongoose;


const postSchema = new Schema(
  {
    content: String,
    name: String,
    at: String,
    date: {
      type: Array,
      required: true,
    },
    verified:{
      type: Boolean,
      required: true,
      default: false
    },
    images: {
      type: Array,
      required: true,
    },
    likes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "user",
      },
    ],
    comments: [
      {
        type: mongoose.Types.ObjectId,
        ref: "comment",
      },
    ],
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    reports: [
      {
        type: mongoose.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model('post', postSchema);