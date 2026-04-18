import axios from 'axios';

export const getAISuggestions = async (code, language, astResults) => {
  try {
    const prompt = `Analyze this ${language} code and provide 3-5 specific optimization suggestions:\n\n${code}\n\nIssues found: ${JSON.stringify(astResults.issues)}`;

    const response = await axios.post(
      process.env.AI_API_URL,
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a code optimization expert.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 500
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.AI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const suggestions = response.data.choices[0].message.content
      .split('\n')
      .filter(s => s.trim().length > 0)
      .slice(0, 5);

    return suggestions;
  } catch (error) {
    return getFallbackSuggestions(language);
  }
};

function getFallbackSuggestions(language) {
  const commonSuggestions = [
    'Consider breaking down complex functions into smaller units',
    'Use meaningful variable and function names',
    'Add error handling for edge cases',
    'Optimize loops and reduce nested conditions'
  ];

  const languageSpecific = {
    python: [
      'Use list comprehensions for better readability',
      'Follow PEP 8 style guidelines',
      'Consider using type hints for better code documentation',
      'Use context managers (with statement) for resource management'
    ],
    java: [
      'Follow Java naming conventions (camelCase for methods)',
      'Use StringBuilder for string concatenation in loops',
      'Consider using streams for collection operations',
      'Add proper exception handling with try-catch blocks'
    ],
    c: [
      'Always check return values of functions',
      'Use const for read-only pointers',
      'Avoid memory leaks by freeing allocated memory',
      'Use safer string functions (strncpy instead of strcpy)'
    ],
    cpp: [
      'Use RAII for resource management',
      'Prefer smart pointers over raw pointers',
      'Use const correctness throughout your code',
      'Consider using STL containers instead of raw arrays'
    ]
  };

  return languageSpecific[language] || commonSuggestions;
}
