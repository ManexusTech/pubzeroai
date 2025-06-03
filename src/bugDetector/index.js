require('dotenv').config();
const { Command } = require('commander');
const { analyzeCode } = require('./analyzer/staticAnalyzer');
const { detectPatterns } = require('./analyzer/patternAnalyzer');
const { analyzeWithAI } = require('./analyzer/aiAnalyzer');
const { generateFixes } = require('./fixes/fixSuggestions');

const program = new Command();

program
  .name('pubzero-bug-detector')
  .description('AI-powered bug detection for game development')
  .version('0.1.0')
  .argument('<path>', 'Path to the game code directory or file')
  .option('-e, --engine <type>', 'Game engine type (unity, unreal, godot)', 'unity')
  .option('-l, --language <type>', 'Programming language', 'javascript')
  .option('--no-ai', 'Disable AI analysis')
  .action(async (path, options) => {
    try {
      // Step 1: Static Analysis
      const staticIssues = await analyzeCode(path, options);
      
      // Step 2: Pattern Analysis
      const patternIssues = await detectPatterns(path, options);
      
      // Step 3: AI Analysis
      const aiIssues = options.ai ? await analyzeWithAI(path, options) : [];
      
      // Step 4: Generate Fix Suggestions
      const allIssues = [...staticIssues, ...patternIssues, ...aiIssues];
      const fixes = await generateFixes(allIssues);
      
      // Output results
      console.log('Analysis Results:');
      console.log('=================');
      
      console.log('\nStatic Analysis Issues:');
      console.table(staticIssues);
      
      console.log('\nPattern-based Issues:');
      console.table(patternIssues);
      
      if (options.ai) {
        console.log('\nAI Analysis Issues:');
        console.table(aiIssues);
      }
      
      console.log('\nSuggested Fixes:');
      console.table(fixes);
    } catch (error) {
      console.error('Error during analysis:', error);
      process.exit(1);
    }
  });

program.parse(); 