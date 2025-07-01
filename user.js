const mongoose = require("mongoose");
const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
});
const userSchema = new mongoose.Schema({
  name: String,
  age: {
    type: Number,
    min: 1,
    max: 100,
    required: true,
    validate: (v) => v % 2 === 0,
    message: (props) => `${props.value} is not an even number!`,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
  bestFriend: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  hobbies: [String],
  address: addressSchema, //schema neasted in another schema
});

userSchema.methods.sayHello = function () {
  // arrow fun does not bind this so dont use it
  console.log(`Hello, my name is ${this.name}`);
};
userSchema.statics.findByName = function (name) {
  return this.where({ name: new RegExp(name, "i") });
};
userSchema.query.byName = function (name) {
  return this.where({ name: new RegExp(name, "i") });
};
userSchema.virtual("namedEmail").get(function () {
  return `${this.name} <${this.email}>`;
});
//middleware
userSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});
module.exports = mongoose.model("User", userSchema);
