const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PetSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  species: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  sex: {
    type: String,
    required: true
  },
  weight: {
    type: mongoose.Decimal128,
    required: true
  },
  adoptable: {
    type: Boolean,
    default: true
  },
  price: {
    type: mongoose.Decimal128,
    default: 0.00
  },
  image: [{
    type: String,
    required: true
  }],
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: "comments"
  }]
});

const Pet = mongoose.model("pets", PetSchema);

module.exports = Pet;