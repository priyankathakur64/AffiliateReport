const express = require("express");
const bodyParser = require("body-parser");
const reportRoutes = require("./routes/report");

const app = express();
app.use(bodyParser.json());
app.use("/api/report", reportRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
