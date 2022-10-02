import { BotChatInputCommandInteraction, Command } from "../interfaces";
import { ColorResolvable, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { getAverageColor } from "fast-average-color-node";

export default {
    data: new SlashCommandBuilder()
		.setName("roll")
		.setDescription("Rolls an osu! player!"),
	execute: async (interaction: BotChatInputCommandInteraction) => {
		const player = interaction.client.players[Math.floor(Math.random() * interaction.client.players.length)];

		const embed = new EmbedBuilder()
			.setTitle(player.username)
			.setDescription(`Rank: ${player.rank}`)
			.setImage(`https://a.ppy.sh/${player.id}`)
			.setColor((await getAverageColor(`https://a.ppy.sh/${player.id}`)).hex as ColorResolvable)
			.setTimestamp();
		interaction.reply({ embeds: [embed] });
	}
} as Command;