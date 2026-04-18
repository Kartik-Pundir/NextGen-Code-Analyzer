import { parse } from '@babel/parser';
import traverse from '@babel/traverse';

export const analyzeCode = (code, language) => {
  const issues = [];
  const metrics = { complexity: 0, maintainability: 100, linesOfCode: 0 };

  try {
    metrics.linesOfCode = code.split('\n').length;

    if (language === 'javascript' || language === 'jsx' || language === 'typescript') {
      analyzeJavaScript(code, issues, metrics, language);
    } else if (language === 'python') {
      analyzePython(code, issues, metrics);
    } else if (language === 'java') {
      analyzeJava(code, issues, metrics);
    } else if (language === 'c' || language === 'cpp') {
      analyzeC(code, issues, metrics);
    }

    metrics.maintainability = Math.max(0, 100 - metrics.complexity * 2);
  } catch (error) {
    issues.push({
      type: 'syntax',
      severity: 'error',
      line: 1,
      message: 'Syntax error in code'
    });
  }

  return { issues, metrics };
};

function analyzeJavaScript(code, issues, metrics, language) {
  try {
    const ast = parse(code, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript']
    });

    traverse.default(ast, {
      FunctionDeclaration(path) {
        const params = path.node.params.length;
        if (params > 5) {
          issues.push({
            type: 'complexity',
            severity: 'warning',
            line: path.node.loc.start.line,
            message: `Function has ${params} parameters. Consider reducing to 5 or fewer.`
          });
        }
        metrics.complexity += 1;
      },
      IfStatement() {
        metrics.complexity += 1;
      },
      ForStatement() {
        metrics.complexity += 2;
      },
      WhileStatement() {
        metrics.complexity += 2;
      },
      VariableDeclarator(path) {
        if (path.node.id.name && path.node.id.name.length < 2) {
          issues.push({
            type: 'naming',
            severity: 'info',
            line: path.node.loc.start.line,
            message: 'Variable name is too short. Use descriptive names.'
          });
        }
      }
    });
  } catch (error) {
    issues.push({
      type: 'syntax',
      severity: 'error',
      line: 1,
      message: 'JavaScript syntax error'
    });
  }
}

function analyzePython(code, issues, metrics) {
  const lines = code.split('\n');
  let indentLevel = 0;
  let maxIndent = 0;

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    
    // Count complexity
    if (trimmed.startsWith('def ')) {
      const match = trimmed.match(/def\s+\w+\s*\((.*?)\)/);
      if (match) {
        const params = match[1].split(',').filter(p => p.trim()).length;
        if (params > 5) {
          issues.push({
            type: 'complexity',
            severity: 'warning',
            line: index + 1,
            message: `Function has ${params} parameters. Consider reducing to 5 or fewer.`
          });
        }
      }
      metrics.complexity += 1;
    }
    
    if (trimmed.startsWith('if ') || trimmed.startsWith('elif ')) {
      metrics.complexity += 1;
    }
    
    if (trimmed.startsWith('for ') || trimmed.startsWith('while ')) {
      metrics.complexity += 2;
    }
    
    // Check indentation
    const indent = line.match(/^\s*/)[0].length;
    if (indent > maxIndent) maxIndent = indent;
    
    // Check for short variable names
    const varMatch = trimmed.match(/^(\w)\s*=/);
    if (varMatch && varMatch[1].length === 1 && varMatch[1] !== 'i') {
      issues.push({
        type: 'naming',
        severity: 'info',
        line: index + 1,
        message: 'Variable name is too short. Use descriptive names.'
      });
    }
  });

  if (maxIndent > 16) {
    issues.push({
      type: 'complexity',
      severity: 'warning',
      line: 1,
      message: 'Deep nesting detected. Consider refactoring.'
    });
  }
}

function analyzeJava(code, issues, metrics) {
  const lines = code.split('\n');
  
  lines.forEach((line, index) => {
    const trimmed = line.trim();
    
    // Function/method detection
    if (trimmed.match(/\b(public|private|protected|static).*\(.*\)/)) {
      const match = trimmed.match(/\((.*?)\)/);
      if (match) {
        const params = match[1].split(',').filter(p => p.trim()).length;
        if (params > 5) {
          issues.push({
            type: 'complexity',
            severity: 'warning',
            line: index + 1,
            message: `Method has ${params} parameters. Consider reducing to 5 or fewer.`
          });
        }
      }
      metrics.complexity += 1;
    }
    
    if (trimmed.startsWith('if ') || trimmed.startsWith('else if')) {
      metrics.complexity += 1;
    }
    
    if (trimmed.startsWith('for ') || trimmed.startsWith('while ')) {
      metrics.complexity += 2;
    }
    
    // Check for single letter variables (except i, j, k)
    const varMatch = trimmed.match(/\b(int|String|double|float|boolean)\s+(\w)\b/);
    if (varMatch && varMatch[2].length === 1 && !['i', 'j', 'k'].includes(varMatch[2])) {
      issues.push({
        type: 'naming',
        severity: 'info',
        line: index + 1,
        message: 'Variable name is too short. Use descriptive names.'
      });
    }
  });
}

function analyzeC(code, issues, metrics) {
  const lines = code.split('\n');
  
  lines.forEach((line, index) => {
    const trimmed = line.trim();
    
    // Function detection
    if (trimmed.match(/^\w+\s+\w+\s*\(.*\)\s*\{?$/)) {
      const match = trimmed.match(/\((.*?)\)/);
      if (match) {
        const params = match[1].split(',').filter(p => p.trim() && p.trim() !== 'void').length;
        if (params > 5) {
          issues.push({
            type: 'complexity',
            severity: 'warning',
            line: index + 1,
            message: `Function has ${params} parameters. Consider reducing to 5 or fewer.`
          });
        }
      }
      metrics.complexity += 1;
    }
    
    if (trimmed.startsWith('if ') || trimmed.startsWith('else if')) {
      metrics.complexity += 1;
    }
    
    if (trimmed.startsWith('for ') || trimmed.startsWith('while ')) {
      metrics.complexity += 2;
    }
    
    // Check for single letter variables
    const varMatch = trimmed.match(/\b(int|char|float|double)\s+(\w)\b/);
    if (varMatch && varMatch[2].length === 1 && !['i', 'j', 'k'].includes(varMatch[2])) {
      issues.push({
        type: 'naming',
        severity: 'info',
        line: index + 1,
        message: 'Variable name is too short. Use descriptive names.'
      });
    }
    
    // Check for potential buffer overflow
    if (trimmed.includes('gets(') || trimmed.includes('strcpy(')) {
      issues.push({
        type: 'security',
        severity: 'error',
        line: index + 1,
        message: 'Unsafe function detected. Use safer alternatives like fgets() or strncpy().'
      });
    }
  });
}
