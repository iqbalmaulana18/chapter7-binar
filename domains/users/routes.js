const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const { User, UserGameHistory, Game } = require("../../database/models");
const { UserBio } = require("../../database/models");
const { loginAPI, registerAPI, createUserDashboard, updateUserDashboard, deleteUserDashboard } = require("./controller");
const passport = require("../../utils/passport");

const userRouter = express.Router();

userRouter.post(
  "/form-dashboard/users/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard/home",
    failureRedirect: "",
  })
);
userRouter.post("/form-dashboard/users/create", createUserDashboard);
userRouter.post("/form-dashboard/users/update", updateUserDashboard);
userRouter.post("/form-dashboard/users/delete", deleteUserDashboard);
userRouter.post("/api/v1/users/login", loginAPI);
userRouter.post("/api/v1/users", registerAPI);

module.exports = userRouter;