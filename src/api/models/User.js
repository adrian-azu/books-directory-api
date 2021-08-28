const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    default: null
  },
  last_name: {
    type: String,
    default: null
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    min: 8
  },
  token: {
    type: String
  },
  is_active: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

UserSchema.methods.generateVerificationToken= function(time) {
  const user = this;
  const verificationToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: time }
  );
  return verificationToken;
};
UserSchema.pre('save', async function(next){
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

UserSchema.post('save', async function(doc, next){
  delete doc._doc.password 
  next()
})

UserSchema.statics.login = async function(data){
  const isAuthenticated = await bcrypt.compare(data.inputPassword, data.password)
  if(isAuthenticated){
      delete data.inputPassword
      delete data.password
      return data;
  } 
  throw Error("Invalid credentials")

}
const User = mongoose.model("User", UserSchema)
module.exports = User