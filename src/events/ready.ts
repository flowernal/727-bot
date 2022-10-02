import "colors";

import { Event } from "../interfaces";
import Bot from "../bot";

export default {
    name: "ready",
    once: true,
    execute: (bot: Bot) => console.log(`Logged in as ${bot.user!.tag}!`.white.bgGreen)
} as Event;