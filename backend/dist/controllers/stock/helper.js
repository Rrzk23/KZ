"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchStockData = fetchStockData;
exports.calculateDividendYield = calculateDividendYield;
exports.calculatePayoutRatio = calculatePayoutRatio;
exports.calculateCAGR = calculateCAGR;
exports.calculateFCFPayoutRatio = calculateFCFPayoutRatio;
exports.fetchHistoricalCFData = fetchHistoricalCFData;
const axios_1 = __importDefault(require("axios"));
const env_1 = __importDefault(require("../../utils/env"));
const ALPHA_VANTAGE_API_KEY = env_1.default.ALPHA_VANTAGE_API_KEY;
const BASE_URL = 'https://www.alphavantage.co/query';
function fetchStockData(ticker) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const quoteResponse = yield axios_1.default.get(BASE_URL, {
                params: {
                    function: 'GLOBAL_QUOTE',
                    symbol: ticker,
                    apikey: ALPHA_VANTAGE_API_KEY,
                },
            });
            const overviewResponse = yield axios_1.default.get(BASE_URL, {
                params: {
                    function: 'OVERVIEW',
                    symbol: ticker,
                    apikey: ALPHA_VANTAGE_API_KEY,
                },
            });
            const timeSeriesResponse = yield axios_1.default.get(BASE_URL, {
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
        }
        catch (error) {
            console.error(`Error fetching data for ${ticker}:`, error);
            throw error;
        }
    });
}
function calculateDividendYield(annualDividends, currentPrice) {
    if (!currentPrice) {
        throw new Error('Current price is required to calculate dividend yield');
    }
    return (annualDividends / currentPrice) * 100;
}
function calculatePayoutRatio(dividendsPerShare, earningsPerShare) {
    if (!earningsPerShare) {
        throw new Error('Earnings per share is required');
    }
    return (dividendsPerShare / earningsPerShare) * 100;
}
function calculateCAGR(startValue, endValue, years) {
    return ((endValue / startValue) ** (1 / years) - 1) * 100;
}
function calculateFCFPayoutRatio(dividends, freeCashFlow) {
    if (!freeCashFlow || !dividends) {
        throw new Error('Free Cash Flow and Dividends are required to calculate FCF Payout Ratio');
    }
    return (dividends / freeCashFlow) * 100;
}
function fetchHistoricalCFData(ticker) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get(BASE_URL, {
                params: {
                    function: 'CASH_FLOW',
                    symbol: ticker,
                    apikey: ALPHA_VANTAGE_API_KEY,
                },
            });
            const cashFlowStatements = response.data.annualReports;
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
                };
            });
            return historicalFCF;
        }
        catch (error) {
            console.error(`Error fetching cash flow data for ${ticker}:`, error);
            throw error;
        }
    });
}
