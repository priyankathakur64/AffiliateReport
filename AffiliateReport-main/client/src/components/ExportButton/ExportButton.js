import React, { useState } from "react";
import "./ExportButton.css";
import { exportReport } from "../utils/api";

const ExportButton = ({ filters }) => {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    setLoading(true);
    try {
      const response = await exportReport(filters);
      console.log("Exported successfully", response);
    } catch (error) {
      console.error("Error exporting:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleExport} disabled={loading}>
      {loading ? "Exporting..." : "Export Report"}
    </button>
  );
};

export default ExportButton;
