const fs = require('fs').promises;
const { bugPatterns } = require('../models/bugPatterns');

async function detectPatterns(codePath, options) {
  try {
    const content = await fs.readFile(codePath, 'utf8');
    const issues = [];

    // Check for common game development patterns
    for (const pattern of bugPatterns) {
      const matches = content.match(pattern.regex);
      if (matches) {
        issues.push({
          type: pattern.type,
          description: pattern.description,
          severity: pattern.severity,
          line: getLineNumber(content, matches.index)
        });
      }
    }

    return issues;
  } catch (error) {
    console.error('Pattern analysis failed:', error);
    return [];
  }
}

function getLineNumber(content, index) {
  return content.substring(0, index).split('\n').length;
}

module.exports = {
  detectPatterns
}; 