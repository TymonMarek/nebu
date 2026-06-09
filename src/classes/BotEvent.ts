import type { ClientEvents } from 'discord.js';
import type BotClient from './BotClient.js';

export interface EventOptions<
  T extends keyof ClientEvents = keyof ClientEvents
> {
  readonly name: T;
  readonly once?: boolean;
  readonly on: (bot: BotClient, ...args: ClientEvents[T]) => Promise<void>;
}

export default class BotEvent<
  T extends keyof ClientEvents = keyof ClientEvents
> {
  public readonly name: T;
  public readonly once: boolean;
  public readonly on: (
    bot: BotClient,
    ...args: ClientEvents[T]
  ) => Promise<void>;

  constructor(options: EventOptions<T>) {
    this.name = options.name;
    this.once = options.once ?? false;
    this.on = options.on;
  }
}
