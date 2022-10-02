import { BotChatInputCommandInteraction, Command } from "../interfaces";
import { SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("Replies with Pong!"),
	execute: async (interaction: BotChatInputCommandInteraction) => await interaction.reply("Pong!")
} as Command;