import React, { useState } from "react";
import { fetchReportData } from "../utils/api";
import axios from "axios";
import "./ReportComponent.css";

const ReportComponent = () => {
  const [casino, setCasino] = useState(""); // State for selected casino
  const [reportData, setReportData] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const casinos = [
    "7Bit casino",
    "Bitstarz",
    "mBit casino",
    "CryptoWild",
    "Betchain",
  ];

  // Function to fetch data on form submit
  const handleFetchReportData = async () => {
    if (!casino) {
      setError("Please select a casino.");
      return;
    }

    if (!fromDate || !toDate) {
      setError("Please provide both from and to dates.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await fetchReportData(fromDate, toDate, casino);
      setReportData(data); // Set the filtered report data to state
    } catch (err) {
      setError("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  // Function to convert the report data to CSV format and trigger download
  const downloadCSV = () => {
    const headers = Object.keys(reportData[0]);
    const rows = reportData.map((item) =>
      headers.map((header) => item[header]).join(",")
    );

    // Combine headers and rows
    const csvContent = [headers.join(","), ...rows].join("\n");

    // Create a Blob from CSV content
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");

    // Create a download link
    if (navigator.msSaveBlob) {
      // For IE
      navigator.msSaveBlob(blob, "report.csv");
    } else {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "report.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="box-container">
      <h1>Report Data</h1>

      <div className="form-group">
        {/* Casino Selection */}
        <div className="form-row">
          <label>
            Top 5 Bitcoin Casinos:{" "}
            <select value={casino} onChange={(e) => setCasino(e.target.value)}>
              <option value="">-- Select a Casino --</option>
              {casinos.map((casinoName) => (
                <option key={casinoName} value={casinoName}>
                  {casinoName}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* Date Range */}
        <div className="form-row">
          <label>
            From Date:
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </label>
          <label>
            To Date:
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </label>
        </div>

        {/* Fetch Button */}
        <div className="form-row">
          <button onClick={handleFetchReportData}>Fetch Report</button>
        </div>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {reportData.length > 0 && (
        <div>
          <table>
            <thead>
              <tr>
                {Object.keys(reportData[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {reportData.map((item, index) => (
                <tr key={index}>
                  {Object.values(item).map((value, idx) => (
                    <td key={idx}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={downloadCSV}>Download CSV</button>
        </div>
      )}
    </div>
  );
};

export default ReportComponent;
