const mongoose = require("mongoose");

const step = new mongoose.Schema({
  step: {
    type: Number,
    required: true,
  },
  timeTaken: {
    type: Number,
    required: true,
  },
  wrongAttempts: {
    type: Number,
    required: true,
  },
});

const UsersDetailsSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  currentStep: {
    type: Number,
    default: 0,
  },
  wrongAttempts: {
    type: Number,
    default: 0,
  },
  startTime: {
    type: Number,
    default: 0,
  },
  previousSteps: {
    type: [step],
    default: [],
  },
});

// export model user with UsersDetailsSchema
module.exports = mongoose.model("usersDetails", UsersDetailsSchema);
