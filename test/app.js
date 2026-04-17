let expression = '';

function updateDisplay() {
  const exprEl = document.getElementById('expression');
  const resultEl = document.getElementById('result');

  // Show readable expression (replace operators for display)
  exprEl.textContent = expression
    .replace(/\*/g, '×')
    .replace(/\//g, '÷');

  // Live preview result
  if (expression) {
    try {
      const preview = eval(expression);
      if (!isNaN(preview) && isFinite(preview)) {
        resultEl.textContent = parseFloat(preview.toFixed(10)).toString();
      }
    } catch {
      // incomplete expression, keep last result
    }
  } else {
    resultEl.textContent = '0';
  }
}

function append(value) {
  const operators = ['+', '-', '*', '/', '%'];
  const lastChar = expression.slice(-1);

  // Prevent double operators
  if (operators.includes(value) && operators.includes(lastChar)) {
    expression = expression.slice(0, -1);
  }

  // Prevent leading operator (except minus for negative)
  if (expression === '' && operators.includes(value) && value !== '-') return;

  // Prevent double decimal in same number
  if (value === '.') {
    const parts = expression.split(/[\+\-\*\/\%]/);
    if (parts[parts.length - 1].includes('.')) return;
  }

  expression += value;
  updateDisplay();
}

function clearAll() {
  expression = '';
  updateDisplay();
}

function deleteLast() {
  expression = expression.slice(0, -1);
  updateDisplay();
}

function calculate() {
  if (!expression) return;
  try {
    const result = eval(expression);
    if (!isFinite(result)) {
      document.getElementById('result').textContent = '錯誤';
      document.getElementById('expression').textContent = expression.replace(/\*/g, '×').replace(/\//g, '÷');
      expression = '';
      return;
    }
    const final = parseFloat(result.toFixed(10)).toString();
    document.getElementById('expression').textContent =
      expression.replace(/\*/g, '×').replace(/\//g, '÷') + ' =';
    document.getElementById('result').textContent = final;
    expression = final;
  } catch {
    document.getElementById('result').textContent = '錯誤';
    expression = '';
  }
}

// Keyboard support
document.addEventListener('keydown', (e) => {
  if (e.key >= '0' && e.key <= '9') append(e.key);
  else if (['+', '-', '*', '/', '%'].includes(e.key)) append(e.key);
  else if (e.key === '.') append('.');
  else if (e.key === 'Enter' || e.key === '=') calculate();
  else if (e.key === 'Backspace') deleteLast();
  else if (e.key === 'Escape') clearAll();
});
