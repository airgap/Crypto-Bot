import {getNow} from "./getNow";
import {monify} from "./monify";

export const formatTicker = (ticker: any) => {
    const formatted = `
\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_

**Symbol:  ${ticker.symbol}**

**Now:**
\`\`\`\
Last Price:         ${monify(ticker.last_price)}
Best Ask:           ${monify(ticker.best_ask)}
Best Ask Size:      ${ticker.best_ask_size}
Best Bid:           ${monify(ticker.best_bid)}
Best Bid Size:      ${ticker.best_bid_size}
Fluctuation:        ${ticker.fluctuation}
\`\`\`
**24 Hour:**
\`\`\`
Quote Volume:   ${ticker.quote_volume_24h}
Base Volume:    ${ticker.base_volume_24h}
High:           ${monify(ticker.high_24h)}
Low:            ${monify(ticker.low_24h)}
Open:           ${monify(ticker.open_24h)}
Close:          ${monify(ticker.close_24h)}\
\`\`\`
\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_

**Updated**: \`${getNow('UTC', 0)}\`   \`${getNow()}\`   \`${getNow('PST', -6)}\`
**Source**: ${ticker.url}`;
    return formatted;
};
