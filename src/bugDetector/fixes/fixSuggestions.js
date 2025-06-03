async function generateFixes(issues) {
    return issues.map(issue => {
        let suggestion = '';
        
        switch (issue.type) {
            case 'PERFORMANCE':
                suggestion = 'Cache GetComponent result in Start/Awake method';
                break;
            case 'MEMORY_LEAK':
                suggestion = 'Store reference and use Destroy() when done';
                break;
            case 'PHYSICS':
                suggestion = 'Use Rigidbody.MovePosition instead of transform.position';
                break;
            default:
                suggestion = 'Review the code for potential improvements';
        }

        return {
            ...issue,
            suggestion
        };
    });
}

module.exports = {
    generateFixes
}; 