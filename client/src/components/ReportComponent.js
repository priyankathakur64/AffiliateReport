import React, { useState } from "react";
import { fetchReportData } from "../utils/api";
import "./ReportComponent.css"; // Import external CSS file

const ReportComponent = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [columns, setColumns] = useState("");
  const [groupBy, setGroupBy] = useState("");
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const groupByArray = groupBy.split(",").map((item) => item.trim()); // Split groupBy into an array
      const columnsArray = columns.split(",").map((item) => item.trim()); // Split columns into an array
      const data = await fetchReportData(
        fromDate,
        toDate,
        columnsArray,
        groupByArray
      );
      setReportData(data);
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="report-container">
      <h1 className="title">Generate Your Custom Report</h1>

      {/* Form for user input */}
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>From Date:</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label>To Date:</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label>Columns (comma separated):</label>
          <input
            type="text"
            value={columns}
            onChange={(e) => setColumns(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label>Group By (comma separated):</label>
          <input
            type="text"
            value={groupBy}
            onChange={(e) => setGroupBy(e.target.value)}
            className="input-field"
          />
        </div>
        <button type="submit" disabled={loading} className="submit-button">
          {loading ? "Generating..." : "Generate Report"}
        </button>
      </form>

      {/* Display loading, error, or data */}
      {loading && (
        <p className="loading-text">Please wait, generating report...</p>
      )}
      {error && <p className="error-text">{error}</p>}

      {reportData && Array.isArray(reportData.data) && (
        <div>
          <h2>Report Data</h2>
          <table class="report-table">
            <thead>
              <tr>
                {columns.split(",").map((column, index) => (
                  <th key={index}>{column.trim()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {reportData.data.map((item, index) => (
                <tr key={index}>
                  {columns.split(",").map((column, colIndex) => (
                    <td key={colIndex}>{item[column.trim()]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReportComponent;
