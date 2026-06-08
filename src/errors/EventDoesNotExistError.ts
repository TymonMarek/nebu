import { BotError } from '../classes/BotError.js';

export default class EventDoesNotExistError extends BotError<{
  eventName: string;
}> {
  public override readonly name: string = 'EventDoesNotExistError';

  constructor(eventName: string) {
    super('The requested event does not exist', { context: { eventName } });
  }
}
