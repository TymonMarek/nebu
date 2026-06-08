interface DiscordSecrets {
  readonly token: string;
  readonly applicationId: string;
}

export default interface BotSecretOptions {
  readonly discord: DiscordSecrets;
}
