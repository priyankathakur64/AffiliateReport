import axios from "axios";

const fetchReportData = async (fromDate, toDate, columns, groupBy) => {
  try {
    const response = await axios.post(
      "/api/customer/v1/partner/report", // Correct API endpoint URL
      {
        from: fromDate,
        to: toDate,
        columns: columns,
        group_by: groupBy,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export { fetchReportData };
