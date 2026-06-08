import { BotError } from '../classes/BotError.js';

export default class DuplicateEventError extends BotError<{
  eventName: string;
}> {
  public override readonly name: string = 'DuplicateEventError';

  constructor(eventName: string) {
    super('A required environment variable is missing', {
      context: { eventName }
    });
  }
}
