import type { UserConfig } from '@commitlint/types';

const commitlintConfig: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  formatter: '@commitlint/format'
};

export default commitlintConfig;
