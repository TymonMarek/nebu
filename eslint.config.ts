import { defineConfig, Config } from 'eslint/config';
import js from '@eslint/js';
import ts from 'typescript-eslint';
import json from '@eslint/json';
import yml from 'eslint-plugin-yml';
import markdown from '@eslint/markdown';
import prettier from 'eslint-config-prettier';

export default defineConfig([
  {
    files: ['**/*.{ts,cts,mts}'],
    extends: [js.configs.recommended, ts.configs.strict, ts.configs.stylistic]
  },
  {
    files: ['**/*.{yml,yaml}'],
    plugins: { yml },
    extends: [yml.configs.standard, yml.configs.prettier]
  },
  {
    files: ['**/*.json', '**/*.jsonc', '.vscode/*.json', '**/*.json5'],
    plugins: { json },
    extends: [json.configs.recommended]
  },
  { files: ['**/*.json'], language: 'json/json' },
  { files: ['**/*.jsonc', '.vscode/*.json'], language: 'json/jsonc' },
  { files: ['**/*.json5'], language: 'json/json5' },
  {
    files: ['**/*.md'],
    plugins: { markdown },
    language: 'markdown/gfm',
    languageOptions: { frontmatter: 'yaml' },
    extends: [markdown.configs.recommended, markdown.configs.processor]
  },
  prettier
]) satisfies Config[];
