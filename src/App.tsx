import { useState, useEffect } from 'react';
// import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './App.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface StockData {
  symbol: string;
  price: number;
  change: number;
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  }[];
}

function App() {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [timePeriod, setTimePeriod] = useState('daily');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // const API_KEY = '5FT7E3P0LNASQBTZ'; // Replace with your key

  // const topStocks = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA'];

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    setLoading(true);
    setError(null);
    // Sample data for demonstration (replace with real API when CSP allows)
    const sampleStocks: StockData[] = [
      { symbol: 'AAPL', price: 150.25, change: 2.5 },
      { symbol: 'GOOGL', price: 2800.75, change: -1.2 },
      { symbol: 'MSFT', price: 305.60, change: 1.8 },
      { symbol: 'AMZN', price: 3300.45, change: 0.9 },
      { symbol: 'TSLA', price: 250.10, change: -3.4 },
    ];
    setStocks(sampleStocks);
    setLoading(false);
    // Uncomment below to use real API (blocked by GitHub Pages CSP)
    /*
    const stockData: StockData[] = [];
    for (const symbol of topStocks) {
      try {
        const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`);
        const data = response.data['Time Series (Daily)'];
        if (data) {
          const latestDate = Object.keys(data)[0];
          const latest = data[latestDate];
          const previousDate = Object.keys(data)[1];
          const previous = data[previousDate];
          const price = parseFloat(latest['4. close']);
          const prevPrice = parseFloat(previous['4. close']);
          const change = ((price - prevPrice) / prevPrice) * 100;
          stockData.push({ symbol, price, change });
        } else {
          setError(`No data for ${symbol}. Check API key or symbol.`);
        }
      } catch (error: any) {
        console.error(`Error fetching ${symbol}:`, error);
        setError(`Failed to fetch data for ${symbol}: ${error.message}`);
      }
    }
    setStocks(stockData);
    setLoading(false);
    */
  };

  const fetchChartData = async (symbol: string) => {
    // Sample chart data
    const samplePrices = [150, 152, 148, 155, 160, 158, 162, 165, 163, 168, 170, 172, 175, 173, 178, 180, 182, 185, 183, 188, 190, 192, 195, 193, 198, 200, 202, 205, 203, 208];
    const dates = Array.from({ length: 30 }, (_, i) => `2024-04-${(i + 1).toString().padStart(2, '0')}`);
    setChartData({
      labels: dates,
      datasets: [{
        label: `${symbol} Price (Sample)`,
        data: samplePrices,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      }],
    });
    // Uncomment below for real API (blocked by CSP)
    /*
    try {
      const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`);
      const data = response.data['Time Series (Daily)'];
      if (data) {
        const dates = Object.keys(data).slice(0, 30).reverse();
        const prices = dates.map(date => parseFloat(data[date]['4. close']));
        setChartData({
          labels: dates,
          datasets: [{
            label: `${symbol} Price`,
            data: prices,
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
          }],
        });
      } else {
        setError(`No chart data for ${symbol}.`);
      }
    } catch (error: any) {
      console.error(`Error fetching chart for ${symbol}:`, error);
      setError(`Failed to fetch chart for ${symbol}: ${error.message}`);
    }
    */
  };

  return (
    <div className="app">
      <header>
        <h1>Stock Funds Dashboard (Sample Data)</h1>
        <p>Note: Using sample data due to GitHub Pages CSP restrictions. Real API blocked.</p>
        <div className="filters">
          <select value={timePeriod} onChange={(e) => setTimePeriod(e.target.value)}>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          <button onClick={fetchStocks} disabled={loading}>
            {loading ? 'Loading...' : 'Refresh'}
          </button>
        </div>
      </header>
      <main>
        <section className="stocks">
          <h2>Top Profitable Companies</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div className="stock-list">
            {stocks.map(stock => (
              <div key={stock.symbol} className="stock-item" onClick={() => fetchChartData(stock.symbol)}>
                <h3>{stock.symbol}</h3>
                <p>${stock.price.toFixed(2)}</p>
                <p className={stock.change > 0 ? 'positive' : 'negative'}>
                  {stock.change > 0 ? '+' : ''}{stock.change.toFixed(2)}%
                </p>
              </div>
            ))}
          </div>
        </section>
        <section className="chart">
          <h2>Price Trend</h2>
          {chartData ? <Line data={chartData} /> : <p>Select a stock to view chart</p>}
        </section>
        <section className="funds">
          <h2>Investment Funds</h2>
          <p>Funds data placeholder - Integrate with fund APIs for real data</p>
          <table>
            <thead>
              <tr>
                <th>Fund</th>
                <th>Performance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Vanguard 500 Index Fund</td>
                <td>+5.2%</td>
              </tr>
              <tr>
                <td>Fidelity Magellan</td>
                <td>+3.8%</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

export default App;
