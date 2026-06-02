const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;
const POLYGON_API_KEY = process.env.POLYGON_API_KEY;
const POLYGON_BASE = "https://api.polygon.io";

// Allow requests from your frontend (update this in production)
app.use(cors({ origin: "*" }));
app.use(express.json());

if (!POLYGON_API_KEY) {
  console.warn("⚠️  POLYGON_API_KEY env var not set. Requests will fail.");
}

// Health check
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Polygon proxy is running" });
});

// Generic proxy route: forwards any /api/polygon/* path to Polygon.io
// Example: GET /api/polygon/v2/aggs/ticker/AAPL/range/1/day/2024-01-01/2025-01-01
app.get("/api/polygon/*", async (req, res) => {
  // Build the Polygon URL from the path after /api/polygon
  const polygonPath = req.params[0];
  const queryString = new URLSearchParams(req.query).toString();

  const url = `${POLYGON_BASE}/${polygonPath}${queryString ? "?" + queryString : ""}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${POLYGON_API_KEY}`,
      },
    });

    if (!response.ok) {
      const errText = await response.text();
      return res.status(response.status).json({
        error: "Polygon API error",
        status: response.status,
        detail: errText,
      });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Proxy error:", err.message);
    res.status(500).json({ error: "Proxy request failed", detail: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Polygon proxy running on http://localhost:${PORT}`);
});
