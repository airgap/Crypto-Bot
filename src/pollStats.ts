import {getTickers} from "./getTickers";
import {monify} from "./monify";
import {getNow} from "./getNow";
import {CryptoMap} from "./CryptoMap";
import {nothing} from "./nothing";
import {maps, moonedChannel, updatedChannel} from "./index";

export const pollStats = async () => {
    try {
        console.log('Updating');
        const filtered = await getTickers();
        console.log(filtered);
        for (const map of maps) {
            console.log('Updating', map.symbol);
            const ticker = filtered.find(ticker => ticker.symbol === map.symbol);
            await map.stat.setName(`${map.short ?? map.symbol.split('_')[0]}: ${monify(ticker.last_price)}`);
            console.log('Updated', map.symbol);
            await nothing(3);
        }
        console.log('Checking moon');
        const sfmPrice = parseFloat(filtered.find(ticker => ticker.symbol === 'SAFEMOON_USDT').last_price);
        console.log('last sfm', sfmPrice);
        await moonedChannel.setName(sfmPrice >= .0001 ? (sfmPrice >= .01 ? 'WE MOONED!' : "WE'RE MOONING!") : 'Not mooning yet...');
        console.log('Updating time');
        await nothing(3);
        await updatedChannel.setName('Updated ' + getNow());

        console.log('Updated', getNow());
        //console.log(filtered);
    } catch (e) {
        console.log(e);
    }
};