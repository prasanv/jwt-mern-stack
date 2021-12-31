const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please enter an Email"],
      unique: true,
      lowercase: true,
      validate: {
        validator: isEmail,
        message: (props) => `${props.value} is not a valid Email!`,
      },
    },
    password: {
      type: String,
      required: [true, "Please enter an Password"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    security_question: {
      type: String,
      required: [true, "Please enter an Security Question"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    security_answer: {
      type: String,
      required: [true, "Please enter an Security Answer"],
      minlength: [2, "Password must be at least 2 characters"],
    },
  },
  {
    timestamps: true,
  }
);

// Note: All middleware function should be called before compiling a model
// Fire a pre middleware function before saving the document
// Looks like `next()` is supported on mongoose pre hook
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  // console.log(salt);
  this.password = await bcrypt.hash(this.password, salt);
  this.security_answer = await bcrypt.hash(this.security_answer, salt);
  //console.log("function executed BEFORE saving the document", this);
  next();
});

// Note: All middleware function should be called before compiling a model
// Fire a post middleware function after saving the document
// Looks like `next()` is NOT supported on mongoose post hook
userSchema.post("save", function (doc) {
  //console.log("function executed AFTER saving the document", doc);
});

//Creating static function for this specific model
userSchema.static("login", async function (email, password) {
  // findOne return the document back from the User collection in the mongo DB
  const foundUser = await this.findOne({ email: email });

  if (foundUser) {
    const auth = await bcrypt.compare(password, foundUser.password);
    // console.log({ auth });
    if (auth) {
      return foundUser;
    }
    throw Error("Incorrect Password");
  }
  throw Error("Incorrect Email");
});

// Compiling the model
const User = mongoose.model("user", userSchema);

module.exports = User;
