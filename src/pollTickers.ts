import {CryptoMap} from "./CryptoMap";
import {getTickers} from "./getTickers";
import {formatTicker} from "./formatTicker";
import {maps} from "./index";

export const pollTickers = async () => {
    const tickers = await getTickers();
    for (const map of maps) {
        const message = (await map.ticker.messages.fetch({limit: 1})).first();
        const ticker = tickers.find(ticker => ticker.symbol === map.symbol);
        const formatted = formatTicker(ticker);
        // const entries = Object.entries(ticker);
        // const maxLen = entries.map(row => row[0].length).reduce((l, r) => l > r ? l : r);
        // const html = `\`\`\`${entries.map(([k,v]) => `${k}.${pad(maxLen - k.length, '.')}${v}`).join('\n')}\`\`\``;
        if (message?.editable)
            await message.edit(formatted);
        else
            await map.ticker.send(formatted);
    }
}