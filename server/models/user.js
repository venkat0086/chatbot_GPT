const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

// const userSchema = new mongoose.Schema({
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   email: { type: String, required: true },
//   password: { type: String, required: true },
//   mobile: { type: String, required: true },
//   description: { type: String, required: true },
// });

// userSchema.methods.generateAuthToken = function () {
//   const token = jwt.sign(
//     { _id: this._id, name: this.firstName, email: this.email },
//     process.env.JWTPRIVATEKEY,
//     {
//       expiresIn: "7d",
//     }
//   );
//   return token;
// };

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  picture: { type: String },
  password: { type: String },
  mobile: { type: String },
  description: { type: String },
  googleId: { type: String },
  passwordRequired: { type: Boolean, default: true },
});

userSchema.pre("save", function (next) {
  if (this.googleId) {
    this.passwordRequired = false;
  }
  next();
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, name: this.firstName, email: this.email },
    process.env.JWTPRIVATEKEY,
    {
      expiresIn: "7d",
    }
  );
  return token;
};

const validate = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    email: Joi.string().email().required().label("Email"),
    picture: Joi.string().label("Picture"),
    password: passwordComplexity().label("Password"),
    mobile: Joi.string().label("Mobile"),
    description: Joi.string().label("Description"),
    googleId: Joi.string().label("GoogleId"),
    passwordRequired: Joi.boolean().label("PasswordRequired"),
  });
  return schema.validate(data);
};

const User = mongoose.model("user", userSchema);

module.exports = { User, validate };
