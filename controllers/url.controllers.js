const { nanoid } = require("nanoid"); // Works only with nanoid v3
const URL = require("../models/url.models");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;

  if (!body.url) {
    return res.status(400).json({ error: "url is required" });
  }

  const shortID = nanoid(8);
  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
    createdBy: req.user._id,
  });

  return res.render("home",{
    id: shortID,
    adminView: false, // Ensure adminView is always defined
    req // Pass req to EJS
  });
  
}

async function handleGetAnalytics(req, res) {
    try {
      const shortId = req.params.shortId;
      const result = await URL.findOne({ shortId });
  
      if (!result) {
        return res.status(404).json({ error: "Short URL not found" });
      }
  
      return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
      });
    } catch (error) {
      console.error("Error fetching analytics:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
};
