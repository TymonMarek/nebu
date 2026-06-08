import type { Config } from 'prettier';

export default {
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,

  semi: true,
  singleQuote: true,
  quoteProps: 'as-needed',
  trailingComma: 'none',

  arrowParens: 'always',

  bracketSpacing: true,
  objectWrap: 'collapse',
  jsxSingleQuote: false,
  bracketSameLine: false,

  htmlWhitespaceSensitivity: 'css',
  proseWrap: 'preserve',

  endOfLine: 'lf',

  experimentalTernaries: true,
  experimentalOperatorPosition: 'start'
} satisfies Config;
