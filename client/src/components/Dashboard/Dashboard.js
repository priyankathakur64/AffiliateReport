import React, { useState } from "react";
import axios from "axios";

function Dashboard() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reportData, setReportData] = useState(null); // State to store the fetched report data

  const handleFilter = async () => {
    try {
      // Make a POST request to fetch the filtered report data
      const response = await axios.post("/api/report/export", {
        fromDate,
        toDate,
      });
      console.log("Report Data:", response.data);
      setReportData(response.data); // Store the fetched report data
    } catch (error) {
      console.error("Error fetching report:", error);
    }
  };

  const handleDownload = () => {
    if (!reportData) {
      console.log("No report data available");
      return;
    }

    // Create a Blob from the JSON data
    const blob = new Blob([JSON.stringify(reportData)], {
      type: "application/json",
    });

    // Create a temporary link element to trigger the download
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "report.json");
    document.body.appendChild(link);
    link.click(); // Trigger the download
    document.body.removeChild(link); // Clean up the link element
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Dashboard</h1>
      <div style={{ marginBottom: "20px" }}>
        <label>
          From Date:
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            style={{ marginLeft: "10px" }}
          />
        </label>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <label>
          To Date:
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            style={{ marginLeft: "10px" }}
          />
        </label>
      </div>
      <button onClick={handleFilter} style={{ padding: "10px 20px" }}>
        Apply Filter
      </button>

      {/* Show the Download button after fetching the data */}
      {reportData && (
        <button
          onClick={handleDownload}
          style={{ padding: "10px 20px", marginTop: "20px" }}
        >
          Download Report
        </button>
      )}
    </div>
  );
}

export default Dashboard;
