import { ChatInputCommandInteraction, CommandInteraction, Interaction, SlashCommandBuilder } from "discord.js";
import Bot from "./bot";

export interface Event {
    name: string;
    once?: boolean;
    execute(...args: any[]): any;
}

export interface Command {
    data: SlashCommandBuilder;
    execute(interaction: BotChatInputCommandInteraction): Promise<any>;
}

export interface BotInteraction extends Omit<Interaction, "client"> {
    client: Bot;
}

export interface BotChatInputCommandInteraction extends Omit<ChatInputCommandInteraction, "client"> {
    client: Bot;
}


export interface Player {
    id: number;
    username: string;
    rank: number;
}