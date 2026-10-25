// @ts-check

import eslint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import perfectionist from 'eslint-plugin-perfectionist';
import unusedImports from 'eslint-plugin-unused-imports';
import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig(
  globalIgnores(['.dist/**', 'infra-local-emulator/**']),
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    plugins: {
      '@stylistic': stylistic,
      'unused-imports': unusedImports,
      perfectionist: perfectionist
    },
    rules: {
      '@stylistic/lines-between-class-members': [
        'error',
        'always',
        {
          exceptAfterSingleLine: false,
          exceptAfterOverload: true
        }
      ],
      '@typescript-eslint/no-unused-vars': 'off',
      'perfectionist/sort-classes': [
        'error',
        {
          groups: ['index-signature', 'static-property', 'property', 'constructor', 'static-method', 'method']
        }
      ],
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_'
        }
      ]
    }
  }
);
