import * as fetch from 'node-fetch';
import {maps} from "./index";
import {getSecond} from "./QTime";

export const getTickers = async () => {
    const tickers = await getAllTickers();
    const filtered = tickers.filter(ticker => maps.find(map => ticker.symbol === map.symbol));
    return filtered;
}
export const getAllTickers = async () => {
    const res = await (await fetch('https://api-cloud.bitmart.com/spot/v1/ticker')).json();
    const {tickers} = res.data;
    return tickers;
}
export const getKline = async (token: string, from: number, to: number = getSecond(), step = 1) => {
    const res = await (await fetch(`https://api-cloud.bitmart.com/spot/v1/symbols/kline?symbol=${token}&from=${from}&to=${to}&step=${step}`)).json();
    const {klines} = res.data;
    return klines;
}

