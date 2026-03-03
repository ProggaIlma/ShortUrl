# ShortUrl

ShortUrl is an Express + MongoDB URL shortener that supports user signup/login, authenticated link creation, redirect handling, and visit analytics for each short URL.

## What it does
- Allows users to sign up and log in.
- Creates short IDs for long URLs.
- Redirects short links to the original URL.
- Tracks visit history and exposes analytics per short URL.
- Shows generated links and click counts on an EJS-rendered home page.

## Tech stack
- Express.js for routing and HTTP handling
- MongoDB + Mongoose for persistence
- EJS for server-side views
- Cookie-based in-memory session mapping for login state

## Main routes
- `GET /signup` and `GET /login` for auth pages
- `POST /user` for signup
- `POST /user/login` for login
- `POST /url` for short URL generation (authenticated)
- `GET /url/:shortId` for redirecting
- `GET /url/analytics/:shortId` for click analytics

## Run locally
1. Start MongoDB on `mongodb://127.0.0.1:27017/short-url`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the app:
   ```bash
   npm start
   ```
4. Open `http://localhost:8001`
