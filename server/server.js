const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

// Enable CORS
app.use(cors());

// Parse incoming requests
app.use(bodyParser.json());

// Import routes (if you are separating routes into a different file)
const reportRoutes = require("./routes/reportRoutes");
app.use("/api/report", reportRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
