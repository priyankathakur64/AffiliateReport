const { exec } = require("child_process");

exports.exportReport = (req, res) => {
  const { fromDate, toDate } = req.body;

  const script = `python export_script.py --from ${fromDate} --to ${toDate}`;
  exec(script, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${stderr}`);
      return res.status(500).json({ error: "Failed to export report" });
    }
    res.json({ message: "Report exported successfully", data: stdout });
  });
};
