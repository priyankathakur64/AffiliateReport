import axios from "axios";

// Function to fetch the report data
const fetchReportData = async (fromDate, toDate) => {
  try {
    const response = await axios.post("/api/customer/v1/partner/report", {
      fromDate,
      toDate,
    });
    if (response.data && response.data.data) {
      return response.data.data; // Return the filtered data
    } else {
      throw new Error("No data returned from server.");
    }
  } catch (error) {
    console.error("Error fetching report data:", error);
    throw error;
  }
};

export { fetchReportData };
