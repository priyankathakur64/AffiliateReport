const axios = require("axios"); // Make sure to import axios for making API requests

// Function to fetch live report data from the 7Bit affiliate API
const getLiveReportData = async (fromDate, toDate) => {
  try {
    // Replace with the actual API URL from the 7Bit affiliate program
    const response = await axios.get(
      "https://affiliate.7bitcasino.com/api/v1/reports",
      {
        headers: {
          Authorization: `Bearer ${process.env.e986e52bbae2c89ca55522458e80df3e}`, // Replace with your API key or access token
        },
        params: {
          fromDate,
          toDate,
        },
      }
    );

    // Ensure that you return the data in the correct format
    return response.data; // Assuming the API returns a JSON response
  } catch (error) {
    console.error("Error fetching live report data:", error);
    throw new Error("Failed to fetch live data.");
  }
};

// Handle file export with filter dates (fromDate, toDate)
exports.exportReport = async (req, res) => {
  const { fromDate, toDate, fileType } = req.body;

  if (!fromDate || !toDate || !fileType) {
    return res
      .status(400)
      .json({ error: "fromDate, toDate, and fileType are required." });
  }

  try {
    // Fetch live report data based on the provided dates
    const reportData = await getLiveReportData(fromDate, toDate);

    let fileContent = "";
    let fileExtension = "";

    // Generate the content based on the requested file type
    if (fileType === "json") {
      fileContent = JSON.stringify(reportData);
      fileExtension = "json";
    } else if (fileType === "csv") {
      const { parse } = require("json2csv");
      try {
        fileContent = parse(reportData); // Convert report data to CSV
        fileExtension = "csv";
      } catch (error) {
        return res.status(500).json({ error: "Error generating CSV file." });
      }
    } else if (fileType === "xml") {
      const js2xmlparser = require("js2xmlparser");
      try {
        fileContent = js2xmlparser.parse("report", reportData); // Convert to XML
        fileExtension = "xml";
      } catch (error) {
        return res.status(500).json({ error: "Error generating XML file." });
      }
    } else {
      return res
        .status(400)
        .json({ error: "Invalid file type. Choose json, csv, or xml." });
    }

    // Send the file content as a downloadable response
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=report.${fileExtension}`
    );
    res.setHeader("Content-Type", `application/${fileExtension}`);
    res.send(fileContent);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch live data" });
  }
};
