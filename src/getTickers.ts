import * as fetch from 'node-fetch';

export const getTickers = async () => {
    const res = await (await fetch('https://api-cloud.bitmart.com/spot/v1/ticker')).json();
    const {tickers} = res.data;
    const filtered = tickers.filter(ticker => ['ETH_USDT', 'BTC_USDT', 'SAFEMOON_USDT'].find(sym => ticker.symbol === sym));
    return filtered;
}
