const fs = require("fs");
const path = require("path");

const getDataFromFile = (filePath) => {
  try {
    const rawData = fs.readFileSync(filePath);
    return JSON.parse(rawData);
  } catch (error) {
    console.error(`Error reading data from file ${filePath}:`, error);
    return { vacationPlans: [], participants: [] };
  }
};

const saveDataToFile = (data, filePath) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(`Error saving data to file ${filePath}:`, error);
  }
};

module.exports = {
  getDataFromFile,
  saveDataToFile,
};
