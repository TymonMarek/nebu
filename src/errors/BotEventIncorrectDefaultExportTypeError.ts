import { PathLike } from 'node:fs';
import { BotError } from '../classes/BotError.js';

export default class BotEventIncorrectDefaultExportTypeError extends BotError<{
  botEventModulePath: string;
  typeOfDefaultExport: string;
}> {
  public override readonly name: string =
    'BotEventIncorrectDefaultExportTypeError';

  constructor(botEventModulePath: PathLike, defaultExport: unknown) {
    super('Bot event module has an incorrect default export type', {
      context: {
        botEventModulePath: botEventModulePath.toString(),
        typeOfDefaultExport: typeof defaultExport
      }
    });
  }
}
