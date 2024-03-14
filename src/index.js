const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const vacationPlanRoutes = require("./routes/vacationPlanRoutes");
const participantRoutes = "./routes/participantRoutes";

app.use(cors());
app.use(bodyParser.json());

app.use("/api/vacation-plans", vacationPlanRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
