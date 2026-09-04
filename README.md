# Steptember Leaderboard

A small full-stack step leaderboard with a static frontend in `public/` and a serverless backend in `api/`.

## Run locally

```sh
npm run dev
```

Then open <http://localhost:3000>. The frontend fetches its data from `GET /api/leaderboard`.

Run the tests with:

```sh
npm test
```

## Deploy to Vercel

Import this repository in Vercel and deploy it. `vercel.json` explicitly selects the **Other** framework preset, skips a build command, and serves `public/` as the static output. Files in `api/` become serverless functions. No environment variables are required.
