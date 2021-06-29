import {TextChannel, VoiceChannel} from "discord.js";

export interface CryptoMap {
    symbol: string,
    name: string,
    short?: string,
    stat: VoiceChannel,
    ticker: TextChannel
}