import RequiredEnvironmentVariableMissingError from '../errors/RequiredEnvironmentVariableMissingError.js';

export function resolveEnvironmentVariable(
  environmentVariableName: string
): string {
  const environmentVariableValue = process.env[environmentVariableName];

  if (!environmentVariableValue) {
    throw new RequiredEnvironmentVariableMissingError(environmentVariableName);
  }

  return environmentVariableValue;
}
