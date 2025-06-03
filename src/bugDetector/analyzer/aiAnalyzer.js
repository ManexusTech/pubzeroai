const OpenAI = require('openai');
const fs = require('fs').promises;

async function analyzeWithAI(codePath, options) {
    // For debugging, log the API key presence
    console.log('API Key exists:', !!process.env.OPENAI_API_KEY);
    
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    });

    try {
        const content = await fs.readFile(codePath, 'utf8');
        
        const prompt = `Analyze this game code for potential issues and suggest improvements:
        
        ${content}
        
        Focus on:
        1. Performance issues
        2. Memory leaks
        3. Best practices for ${options.engine} engine
        4. Code structure and patterns
        
        Format the response as JSON with the following structure:
        {
            "issues": [
                {
                    "type": "ISSUE_TYPE",
                    "description": "Detailed description",
                    "severity": "high/medium/low",
                    "suggestion": "How to fix it"
                }
            ]
        }`;

        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "gpt-3.5-turbo",
            temperature: 0.7,
            max_tokens: 1000,
            response_format: { type: "json_object" }
        });

        const aiAnalysis = JSON.parse(completion.choices[0].message.content);
        return aiAnalysis.issues.map(issue => ({
            ...issue,
            source: 'AI_ANALYSIS'
        }));

    } catch (error) {
        console.error('AI analysis failed:', error);
        return [];
    }
}

module.exports = {
    analyzeWithAI
}; 