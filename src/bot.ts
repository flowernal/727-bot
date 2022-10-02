import { Client, GatewayIntentBits, Collection } from "discord.js";
import { readFileSync } from "fs";
import { Command, Player } from "./interfaces";

export default class Bot extends Client {
    commands: Collection<string, Command> = new Collection();
    players: Player[] = JSON.parse(readFileSync("rankings.json", "utf-8"));

    constructor() {
        super({
            intents: [GatewayIntentBits.Guilds],
        });
    }
}