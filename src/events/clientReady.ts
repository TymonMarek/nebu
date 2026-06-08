import { Events } from 'discord.js';
import BotEvent from '../classes/BotEvent.js';

export default new BotEvent({
  name: Events.ClientReady,
  once: true,
  on: async (bot, client) => {
    bot.logger.info(`Connected to Discord`, { tag: client.user.tag });
  }
});
