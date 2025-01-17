import React, { useState } from "react";
import "./DateFilter.css";

const DateFilter = ({ onApply }) => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleApply = () => {
    onApply({ fromDate, toDate });
  };

  return (
    <div className="date-filter">
      <input
        type="text"
        placeholder="From Date (DD/MM/YYYY)"
        value={fromDate}
        onChange={(e) => setFromDate(e.target.value)}
      />
      <input
        type="text"
        placeholder="To Date (DD/MM/YYYY)"
        value={toDate}
        onChange={(e) => setToDate(e.target.value)}
      />
      <button onClick={handleApply}>Apply Filter</button>
    </div>
  );
};

export default DateFilter;
