import axios from 'axios';
import env from '../../utils/env';


const ALPHA_VANTAGE_API_KEY: string = env.ALPHA_VANTAGE_API_KEY;
const BASE_URL: string = 'https://www.alphavantage.co/query';

interface StockData {
  quote: Record<string, string>;
  overview: Record<string, string>;
  timeSeries: Record<string, Record<string, string>>;
}

export async function fetchStockData(ticker: string): Promise<StockData> {
  try {
    const quoteResponse = await axios.get(BASE_URL, {
      params: {
        function: 'GLOBAL_QUOTE',
        symbol: ticker,
        apikey: ALPHA_VANTAGE_API_KEY,
      },
    });

    const overviewResponse = await axios.get(BASE_URL, {
      params: {
        function: 'OVERVIEW',
        symbol: ticker,
        apikey: ALPHA_VANTAGE_API_KEY,
      },
    });

    const timeSeriesResponse = await axios.get(BASE_URL, {
      params: {
        function: 'TIME_SERIES_MONTHLY_ADJUSTED',
        symbol: ticker,
        apikey: ALPHA_VANTAGE_API_KEY,
      },
    });

    const quote = quoteResponse.data["Global Quote"];
    const overview = overviewResponse.data;
    const timeSeries = timeSeriesResponse.data["Monthly Adjusted Time Series"];

    if (!quote || !overview || !timeSeries) {
      throw new Error('Incomplete data fetched from Alpha Vantage.');
    }

    return { quote, overview, timeSeries };
  } catch (error) {
    console.error(`Error fetching data for ${ticker}:`, error);
    throw error;
  }
}

export function calculateDividendYield(annualDividends: number, currentPrice: number): number {
  if (!currentPrice) {
    throw new Error('Current price is required to calculate dividend yield');
  }
  return (annualDividends / currentPrice) * 100;
}

export function calculatePayoutRatio(dividendsPerShare: number, earningsPerShare: number): number {
  if (!earningsPerShare) {
    throw new Error('Earnings per share is required');
  }
  return (dividendsPerShare / earningsPerShare) * 100;
}

export function calculateCAGR(startValue: number, endValue: number, years: number): number {
  return ((endValue / startValue) ** (1 / years) - 1) * 100;
}
export function calculateFCFPayoutRatio(dividends: number, freeCashFlow: number): number {
  if (!freeCashFlow || !dividends) {
    throw new Error('Free Cash Flow and Dividends are required to calculate FCF Payout Ratio');
  }
  return (dividends / freeCashFlow) * 100;
}
interface CashFlowStatement {
  fiscalDateEnding: string;
  operatingCashflow: string;
  capitalExpenditures: string;
  dividendPayout: string;
}

export interface CashFlowStatementResponse {
  fiscalDateEnding: string;
  freeCashFlow: number;
  dividendPayout: number;
}

export async function fetchHistoricalCFData(ticker: string): Promise<CashFlowStatementResponse[]> {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        function: 'CASH_FLOW',
        symbol: ticker,
        apikey: ALPHA_VANTAGE_API_KEY,
      },
    });

    const cashFlowStatements: CashFlowStatement[] = response.data.annualReports;

    if (!cashFlowStatements || cashFlowStatements.length === 0) {
      throw new Error('No cash flow statements found.');
    }

    // Map and calculate free cash flow
    const historicalFCF = cashFlowStatements.map((statement) => {
      const operatingCashflow = parseFloat(statement.operatingCashflow || '0');
      const capitalExpenditures = parseFloat(statement.capitalExpenditures || '0');
      const dividendPayout = parseFloat(statement.dividendPayout || '0');
      return {
        fiscalDateEnding: statement.fiscalDateEnding,
        freeCashFlow: operatingCashflow - Math.abs(capitalExpenditures),
        dividendPayout
      }
    });

    return historicalFCF;
  } catch (error) {
    console.error(`Error fetching cash flow data for ${ticker}:`, error);
    throw error;
  }
}