import User from "../models/user.model.js";
import createError from "../utils/createError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const edit = async (req, res, next) => {
  try {
    //const userId = req.id
    const user = await User.findOne({ username: req.body.originalUsername });

    if (!user) {
      return next(createError(404, "User not found!"));
    }

    // Update user fields if provided in the request body
    if (req.body.username) {
      user.username = req.body.username;
    }
    if (req.body.email) {
      user.email = req.body.email;
    }
    if (req.body.password) {
      const hash = bcrypt.hashSync(req.body.password, 5);
      user.password = hash;
    }
    if (req.body.img) {
      user.img = req.body.img;
    }
    if (req.body.country) {
      user.country = req.body.country;
    }
    if (req.body.city) {
      user.city = req.body.city;
    }
    if (req.body.isSeller) {
      user.isSeller = req.body.isSeller;
    }
    if (req.body.desc) {
      user.desc = req.body.desc;
    }
    if (req.body.totalStars){
      user.totalStars += req.body.totalStars
    }
    if (req.body.starNumber){
      user.starNumber += req.body.starNumber
    }
    // Save the updated user
    await user.save();

    res.status(200).send("User has been updated.");
  } catch (err) {
    next(err);
  }
};

export const register = async (req, res, next) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 5);
    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(201).send("User has been created.");
  } catch (err) {
    next(err);
  }
};
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) return next(createError(404, "User not found!"));

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign(
      {
        id: user._id,
        isSeller: user.isSeller,
      },
      process.env.JWT_KEY
    );

    const { password, ...info } = user._doc;
    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .send(info);
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logged out.");
};
