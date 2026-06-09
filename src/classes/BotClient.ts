import { Client, Collection } from 'discord.js';
import BotSecretOptions from '../interfaces/BotSecretOptions.js';
import { Logger } from 'winston';
import DuplicateEventError from '../errors/DuplicateEventError.js';
import { PathLike } from 'node:fs';
import { readdir, stat } from 'node:fs/promises';
import FailedToLoadModuleError from '../errors/FailedToLoadModuleError.js';
import path from 'node:path';
import BotEvent from './BotEvent.js';
import BotEventIncorrectDefaultExportTypeError from '../errors/BotEventIncorrectDefaultExportTypeError.js';
import BotEventMissingDefaultExportError from '../errors/BotEventMissingDefaultExportError.js';
import { pathToFileURL } from 'node:url';
import EventDoesNotExistError from '../errors/EventDoesNotExistError.js';

interface BotClientOptions {
  readonly logger: Logger;
  readonly secrets: BotSecretOptions;
}

export default class BotClient extends Client {
  public readonly logger: Logger;

  public readonly events: Collection<string, BotEvent>;

  public readonly applicationId: string;

  constructor(options: BotClientOptions) {
    super({ intents: [] });

    this.logger = options.logger;

    this.events = new Collection();

    this.token = options.secrets.discord.token;
    this.applicationId = options.secrets.discord.applicationId;
  }

  private unregisterEvent(eventName: string) {
    if (!this.events.has(eventName)) {
      return new EventDoesNotExistError(eventName);
    }
    this.events.delete(eventName);
    this.logger.debug(`Unregistered event ${eventName}`);
  }

  private registerEvent(event: BotEvent) {
    if (this.events.has(event.name)) {
      throw new DuplicateEventError(event.name);
    }
    this.logger.debug(`Registering event ${event.name}`);
    this.events.set(event.name, event);
  }

  private hookEventOnce(event: BotEvent) {
    this.logger.debug(`Hooking event once`, { eventName: event.name });
    this.registerEvent(event);
    this.once(event.name, async (...args) => {
      this.logger.debug(`Executing event once`, { eventName: event.name });
      await event.on(this, ...args);
      this.unregisterEvent(event.name);
    });
  }

  private hookEventOn(event: BotEvent) {
    this.logger.debug(`Hooking event`, { eventName: event.name });
    this.registerEvent(event);
    this.on(event.name, async (...args) => {
      this.logger.debug(`Executing event`, { eventName: event.name });
      await event.on(this, ...args);
    });
  }

  private hookEvent(event: BotEvent) {
    if (event.once) {
      this.hookEventOnce(event);
    } else {
      this.hookEventOn(event);
    }
  }

  async loadEvent(filePath: PathLike): Promise<void> {
    this.logger.debug(`Loading event`, { filePath: filePath.toString() });
    try {
      const module: { default: unknown } = await import(
        pathToFileURL(filePath.toString()).toString()
      );
      const event = module.default;

      if (event === undefined) {
        throw new BotEventMissingDefaultExportError(filePath);
      }

      if (!(event instanceof BotEvent)) {
        throw new BotEventIncorrectDefaultExportTypeError(filePath, event);
      }

      this.hookEvent(event);
    } catch (error) {
      if (!(error instanceof Error)) {
        throw error;
      }
      throw new FailedToLoadModuleError(filePath, error);
    }
  }

  async loadEvents(directory: PathLike): Promise<void> {
    const directoryChildren = await readdir(directory);
    this.logger.debug(`Loading events`, {
      directory: directory.toString(),
      eventCount: directoryChildren.filter((child) => child.endsWith('.js'))
        .length
    });

    directoryChildren.map(async (child) => {
      const childPath = path.join(directory.toString(), child);
      const childStat = await stat(childPath);

      if (childStat.isDirectory()) {
        return this.loadEvents(childPath);
      }

      if (childStat.isFile() && child.endsWith('.js')) {
        return this.loadEvent(childPath);
      }
    });
  }
}
