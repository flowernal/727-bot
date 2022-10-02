import "dotenv/config";
import { readdirSync } from "fs";
import path from "path";

import Bot from "./bot";
import { Event, Command } from "./interfaces";


if (!process.env.DISCORD_TOKEN || !process.env.MONGO_URI)
    throw new Error("Missing environment variables");


const bot = new Bot();

// Load events
const eventsPath = path.join(__dirname, "events");
const eventFiles = readdirSync(eventsPath).filter(file => file.endsWith(".js") || file.endsWith(".ts"));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath).default as Event;

	if (event.once) {
		bot.once(event.name, (...args) => event.execute(...args));
	} else {
		bot.on(event.name, (...args) => event.execute(...args));
	}
}

// Load commands
const commandsPath = path.join(__dirname, "commands");
const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith(".js") || file.endsWith(".ts"));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath).default as Command;

	bot.commands.set(command.data.name, command);
}

bot.login(process.env.DISCORD_TOKEN);