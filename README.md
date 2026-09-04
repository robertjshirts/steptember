# Steptember Leaderboard

A small full-stack step leaderboard with a static frontend and a serverless backend.

## Run locally

```sh
npm start
```

Then open <http://localhost:3000>. The frontend fetches its data from `GET /api/leaderboard`.

Run the tests with:

```sh
npm test
```

## Deploy to Vercel

Import this repository in Vercel and deploy it with the default settings. Files in `api/` become serverless functions; the remaining files are served as the frontend. No environment variables or build command are required.
