# Steptember Leaderboard

A small full-stack step leaderboard with a static frontend in `public/` and a serverless backend in `api/`.

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

Import this repository in Vercel with the **Other** framework preset and deploy it. Files in `api/` become serverless functions, while files in `public/` are served as static assets. No environment variables or build command are required.
