const fs = require("fs");
const path = require("path");

const participantsFilePath = path.join(__dirname, "../data/participants.json");

const participantController = {
  getAllParticipants(req, res) {
    fs.readFile(participantsFilePath, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading participants file:", err);
        return res
          .status(500)
          .json({ error: "Failed to retrieve participants" });
      }

      try {
        const participants = JSON.parse(data || "[]");
        return res.json(participants);
      } catch (error) {
        console.error("Error parsing participants JSON:", error);
        return res
          .status(500)
          .json({ error: "Failed to parse participants JSON" });
      }
    });
  },

  createParticipant(req, res) {
    fs.readFile(participantsFilePath, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading participants file:", err);
        return res.status(500).json({ error: "Failed to create participant" });
      }

      let participants;
      try {
        participants = JSON.parse(data || "[]");
      } catch (error) {
        console.error("Error parsing participants JSON:", error);
        return res
          .status(500)
          .json({ error: "Failed to parse participants JSON" });
      }

      const newParticipant = {
        id: participants.length + 1,
        name: req.body.name,
      };

      participants.push(newParticipant);

      fs.writeFile(
        participantsFilePath,
        JSON.stringify(participants),
        "utf8",
        (err) => {
          if (err) {
            console.error("Error writing participants file:", err);
            return res
              .status(500)
              .json({ error: "Failed to create participant" });
          }

          return res.status(201).json(newParticipant);
        }
      );
    });
  },
};

module.exports = participantController;
