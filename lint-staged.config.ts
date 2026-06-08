import type { Configuration } from 'lint-staged';
import path from 'path';

const buildEslintCommand = (files: readonly string[]) =>
  `eslint --fix ${files.map((f) => `"${path.relative(process.cwd(), f)}"`).join(' ')}`;

const buildPrettierCommand = (files: readonly string[]) =>
  `prettier --write ${files.map((file) => `"${path.relative(process.cwd(), file)}"`).join(' ')}`;

const lintStagedConfig: Configuration = {
  '*.{js,mjs,cjs,ts,mts,cts}': (files) => [
    buildEslintCommand(files),
    buildPrettierCommand(files)
  ],
  '*.{json,jsonc}': (files) => [
    buildEslintCommand(files),
    buildPrettierCommand(files)
  ],
  '*.{yaml,yml}': (files) => [
    buildEslintCommand(files),
    buildPrettierCommand(files)
  ],
  '*.md': (files) => [buildEslintCommand(files), buildPrettierCommand(files)]
};

export default lintStagedConfig satisfies Configuration;
