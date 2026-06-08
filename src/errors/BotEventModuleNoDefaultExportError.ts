import { PathLike } from 'node:fs';
import { BotError } from '../classes/BotError.js';

export default class BotEventModuleNoDefaultExportError extends BotError<{
  botEventModulePath: string;
}> {
  public override readonly name: string = 'BotEventModuleNoDefaultExportError';

  constructor(botEventModulePath: PathLike) {
    super('Bot event module has no default export', {
      context: { botEventModulePath: botEventModulePath.toString() }
    });
  }
}
