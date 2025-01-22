const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const reportRoutes = require("./routes/reportRoutes");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Serve the React build folder in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

// Use the report routes
app.use("/api/report", reportRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
