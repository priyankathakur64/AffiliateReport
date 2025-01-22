const express = require("express");
const axios = require("axios"); // If you're fetching live data from an external API
const router = express.Router();

// Available columns and groupBy options (hardcoded)
const availableColumns = [
  "casino_total_bets_sum",
  "casino_total_wins_sum",
  "bonus_issues_sum",
  "casino_bonus_ratio",
  "additional_deductions_sum",
  "casino_taxes_sum",
  "ggr",
  "real_ggr",
  "ngr",
  "real_ngr",
  "admin_fee",
  "deposits_count",
  "average_deposits_count",
  "deposits_sum",
  "average_deposit_amount",
  "cashouts_count",
  "cashouts_sum",
  "first_deposits_count",
  "first_deposits_sum",
  "average_first_deposit_amount",
  "depositing_players_count",
  "wager",
  "casino_bets_count",
  "visits_count",
  "registrations_count",
  "qualified_players_count",
  "prequalified_players_count",
  "duplicated_players_count",
  "self_excluded_players_count",
  "disabled_players_count",
  "chargebacks_count",
  "chargebacks_sum",
  "payment_system_fees_sum",
  "game_provider_fees_sum",
  "jackpot_fees_sum",
  "sb_bets_sum",
  "sb_settled_bets_sum",
  "sb_bonuses_sum",
  "sb_balance_corrections_sum",
  "sb_third_party_fees_sum",
  "sb_total_cancelled_bets_sum",
  "sb_total_wins_sum",
  "sb_real_ggr",
  "sb_ggr",
  "sb_real_ngr",
  "sb_admin_fee",
  "sb_ngr",
  "poker_rounds_count",
  "poker_bets_sum",
  "poker_rake_sum",
  "poker_bonuses_sum",
  "poker_balance_corrections_sum",
  "poker_third_party_fees_sum",
  "poker_real_ngr",
  "poker_admin_fee",
  "poker_ngr",
  "first_deposits_conversion_rate",
  "clean_net_revenue",
  "net_deposits",
  "partner_income",
  "fixed",
  "fixed_per_player",
  "ngr_percent",
  "ngr_percent_per_player",
  "deposits_sum_percent",
  "deposits_sum_percent_per_player",
  "effective_deposits_sum_percent",
  "effective_deposits_sum_percent_per_player",
  "wager_percent",
  "wager_percent_per_player",
  "sb_ngr_percent",
  "sb_ngr_percent_per_player",
  "sb_bets_sum_percent",
  "sb_bets_sum_percent_per_player",
  "poker_ngr_percent",
  "poker_rake_sum_percent",
  "payable_ngr",
];

const availableGroupBy = [
  "brand",
  "campaign",
  "promo",
  "strategy",
  "player",
  "player_country",
  "year",
  "month",
  "week",
  "day",
  "sign_up_at_year",
  "sign_up_at_month",
  "sign_up_at_week",
  "sign_up_at_day",
  "first_deposit_year",
  "first_deposit_month",
  "first_deposit_week",
  "first_deposit_day",
];

// Function to fetch the live report data from the affiliate API (or database)
const getLiveReportData = async (fromDate, toDate) => {
  try {
    const response = await axios.get(
      "https://affiliate.7bitcasino.com/api/v1/reports",
      {
        headers: {
          Authorization: `Bearer ${process.env.e986e52bbae2c89ca55522458e80df3e}`,
        },
        params: { fromDate, toDate },
      }
    );
    if (!response.data || !response.data.length) {
      throw new Error("No data found for the given dates.");
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching live report data:", error);
    throw new Error("Failed to fetch live data.");
  }
};

// POST endpoint to fetch filtered report data
router.post("/export", async (req, res) => {
  const { fromDate, toDate } = req.body;

  // Validate dates
  if (
    !fromDate ||
    !toDate ||
    isNaN(new Date(fromDate).getTime()) ||
    isNaN(new Date(toDate).getTime())
  ) {
    return res
      .status(400)
      .json({ error: "Invalid date format or missing dates." });
  }

  try {
    // Fetch live report data based on the provided dates
    const reportData = await getLiveReportData(fromDate, toDate);

    // Hardcoded columns and groupBy values (user cannot provide these)
    const columnsArray = availableColumns;

    // Apply column filtering
    const filteredData = reportData.map((item) => {
      const filteredItem = {};
      columnsArray.forEach((col) => {
        if (item.hasOwnProperty(col)) {
          filteredItem[col] = item[col];
        }
      });
      return filteredItem;
    });

    // Respond with the report data in JSON format
    res.json({ data: filteredData });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to fetch live data" });
  }
});

module.exports = router;
