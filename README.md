# Stock Trading Dashboard

A live stock trading dashboard powered by Polygon.io. Tracks quotes, price charts, options chains, technical indicators, and news.

## Deploy to GitHub Pages (free)

1. Push this folder to a GitHub repo (e.g. `stock-dashboard`)
2. Go to **Settings → Pages**
3. Source: **Deploy from branch** → `main` → `/ (root)`
4. Save — your dashboard will be live at `https://YOUR_USERNAME.github.io/stock-dashboard`

## Configure your proxy URL

Open `index.html` and find this line near the top of the `<script>` block:

```js
const DEFAULT_PROXY = '';
```

Change it to your deployed proxy URL:

```js
const DEFAULT_PROXY = 'https://polygon-proxy-xxxx.onrender.com';
```

Commit and push — the dashboard will auto-connect on load.

## Stack

- **Frontend**: Vanilla HTML/CSS/JS + Chart.js
- **Data**: Polygon.io REST API (15-min delayed on free tier)
- **Proxy**: Node.js + Express (see `polygon-proxy-server` repo)
- **Hosting**: GitHub Pages (dashboard) + Render.com (proxy)

## Features

- Live watchlist with price + % change
- OHLCV price chart with 6 time ranges (1D → 5Y)
- 52-week range bar
- Options chain (calls/puts, strike/IV/delta/OI)
- Technical indicators (RSI, SMA 20/50, volume trend)
- News feed with sentiment
- Market overview (S&P 500, Nasdaq, Dow)
- Add any ticker to your watchlist
