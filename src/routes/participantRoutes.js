const express = require("express");
const router = express.Router();
const participantController = require("../controllers/participantController");

router.get("/", participantController.getAllParticipants);
router.post("/", participantController.createParticipant);

module.exports = router;
