"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.calculateMetrics = void 0;
const stockHelper = __importStar(require("./helper"));
const http_errors_1 = __importDefault(require("http-errors"));
// Function to extract yearly dividends from monthly data
const getYearlyDividends = (timeSeries) => {
    const yearlyDividends = {};
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
const calculateCAGR = (startValue, endValue, years) => {
    if (startValue === 0 || endValue === 0 || years <= 0) {
        return 0;
    }
    return ((endValue / startValue) ** (1 / years)) - 1;
};
const calculateMetrics = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ticker = req.params.ticker;
        const data = yield stockHelper.fetchStockData(ticker);
        const { quote, overview, timeSeries } = data;
        console.log(data.quote, data.overview);
        const currentPrice = parseFloat(quote['05. price']);
        const dividendsTTM = parseFloat(overview['DividendPerShare']) || 0;
        const earningsPerShareTTM = parseFloat(overview['EPS']) || 0;
        // Extract yearly dividends from the timeSeries
        const yearlyDividends = getYearlyDividends(timeSeries);
        const freeCashFlowData = yield stockHelper.fetchHistoricalCFData(ticker);
        // Validate sufficient historical data
        if (yearlyDividends.length < 10) {
            return next((0, http_errors_1.default)(404, 'Insufficient historical dividend data.'));
        }
        // Calculate the metrics
        const response = {
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
    }
    catch (error) {
        next(error);
    }
});
exports.calculateMetrics = calculateMetrics;
