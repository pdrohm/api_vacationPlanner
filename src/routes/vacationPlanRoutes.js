const express = require("express");
const router = express.Router();
const vacationPlanController = require("../controllers/vacationPlanController");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/", vacationPlanController.getAllVacationPlans);
router.post("/", vacationPlanController.createVacationPlan);
router.put("/:id", vacationPlanController.editVacationPlan);
router.delete("/:id", vacationPlanController.deleteVacationPlan);
router.get("/:id", vacationPlanController.getPlanById);

router.put(
  "/:id/upload-cover",
  upload.single("coverImage"),
  vacationPlanController.editCover
);

module.exports = router;
