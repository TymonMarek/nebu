import Bot from './classes/Bot.js';
import { resolveEnvironmentVariable } from './utils/env.js';
import { createLogger, transports } from 'winston';

import path from 'node:path';

const token = resolveEnvironmentVariable('DISCORD_TOKEN');
const applicationId = resolveEnvironmentVariable('DISCORD_APPLICATION_ID');

const logger = createLogger({
  transports: [new transports.Console()],
  level: 'debug'
});

const bot = new Bot({ logger, secrets: { discord: { token, applicationId } } });

await bot.loadEvents(path.join(process.cwd(), 'build', 'events'));

await bot.login();
