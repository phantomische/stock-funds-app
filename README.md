# Stock Funds Dashboard

A free web app dashboard for near real-time stock exchange data, showing top profitable companies, investment funds, and pension funds like 401k. Displays daily, weekly, monthly, semi-annual, and annual data updates.

## Features

- Near real-time stock prices for top companies (AAPL, GOOGL, MSFT, AMZN, TSLA)
- Interactive charts for price trends
- Investment funds table (placeholder for real data)
- Time period filters (daily, weekly, monthly)
- Free hosting on GitHub Pages

## Setup

1. Get a free API key from [Alpha Vantage](https://www.alphavantage.co/support/#api-key)
2. Replace `YOUR_API_KEY_HERE` in `src/App.tsx` with your key
3. Install dependencies: `npm install`
4. Run dev server: `npm run dev`
5. Build for production: `npm run build`
6. Deploy to GitHub Pages: Push to GitHub and enable Pages

## Technologies

- React + TypeScript
- Vite
- Chart.js for visualizations
- Axios for API calls
- Hosted on GitHub Pages
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
