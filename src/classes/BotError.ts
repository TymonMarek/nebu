import type { ErrorContext } from '../types/ErrorContext.js';

interface BotErrorOptions<T extends ErrorContext> {
  cause?: Error;
  context?: T;
}

export class BotError<T extends ErrorContext> extends Error {
  public override readonly name: string = 'BotError';
  public override readonly cause: Error | undefined;
  public readonly context: T | undefined;

  constructor(message: string, options?: BotErrorOptions<T>) {
    super(message, { cause: options?.cause });
    this.context = options?.context;
    this.cause = options?.cause;
  }
}
