# Daily Savings Tracker

A simple, modern, mobile-first web application that automatically tracks a daily savings goal. It accumulates ₹20 every calendar day seamlessly in the background and allows users to deduct custom amounts or reset their progress. 

Designed strictly using HTML5, CSS3, and Vanilla JavaScript with browser LocalStorage. 

## Features
- **Automatic Daily Accumulation**: Automatically adds ₹20 for every calendar day elapsed. Accurately tracks days even if the site isn't opened for weeks.
- **Custom Deductions**: Deduct money instantly. Allows negative balances if deductions exceed current savings.
- **Total Local Privacy**: Uses your browser's `LocalStorage`. Zero backend, no databases, and no login required. Data survives refreshes, browser closures, and device reboots.
- **Resilience**: Safely handles leap years, month boundaries, and daylight-saving shifts using strict local-calendar normalizations.

## How It Works (Data Storage)
Your data is securely stored entirely in your browser using the web `LocalStorage` API. 
The application saves only two data points locally:
1. `daily_savings_balance`: Your current financial total.
2. `daily_savings_date`: The last processed local calendar date (format `YYYY-MM-DD`). 

Every time you open the website, it compares today's local date to the saved date, calculates missing elapsed days, adds ₹20 for each missed day, and overwrites the save file.

## GitHub Pages Deployment Instructions
This project is built to run as a static website and is completely compatible with GitHub Pages without any build process.

1. **Create a GitHub Repository**: Log in to [GitHub](https://github.com/) and create a new repository (e.g., `daily-savings-tracker`).
2. **Upload Files**: Upload the four files from this project directly to the `main` branch of your new repository:
   - `index.html`
   - `style.css`
   - `script.js`
   - `README.md`
3. **Enable GitHub Pages**:
   - Go to your repository **Settings**.
   - Navigate to the **Pages** section on the left sidebar.
   - Under **Build and deployment**, set the **Source** to `Deploy from a branch`.
   - Under **Branch**, select `main` (or `master`) and leave the folder as `/ (root)`.
   - Click **Save**.
4. **Access the Website**: Wait about 1-2 minutes for GitHub to deploy. You will see a live link at the top of the Pages settings (e.g., `https://yourusername.github.io/daily-savings-tracker/`).

## Local Development
To test locally, simply open the `index.html` file in any modern web browser. No local server, npm installation, or configuration is required.
