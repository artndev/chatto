import globals from 'globals'
import pluginJs from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import pluginPrettier from 'eslint-plugin-prettier/recommended'

export default [
  {
    ignores: ['**/node_modules'],
    files: ['**/*.js', '**/*.vue'],
    languageOptions: { globals: globals.browser },
    rules: {
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
    },
  },
  pluginVue.configs['flat/recommended'],
  pluginJs.configs.recommended,
  pluginPrettier,
]
