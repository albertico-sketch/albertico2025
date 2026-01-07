// eslint.config.js
import js from '@eslint/js'
import reactPlugin from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import typescriptPlugin from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import globals from 'globals'

export default [
  // Configuración base de ESLint
  js.configs.recommended,

  // Configuración específica para TypeScript/TSX
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node
      }
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin
    },
    rules: {
      // Desactivar reglas core que entran en conflicto con TypeScript
      'no-unused-vars': 'off',
      'no-undef': 'off', // TypeScript maneja esto

      // Usar reglas específicas de TypeScript
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

      // Reglas de formato (mantenemos las mismas que para JS)
      'semi': ['error', 'never'],
      'quotes': ['error', 'single'],
      'indent': ['error', 2],
      'comma-dangle': ['error', 'never'],
      'eqeqeq': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { 'before': true, 'after': true }],
      'space-before-function-paren': ['error', {
        'anonymous': 'always',
        'named': 'never',
        'asyncArrow': 'always'
      }],

      // Reglas específicas para controlar espacios en blanco
      'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 0, 'maxBOF': 0 }],
      'no-trailing-spaces': 'error',
      'eol-last': ['error', 'always'],
      'padded-blocks': ['error', 'never'],
      'space-before-blocks': 'error',
      'keyword-spacing': ['error', { 'before': true, 'after': true }],
      'key-spacing': ['error', { 'beforeColon': false, 'afterColon': true }],
      'space-infix-ops': 'error',
      'no-multi-spaces': 'error',
      'brace-style': ['error', '1tbs', { 'allowSingleLine': true }],

      // Otras reglas
      'no-console': 'off',
      'camelcase': 'off',
      'no-extra-boolean-cast': 'error',
      'no-empty': 'error',
      'no-useless-return': 'error',
      'complexity': ['error', { 'max': 30 }]
    }
  }, // Configuración global para JS/JSX
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node
      },
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      }
    }
  },

  // Reglas de estilo Standard para JS/JSX (adaptadas manualmente para emular 'standard')
  {
    files: ['**/*.{js,jsx}'],
    rules: {
      // Reglas de formato
      'semi': ['error', 'never'],
      'quotes': ['error', 'single'],
      'indent': ['error', 2],
      'comma-dangle': ['error', 'never'],
      'no-unused-vars': 'warn',
      'eqeqeq': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { 'before': true, 'after': true }],
      'space-before-function-paren': ['error', {
        'anonymous': 'always',
        'named': 'never',
        'asyncArrow': 'always'
      }],

      // Reglas específicas para controlar espacios en blanco (como en standard)
      'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 0, 'maxBOF': 0 }],
      'no-trailing-spaces': 'error',
      'eol-last': ['error', 'always'],
      'padded-blocks': ['error', 'never'],
      'space-before-blocks': 'error',
      'keyword-spacing': ['error', { 'before': true, 'after': true }],
      'key-spacing': ['error', { 'beforeColon': false, 'afterColon': true }],
      'space-infix-ops': 'error',
      'no-multi-spaces': 'error',
      'brace-style': ['error', '1tbs', { 'allowSingleLine': true }],

      // Otras reglas comunes en standard
      'no-console': 'off',
      'camelcase': 'off',
      'no-extra-boolean-cast': 'error',
      'no-empty': 'error',
      'no-undef': 'error',
      'no-useless-return': 'error',
      'complexity': ['error', { 'max': 30 }]
    }
  },

  // Configuración específica para React
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh
    },
    settings: {
      react: {
        version: '19'
      }
    },
    rules: {
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off', // Desactivado como en tu configuración
      'react/jsx-no-undef': 'error',
      'react/jsx-uses-vars': 'error',
      'react/no-unknown-property': 'error',

      // Reglas de Hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // React Refresh (mantenida igual que en tu configuración)
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }
      ]
    }
  },

  // Configuraciones específicas para archivos de prueba
  {
    files: ['**/*.test.{js,jsx,ts,tsx}', '**/*.spec.{js,jsx,ts,tsx}'],
    rules: {
      'no-unused-expressions': 'off'
    }
  },

  // Archivos a ignorar (basado en tu ignorePatterns anterior)
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      'coverage/**',
      '.pnpm-store/**',
      '.vscode/**',
      'public/**',
      '**/*.min.js',
      '*.test.js',
      '/ecosystem.config.js',
      '/autoScaler.js',
      '/vitest.config.js',
      '*.yml'
    ]
  }
]
