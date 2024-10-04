// Importing ESLint configurations for JavaScript linting rules from the '@eslint/js' package
import js from '@eslint/js';

// Importing global variable definitions for browser environments (e.g., window, document) from the 'globals' package
import globals from 'globals';

// Importing the React Hooks ESLint plugin to enforce best practices with React hooks (useState, useEffect, etc.)
import reactHooks from 'eslint-plugin-react-hooks';

// Importing the React Refresh ESLint plugin to enable fast refresh for React during development
import reactRefresh from 'eslint-plugin-react-refresh';

// Importing the ESLint plugin for TypeScript configurations
import tseslint from 'typescript-eslint';

// Exporting the TypeScript ESLint configuration as the default export
export default tseslint.config(
  // Setting the 'dist' directory to be ignored by ESLint (dist is often a build output directory)
  { ignores: ['dist'] },

  {
    // Extending ESLint configurations with recommended rules for both JavaScript and TypeScript
    extends: [js.configs.recommended, ...tseslint.configs.recommended],

    // Specifying that ESLint should only check files with the extensions .ts and .tsx (TypeScript and TypeScript React files)
    files: ['**/*.{ts,tsx}'],

    // Defining language options for ECMAScript 2020 and setting the environment to recognize browser global variables
    languageOptions: {
      ecmaVersion: 2020,          // Supports modern JavaScript features from ECMAScript 2020
      globals: globals.browser,    // Enables browser-specific global variables like window, document, etc.
    },

    // Defining ESLint plugins that extend the functionality of the linter
    plugins: {
      // React Hooks plugin to ensure hooks (like useState, useEffect) are used correctly in React components
      'react-hooks': reactHooks,

      // React Refresh plugin to enable fast refresh for React components during development without losing component state
      'react-refresh': reactRefresh,
    },

    // Defining custom linting rules to be applied
    rules: {
      // Applying all recommended rules from the React Hooks plugin
      ...reactHooks.configs.recommended.rules,

      // Adding a specific rule from the React Refresh plugin to warn if non-component exports are used
      // but allowing constant exports (e.g., exported constants, pure functions) for fast refresh compatibility
      'react-refresh/only-export-components': [
        'warn',                      // This rule will display warnings when violated
        { allowConstantExport: true } // Allows constants to be exported alongside React components
      ],
    },
  },
);
