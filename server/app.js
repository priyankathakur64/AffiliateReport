const express = require("express");
const app = express();

// Import the route file
const reportRoutes = require("./routes/report");

// Middleware for parsing JSON request bodies
app.use(express.json());

// Use the report routes
app.use("/api/customer/v1/partner", reportRoutes);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
