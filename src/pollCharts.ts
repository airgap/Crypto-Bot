

import {getAllTickers, getKline} from "./getTickers";
import {monify} from "./monify";
import {getNow} from "./getNow";
import {maps, moonedChannel, updatedChannel} from "./index";
import {getMinute, getSecond} from "./QTime";

const asciichart = require('asciichart');

export const pollCharts = async () => {
    // const allTickers = await getAllTickers();
    // const now = +new Date(), minute = getMinute();
    // await r.table('Tickers').insert(allTickers.map(ticker => ({...ticker, stamp: now, r_stamp: r.now(), minute, id: getIdFor( ticker.symbol)})));
    // console.log('len', allTickers.length);
    for(let map of maps.slice(1)) {
        const kline = await getKline(map.symbol, getSecond() - (60 * 30), getSecond(), 1);
        const data = kline.map(kline => [kline.timestamp, kline.open, kline.close, kline.high, kline.low]);
        //const dat = kline.map((kline, k) => `${k+1}\t${kline.open}\t${kline.close}\t${kline.high}\t${kline.low}`).join('\n');
        const prices = kline.map((kline, k) => parseFloat(kline.last_price));
        let min = Number.MAX_VALUE, max = Number.MIN_VALUE;
        for(const n of prices) {
            if(n < min)
                min = n;
            else if(n > max)
                max = n;
        }
        const range = max - min;

        console.log(prices);
        console.log(asciichart.plot(prices, {height: 10}));

        // const bash = `set yrange [min:max]`
        // console.log(gnuplot()
        //     .set('term dumb')
        //     .set(`yrange [${min}:${max}]`)
        //     .plot(prices)
        //     .end());
        //fs.writeFileSync('../html/test.html', kline.map((kline, k) => kline.last_price).join('\n'));
        // const image = await GoogleChartsNode.render(()=>drawChart(data));
        // fs.writeFileSync('../html/test.png', image);
        // const chan = <TextChannel>await client.channels.fetch('861424329345728512')
        // await chan.send(new MessageEmbed({
        //     url: 'http://bot.coooo.in'
        // }));
        return;
    }
};


const getIdFor = (token: string, minute: number = getMinute()) =>
    token + '-' + minute;