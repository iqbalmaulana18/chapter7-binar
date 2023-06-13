const express = require("express");
const {
  User,
  UserBio,
  Game,
  UserGameHistory,
} = require("../../database/models");
const {
  homeDashboard,
  createUser,
  loginDashboard,
  updateUser,
  deleteUser,
  userGameHistoryList,
} = require("./controller");

const dashboardRouter = express.Router();

dashboardRouter.get("/", function (req, res) {
  res.redirect("/dashboard/login");
});
dashboardRouter.get("/dashboard/login", loginDashboard);
dashboardRouter.get("/dashboard/home", homeDashboard);
dashboardRouter.get("/dashboard/users/create", createUser);
dashboardRouter.get("/dashboard/users/:id/update", updateUser);
dashboardRouter.get("/dashboard/users/:id/delete", deleteUser);
dashboardRouter.get("/dashboard/users/:id/histories", userGameHistoryList);

module.exports = dashboardRouter;