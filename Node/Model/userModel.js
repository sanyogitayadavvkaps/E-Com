const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "QWERTYUIOPASDFGHJKLZXCVBNM";
const bcrypt = require("bcryptjs");
const validator = require("validator");
const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    maxLegnth: [30, "Name Can't exceed 30 characters"],
    minLegnth: [3, "Name shoud have more than 4 characters"],
  },
  lastName: {
    type: String,
  },
  mobile: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    validate: [validator.isEmail, "Please Enter a Valid Email"],
  },
  password: {
    type: String,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.model("userdata", userSchema);

const registerModel = async ({ body }) => {
  const {
    firstName,
    lastName,
    email,
    _id,
    password,
 mobile
  } = body;
  const isExist = await User.findOne({ email: body.email });
  if (isExist) {
    return { error: "Email already exists!!" };
  }
  try {
    const res = await User.create({
        firstName,
        lastName,
        email,
        _id,
        password,
     mobile
    });
    const UserDataClone = { res };
    const token = jwt.sign({ userId: _id }, SECRET_KEY);
    UserDataClone.token = token;
    return { data: UserDataClone, message: "Succes", status: 200 };
  } catch (err) {
    return { message: err, status: 500 };
  }
};

const getUserModel = async () => {
  try {
    const res = await User.find()
    return {
      data: res,
      message: "Succes",
      status: 200,
    };
  } catch (err) {
    return { message: err, status: 500 };
  }
};

const removeModel = async (id) => {
  try {
    const res = await User.findByIdAndRemove(id);
    return { data: res, message: "Success", status: 200 };
  } catch (err) {
    return { message: err, status: 500 };
  }
};
const getUserByIdModel = async (id) => {
  try {
    const res = await User.findById(id);
    return { data: res, message: "Succes", status: 200 };
  } catch (err) {
    return { message: err, status: 500 };
  }
};

const updateUserModel = async (id, body) => {
  try {
    const res = await User.findByIdAndUpdate(id, body, { new: true });
    return { data: res, message: "Success", status: 200 };
  } catch (err) {
    return { message: err, status: 500 };
  }
};

const loginModel = async ({ body }) => {
  const {email, password} = body;
  if (!(email && password)) {
    return { message: "All Fields Required" };
  }

  try {
    const isExist = await User.findOne({
      email: body.email,
    });
    if (!isExist) {
      return { error: "User not found" };
    }
    const match = await bcrypt.compare(password, isExist.password);
    if (!match) {
      return { passwordError: "Incorrect password" };
    }
    if (match) {
      const {
        email,
        _id,
        password,
      } = isExist;
      const UserDataClone = {
        email,
        _id,
        password,
      };
      const token = jwt.sign({ userId: _id }, SECRET_KEY, {
        expiresIn: "1h",
      });
      UserDataClone.token = token;
      return {
        auth: true,
        data: UserDataClone,
        message: "Succes",
        status: 200
      };
    } else {
      return { error: "Credential not matchecd" };
    }
  } catch (err) {
    return { message: err, status: 500 };
  }
};


module.exports = {
  registerModel,
  getUserModel,
  removeModel,
  getUserByIdModel,
  updateUserModel,
  loginModel,
};
