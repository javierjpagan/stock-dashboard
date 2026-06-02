# Polygon Proxy Server

A minimal Express server that proxies requests to Polygon.io, keeping your API key secure on the server side.

## Local setup

```bash
npm install
cp .env.example .env
# Edit .env and add your POLYGON_API_KEY
npm run dev
```

The server runs at `http://localhost:3001`.

## How it works

Your dashboard calls:
```
GET http://localhost:3001/api/polygon/v2/aggs/ticker/AAPL/range/1/day/2024-01-01/2025-01-01
```

The proxy forwards it to:
```
GET https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2024-01-01/2025-01-01
     Authorization: Bearer YOUR_KEY
```

Your API key never touches the browser.

## Deploy to Render.com (free tier)

1. Push this folder to a GitHub repo
2. Go to [render.com](https://render.com) → New → Web Service
3. Connect your GitHub repo
4. Set these:
   - **Build command:** `npm install`
   - **Start command:** `node server.js`
   - **Environment:** Node
5. Add environment variable:
   - `POLYGON_API_KEY` = your key from polygon.io
6. Click **Deploy**

Render gives you a URL like `https://your-app.onrender.com`.
Update `PROXY_BASE` in your dashboard to point there.

## API endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | Health check |
| GET | `/api/polygon/*` | Proxies any Polygon.io path |

Any query parameters are forwarded as-is.

## Example calls

```bash
# Latest quote
curl http://localhost:3001/api/polygon/v2/last/trade/AAPL

# Daily aggregates (OHLCV)
curl "http://localhost:3001/api/polygon/v2/aggs/ticker/AAPL/range/1/day/2025-01-01/2025-12-31"

# Ticker details
curl http://localhost:3001/api/polygon/v3/reference/tickers/AAPL

# Previous close
curl http://localhost:3001/api/polygon/v2/aggs/ticker/AAPL/prev
```
