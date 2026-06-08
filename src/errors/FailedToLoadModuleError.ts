import { PathLike } from 'node:fs';
import { BotError } from '../classes/BotError.js';

export default class FailedToLoadModuleError extends BotError<{
  filePath: string;
}> {
  public override readonly name: string = 'FailedToLoadModuleError';

  constructor(filePath: PathLike, cause: Error) {
    super('Failed to load module', {
      cause: cause,
      context: { filePath: filePath.toString() }
    });
  }
}
