import * as fs from 'fs';
import {Client, TextChannel, VoiceChannel} from 'discord.js';
import {CryptoMap} from "./CryptoMap";
import {pollTickers} from "./pollTickers";
import {pollStats} from "./pollStats";
import {sourceMaps} from "./sourceMaps";
import Timeout = NodeJS.Timeout;

const client = new Client();

export let moonedChannel: VoiceChannel, updatedChannel: VoiceChannel;

export const maps: CryptoMap[] = [];

let tickerInterval: Timeout,
    statInterval: Timeout;

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    maps.push(...await Promise.all(sourceMaps.map(async source => ({
        ...source,
        stat: <VoiceChannel>await client.channels.fetch(source.stat),
        ticker: <TextChannel>await client.channels.fetch(source.ticker)
    }))));
    moonedChannel = <VoiceChannel>await client.channels.fetch('859171065342328853');
    updatedChannel = <VoiceChannel>await client.channels.fetch('859152308825882664');
    pollTickers();
    pollStats();
    tickerInterval = setInterval(pollTickers, 5 * 1000);
    statInterval = setInterval(pollStats, 10 * 60 * 1000);
});

client.on('interaction', async interaction => {
    if (!interaction.isCommand()) return;
    if (interaction.commandName === 'ping') {
        await interaction.reply('Pong!');
    }
});

client.login(fs.readFileSync(`/discordToken.txt`, 'utf8').trim());
