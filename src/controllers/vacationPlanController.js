const fs = require("fs");
const multer = require("multer");
const path = require("path");

const dataFilePath = path.join(__dirname, "../data", "vacationPlans.json");

const upload = multer({ dest: "uploads/" });

const vacationPlanController = {
  getAllVacationPlans(req, res) {
    try {
      const rawData = fs.readFileSync(dataFilePath);
      const data = JSON.parse(rawData);
      res.json(data.vacationPlans);
    } catch (error) {
      console.error("Error reading data file:", error);
      res.status(500).json({ error: "Failed to retrieve vacation plans" });
    }
  },

  createVacationPlan(req, res) {
    try {
      const rawData = fs.readFileSync(dataFilePath);
      const data = JSON.parse(rawData);

      if (req.file) {
        const imagePath = req.file.path;
        req.body.imagePath = imagePath;
      }

      const newPlan = {
        id: data.vacationPlans.length + 1,
        ...req.body,
      };
      data.vacationPlans.push(newPlan);
      fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
      res.status(201).json(newPlan);
    } catch (error) {
      console.error("Error saving data file:", error);
      res.status(500).json({ error: "Failed to create vacation plan" });
    }
  },

  editVacationPlan(req, res) {
    try {
      const rawData = fs.readFileSync(dataFilePath);
      const data = JSON.parse(rawData);
      const planId = req.params.id;
      const updatedPlan = req.body;
      const index = data.vacationPlans.findIndex(
        (plan) => plan.id === parseInt(planId)
      );
      if (index !== -1) {
        data.vacationPlans[index] = {
          ...data.vacationPlans[index],
          ...updatedPlan,
        };
        fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
        res.json(data.vacationPlans[index]);
      } else {
        res.status(404).json({ error: "Vacation plan not found" });
      }
    } catch (error) {
      console.error("Error saving data file:", error);
      res.status(500).json({ error: "Failed to update vacation plan" });
    }
  },

  deleteVacationPlan(req, res) {
    try {
      const rawData = fs.readFileSync(dataFilePath);
      const data = JSON.parse(rawData);
      const planId = req.params.id;
      const index = data.vacationPlans.findIndex(
        (plan) => plan.id === parseInt(planId)
      );
      if (index !== -1) {
        data.vacationPlans.splice(index, 1);
        fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
        res.status(204).end();
      } else {
        res.status(404).json({ error: "Vacation plan not found" });
      }
    } catch (error) {
      console.error("Error saving data file:", error);
      res.status(500).json({ error: "Failed to delete vacation plan" });
    }
  },
  editCover(req, res) {
    try {
      const rawData = fs.readFileSync(dataFilePath);
      const data = JSON.parse(rawData);
      const planId = req.params.id;
      const coverImage = req.file;

      console.log(req.params.id);
      console.log(req.file);

      const index = data.vacationPlans.findIndex(
        (plan) => plan.id === parseInt(planId)
      );
      if (index !== -1) {
        data.vacationPlans[index].coverImage = coverImage.path;

        fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));

        res.json(data.vacationPlans[index]);
      } else {
        res.status(404).json({ error: "Vacation plan not found" });
      }
    } catch (error) {
      console.error("Error saving data file:", error);
      res.status(500).json({ error: "Failed to update vacation plan cover" });
    }
  },
  getPlanById(req, res) {
    try {
      const planId = req.params.id;
      const rawData = fs.readFileSync(dataFilePath);
      const data = JSON.parse(rawData);

      const plan = data.vacationPlans.find(
        (plan) => plan.id === parseInt(planId)
      );

      if (plan) {
        res.json(plan);
      } else {
        res.status(404).json({ error: "Vacation plan not found" });
      }
    } catch (error) {
      console.error("Error reading data file:", error);
      res.status(500).json({ error: "Failed to retrieve vacation plan" });
    }
  },
};

module.exports = vacationPlanController;
