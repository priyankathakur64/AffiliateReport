import React, { useState } from "react";
import axios from "axios";
import "./Dashboard.css"; // Import the CSS file for styling

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
      setReportData(response.data || []); // Ensure it's an empty array if no data
    } catch (error) {
      console.error("Error fetching report:", error);
    }
  };

  const handleDownload = () => {
    if (!reportData || reportData.length === 0) {
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

  const renderTable = (data) => {
    if (!data || data.length === 0) {
      return <p>No data available to display.</p>;
    }

    // Get the headers dynamically from the first row
    const headers = Object.keys(data[0]);

    return (
      <table className="report-table">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {headers.map((header) => (
                <td key={header}>{row[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="filters">
        <label>
          From Date:
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="date-input"
          />
        </label>
        <label>
          To Date:
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="date-input"
          />
        </label>
        <button onClick={handleFilter} className="apply-filter-btn">
          Apply Filter
        </button>
      </div>

      {/* Show the report preview */}
      {reportData && renderTable(reportData)}

      {/* Show the Download button after fetching the data */}
      {reportData && reportData.length > 0 && (
        <button onClick={handleDownload} className="download-btn">
          Download Report
        </button>
      )}
    </div>
  );
}

export default Dashboard;
