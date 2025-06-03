const eslint = require('eslint');
const fs = require('fs').promises;
const path = require('path');

async function analyzeCode(codePath, options) {
  const eslintConfig = {
    parser: options.language === 'typescript' ? '@typescript-eslint/parser' : null,
    parserOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    rules: {
      // Game-specific rules
      'no-unused-vars': 'warn',
      'no-empty-function': 'warn',
      'complexity': ['warn', 10],
      // Add more game-specific rules here
    }
  };

  const eslintInstance = new eslint.ESLint({
    baseConfig: eslintConfig,
    useEslintrc: false
  });

  try {
    const results = await eslintInstance.lintFiles([codePath]);
    
    return results.map(result => ({
      filePath: result.filePath,
      issues: result.messages.map(msg => ({
        line: msg.line,
        column: msg.column,
        severity: msg.severity,
        message: msg.message,
        ruleId: msg.ruleId
      }))
    }));
  } catch (error) {
    console.error('Static analysis failed:', error);
    return [];
  }
}

module.exports = {
  analyzeCode
}; 