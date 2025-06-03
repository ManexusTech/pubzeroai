const bugPatterns = [
  {
    type: 'PERFORMANCE',
    regex: /Update\s*\(\s*\)\s*{\s*[^}]*GetComponent\s*<[^>]+>\s*\(/g,
    description: 'GetComponent calls in Update method can cause performance issues',
    severity: 'high'
  },
  {
    type: 'MEMORY_LEAK',
    regex: /Instantiate\s*\([^)]*\)/g,
    description: 'Potential memory leak: Instantiated object might not be destroyed',
    severity: 'medium'
  },
  {
    type: 'PHYSICS',
    regex: /void\s+FixedUpdate\s*\(\s*\)\s*{\s*[^}]*transform\.position/g,
    description: 'Using transform.position in FixedUpdate instead of Rigidbody',
    severity: 'medium'
  }
];

module.exports = {
  bugPatterns
}; 