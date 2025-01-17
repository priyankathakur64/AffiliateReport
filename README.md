Affiliate Dashboard Project

This project is a dashboard for managing affiliate data, where you can filter reports by date and download them in JSON format. The frontend is built with React, and the backend is powered by Node.js with a Python script to generate reports.

Table of Contents
• Installation
• Frontend Setup
• Backend Setup
• Usage
• Contributing
• License

Installation
Prerequisites
Before you start, make sure you have the following installed:

• Node.js (version 14 or higher)
• Python (version 3 or higher)
• npm (comes with Node.js)
• MongoDB (if using MongoDB)

Steps to install
1. Clone the repository:
bash
git clone <repository-url>
cd <project-folder>

2. Install backend dependencies:

Navigate to the server folder and run:

bash
cd server
npm install
This will install all necessary backend dependencies including express, axios, and any other dependencies for the server.

3. Install frontend dependencies:
Navigate to the client folder and run:

bash
cd client
npm install
This will install all necessary frontend dependencies including react, axios, and other required packages.

Backend Setup
1. Ensure that the export_script.py file is in the server folder. This script will generate the reports based on the date range provided.

2. Make sure your backend is correctly configured with a MongoDB instance, if required. You can configure it by editing the .env file.

3. Run the backend server:
bash
npm start
The server will start on http://localhost:5000.

Frontend Setup
1. Once the backend is running, start the frontend:

bash
cd client
npm start
The frontend will be served on http://localhost:3000.

Usage
Dashboard
1. Open the dashboard at http://localhost:3000.
2. The dashboard will allow you to:
   • Apply date filters to filter reports by the "From Date" and "To Date".
   • Click "Apply Filter" to fetch the data from the backend.

Download Reports
1. Once the data is filtered, the backend generates a report using the Python script (export_script.py).
2. The report is generated in JSON format and can be downloaded.
Endpoints
  • POST /api/report/export: This endpoint accepts fromDate and toDate parameters, triggers the Python script to generate the report, and returns the JSON data.

Request Body:

json
{
    "fromDate": "YYYY-MM-DD",
    "toDate": "YYYY-MM-DD"
}
Response: The response contains the generated report in JSON format.

Contributing
If you'd like to contribute to this project, feel free to fork the repository, create a branch, and submit a pull request. Please ensure your changes are well-tested and follow the existing code style.
