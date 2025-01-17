import json
import sys

def generate_report(from_date, to_date):
    # Simulate report generation logic
    data = {
        "from_date": from_date,
        "to_date": to_date,
        "report_data": [
            {"visit": 100, "registration": 50},
            {"visit": 150, "registration": 70}
        ]
    }
    return data

if __name__ == "__main__":
    # Read command line arguments for from and to dates
    from_date = sys.argv[1]
    to_date = sys.argv[2]
    
    report = generate_report(from_date, to_date)
    
    # Save the generated report to a file
    with open("report.json", "w") as outfile:
        json.dump(report, outfile, indent=4)
