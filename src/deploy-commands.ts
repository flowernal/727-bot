import "dotenv/config";
import { REST, RESTPostAPIApplicationCommandsJSONBody, Routes } from "discord.js";
import { readdirSync } from "fs";
import path from "path";

import { Command } from "./interfaces";


if (!process.env.DISCORD_TOKEN || !process.env.CLIENT_ID || !process.env.GUILD_ID)
    throw new Error("Missing environment variables");

    
const commands: RESTPostAPIApplicationCommandsJSONBody[] = [];

// Load commands
const commandsPath = path.join(__dirname, "commands");
const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith(".js") || file.endsWith(".ts"));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath).default as Command;

	commands.push(command.data.toJSON());
}

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: commands })
	.then((data: any) => console.log(`Successfully registered ${data.length} application commands.`))
	.catch(console.error);