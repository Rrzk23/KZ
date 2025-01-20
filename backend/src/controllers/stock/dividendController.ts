import { RequestHandler } from 'express';
import * as stockHelper from './helper';
import createHttpError from 'http-errors';

interface DividendResponse {
  price: number;
  dividendYield: number;
  dividendPayoutRatio: number;
  freeCashFlowPayoutRatio: number;
  tenYearDividendCAGR: number;
  fiveYearDividendCAGR: number;
  oneYearDividendCAGR: number;
  yearlyDividends: { year: number; dividend: number }[]; 
}

// Function to extract yearly dividends from monthly data
const getYearlyDividends = (timeSeries: Record<string, any>): { year: number; dividend: number }[] => {
  const yearlyDividends: { [year: string]: number } = {};

  // Iterate through the timeSeries and pick the first non-zero dividend for each year
  Object.entries(timeSeries)
    .sort(([dateA], [dateB]) => new Date(dateA).getTime() - new Date(dateB).getTime()) // Sort by date ascending
    .forEach(([date, data]) => {
      const year = new Date(date).getFullYear();
      const dividend = parseFloat(data['7. dividend amount'] || 0);

      // Pick the first non-zero dividend amount for the year
      if (dividend > 0 && !(year in yearlyDividends)) {
        yearlyDividends[year] = dividend;
      }
    });

  // Convert the result to an array of { year, dividend } objects, sorted by year
  return Object.entries(yearlyDividends)
    .map(([year, dividend]) => ({ year: parseInt(year), dividend }))
    .sort((a, b) => a.year - b.year);
};
// Function to calculate CAGR
const calculateCAGR = (startValue: number, endValue: number, years: number): number => {
  if (startValue === 0 || endValue === 0 || years <= 0) {
    return 0;
  }
  return ((endValue / startValue) ** (1 / years)) - 1;
};

export const calculateMetrics: RequestHandler<{ ticker: string }, unknown, DividendResponse, unknown> = async (req, res, next) => {
  try {
    const ticker = req.params.ticker;
    const data = await stockHelper.fetchStockData(ticker);

    const { quote, overview, timeSeries } = data;
    console.log(data.quote, data.overview)
    const currentPrice = parseFloat(quote['05. price']);
    const dividendsTTM = parseFloat(overview['DividendPerShare']) || 0;
    const earningsPerShareTTM = parseFloat(overview['EPS']) || 0;

    
    // Extract yearly dividends from the timeSeries
    const yearlyDividends = getYearlyDividends(timeSeries);
    const freeCashFlowData = await stockHelper.fetchHistoricalCFData(ticker);
    
    // Validate sufficient historical data
    if (yearlyDividends.length < 10) {
      return next(createHttpError(404, 'Insufficient historical dividend data.'));
    }

    // Calculate the metrics
    const response: DividendResponse = {
      price: currentPrice || 0,
      dividendYield: stockHelper.calculateDividendYield(dividendsTTM, currentPrice),
      dividendPayoutRatio: stockHelper.calculatePayoutRatio(dividendsTTM, earningsPerShareTTM),
      freeCashFlowPayoutRatio: stockHelper.calculateFCFPayoutRatio(freeCashFlowData[0].dividendPayout, freeCashFlowData[0].freeCashFlow),
      tenYearDividendCAGR: calculateCAGR(yearlyDividends[0].dividend, yearlyDividends[yearlyDividends.length - 1].dividend, 10),
      fiveYearDividendCAGR: calculateCAGR(yearlyDividends[yearlyDividends.length - 6].dividend, yearlyDividends[yearlyDividends.length - 1].dividend, 5),
      oneYearDividendCAGR: calculateCAGR(yearlyDividends[yearlyDividends.length - 2].dividend, yearlyDividends[yearlyDividends.length - 1].dividend, 1),
      yearlyDividends, 
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
