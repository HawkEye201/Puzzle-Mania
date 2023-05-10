const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../model/Users");
const UsersDetails = require("../model/UsersDetails");
const auth = require("../middleware/auth");

router.put("/update", async (req, res) => {
  // const id = req.params.id;
  const { id, currentStep, wrong, startTime, stepDetail } = req.body;
  // console.log(req.body);
  // console.log(id);
  try {
    let detail = await UsersDetails.findOne({
      id,
    });
    if (!detail)
      return res.status(400).json({
        message: "User Not Exist",
      });

    let previousSteps = detail.previousSteps;
    if (currentStep !== 0) previousSteps.push(stepDetail);
    else previousSteps = [];
    // console.log(previousSteps);

    const update = {
      currentStep: currentStep,
      wrongAttempts: wrong,
      startTime: startTime,
      previousSteps: previousSteps,
    };
    const doc = await UsersDetails.findOneAndUpdate(id, update, {
      new: true,
    });
    // console.log(doc);
    res.status(200).json({
      message: "Updated Successfully",
    });
  } catch (e) {
    // console.error(e);
    res.status(500).json({
      message: "Server Error",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    // console.log(id);
    const doc = await UsersDetails.findOne({ id });

    // console.log(doc);
    res.status(200).json({
      currentStep: doc.currentStep,
      startTime: doc.startTime,
      wa: doc.wrongAttempts,
    });
  } catch (ex) {
    // console.log(ex);

    res.status(500).json({
      status: "Error",
      data: "Server Error",
    });
  }
});

router.get("/all/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const user = await User.findById(id);
    // console.log(user);
    if (user.role === 1)
      res.status(401).json({
        message: "Unauthorized",
      });

    const doc = await UsersDetails.find({});

    res.status(200).json(doc);
  } catch (ex) {
    // console.log(ex);
    return res.status(500).json({
      status: "Error",
      data: "Server Error",
    });
  }
});

module.exports = router;
