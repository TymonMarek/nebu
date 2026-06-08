import { BotError } from '../classes/BotError.js';

export default class RequiredEnvironmentVariableMissingError extends BotError<{
  environmentVariableName: string;
}> {
  public override readonly name: string =
    'RequiredEnvironmentVariableMissingError';

  constructor(environmentVariableName: string) {
    super('A required environment variable is missing', {
      context: { environmentVariableName }
    });
  }
}
