document.addEventListener('DOMContentLoaded', function() {
  const root = document.getElementById('calc-root');
  if (!root) return;

  root.innerHTML = `
    <div class="max-w-md mx-auto bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-700">
      
      <!-- Display -->
      <div class="bg-slate-800 p-6 border-b border-slate-700">
        <div class="text-right">
          <div id="sci-history" class="text-slate-400 text-sm h-6 mb-1 overflow-hidden font-mono truncate"></div>
          <input type="text" id="sci-display" value="" class="w-full bg-transparent text-right text-4xl font-light text-white outline-none font-mono placeholder-slate-600" placeholder="0" readonly>
        </div>
        <div class="flex justify-between items-center mt-3">
          <span class="text-xs font-bold text-slate-500 bg-slate-700 px-2 py-1 rounded">DEG</span>
          <span id="sci-error" class="text-xs font-bold text-rose-500 hidden">Syntax Error</span>
        </div>
      </div>

      <!-- Keypad -->
      <div class="p-4 sm:p-6 bg-slate-900">
        <div class="grid grid-cols-5 gap-2 sm:gap-3">
          <!-- Row 1: Functions -->
          <button class="h-12 sm:h-14 rounded-xl flex items-center justify-center text-lg sm:text-xl font-medium transition-all active:scale-95 select-none bg-slate-800/50 text-slate-300 hover:bg-slate-700/80 text-sm sm:text-base border border-slate-700/30">sin</button>
          <button class="h-12 sm:h-14 rounded-xl flex items-center justify-center text-lg sm:text-xl font-medium transition-all active:scale-95 select-none bg-slate-800/50 text-slate-300 hover:bg-slate-700/80 text-sm sm:text-base border border-slate-700/30">cos</button>
          <button class="h-12 sm:h-14 rounded-xl flex items-center justify-center text-lg sm:text-xl font-medium transition-all active:scale-95 select-none bg-slate-800/50 text-slate-300 hover:bg-slate-700/80 text-sm sm:text-base border border-slate-700/30">tan</button>
          <button class="h-12 sm:h-14 rounded-xl flex items-center justify-center text-lg sm:text-xl font-medium transition-all active:scale-95 select-none bg-slate-800/50 text-slate-300 hover:bg-slate-700/80 text-sm sm:text-base border border-slate-700/30">log</button>
          <button class="h-12 sm:h-14 rounded-xl flex items-center justify-center text-lg sm:text-xl font-medium transition-all active:scale-95 select-none bg-slate-800/50 text-slate-300 hover:bg-slate-700/80 text-sm sm:text-base border border-slate-700/30">ln</button>

          <!-- Row 2: Advanced Operators -->
          <button class="h-12 sm:h-14 rounded-xl flex items-center justify-center text-lg sm:text-xl font-medium transition-all active:scale-95 select-none bg-slate-800/50 text-slate-300 hover:bg-slate-700/80 text-sm sm:text-base border border-slate-700/30">(</button>
          <button class="h-12 sm:h-14 rounded-xl flex items-center justify-center text-lg sm:text-xl font-medium transition-all active:scale-95 select-none bg-slate-800/50 text-slate-300 hover:bg-slate-700/80 text-sm sm:text-base border border-slate-700/30">)</button>
          <button class="h-12 sm:h-14 rounded-xl flex items-center justify-center text-lg sm:text-xl font-medium transition-all active:scale-95 select-none bg-slate-800/50 text-slate-300 hover:bg-slate-700/80 text-sm sm:text-base border border-slate-700/30">^</button>
          <button class="h-12 sm:h-14 rounded-xl flex items-center justify-center text-lg sm:text-xl font-medium transition-all active:scale-95 select-none bg-slate-800/50 text-slate-300 hover:bg-slate-700/80 text-sm sm:text-base border border-slate-700/30">√</button>
          <button class="h-12 sm:h-14 rounded-xl flex items-center justify-center text-lg sm:text-xl font-medium transition-all active:scale-95 select-none bg-slate-800/50 text-slate-300 hover:bg-slate-700/80 text-sm sm:text-base border border-slate-700/30">π</button>

          <!-- Row 3: Numpad & Core Controls -->
          <button class="h-12 sm:h-14 rounded-xl flex items-center justify-center text-lg sm:text-xl font-medium transition-all active:scale-95 select-none bg-slate-800 text-white hover:bg-slate-700 shadow-sm border border-slate-700/50">7</button>
          <button class="h-12 sm:h-14 rounded-xl flex items-center justify-center text-lg sm:text-xl font-medium transition-all active:scale-95 select-none bg-slate-800 text-white hover:bg-slate-700 shadow-sm border border-slate-700/50">8</button>
          <button class="h-12 sm:h-14 rounded-xl flex items-center justify-center text-lg sm:text-xl font-medium transition-all active:scale-95 select-none bg-slate-800 text-white hover:bg-slate-700 shadow-sm border border-slate-700/50">9</button>
          <button class="h-12 sm:h-14 rounded-xl flex items-center justify-center text-lg sm:text-xl font-medium transition-all active:scale-95 select-none text-rose-400 bg-rose-500/10 hover:bg-rose-500/20">DEL</button>
          <button class="h-12 sm:h-14 rounded-xl flex items-center justify-center text-lg sm:text-xl font-medium transition-all active:scale-95 select-none text-rose-400 bg-rose-500/10 hover:bg-rose-500/20">C</button>

          <!-- Row 4 -->
          <button class="h-12 sm:h-14 rounded-xl flex items-center justify-center text-lg sm:text-xl font-medium transition-all active:scale-95 select-none bg-slate-800 text-white hover:bg-slate-700 shadow-sm border border-slate-700/50">4</button>
          <button class="h-12 sm:h-14 rounded-xl flex items-center justify-center text-lg sm:text-xl font-medium transition-all active:scale-95 select-none bg-slate-800 text-white hover:bg-slate-700 shadow-sm border border-slate-700/50">5</button>
          <button class="h-12 sm:h-14 rounded-xl flex items-center justify-center text-lg sm:text-xl font-medium transition-all active:scale-95 select-none bg-slate-800 text-white hover:bg-slate-700 shadow-sm border border-slate-700/50">6</button>
          <button class="h-12 sm:h-14 rounded-xl flex items-center justify-center text-lg sm:text-xl font-medium transition-all active:scale-95 select-none bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 border border-indigo-500/20">×</button>
          <button class="h-12 sm:h-14 rounded-xl flex items-center justify-center text-lg sm:text-xl font-medium transition-all active:scale-95 select-none bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 border border-indigo-500/20">÷</button>

          <!-- Row 5 -->
          <button class="h-12 sm:h-14 rounded-xl flex items-center justify-center text-lg sm:text-xl font-medium transition-all active:scale-95 select-none bg-slate-800 text-white hover:bg-slate-700 shadow-sm border border-slate-700/50">1</button>
          <button class="h-12 sm:h-14 rounded-xl flex items-center justify-center text-lg sm:text-xl font-medium transition-all active:scale-95 select-none bg-slate-800 text-white hover:bg-slate-700 shadow-sm border border-slate-700/50">2</button>
          <button class="h-12 sm:h-14 rounded-xl flex items-center justify-center text-lg sm:text-xl font-medium transition-all active:scale-95 select-none bg-slate-800 text-white hover:bg-slate-700 shadow-sm border border-slate-700/50">3</button>
          <button class="h-12 sm:h-14 rounded-xl flex items-center justify-center text-lg sm:text-xl font-medium transition-all active:scale-95 select-none bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 border border-indigo-500/20">+</button>
          <button class="h-12 sm:h-14 rounded-xl flex items-center justify-center text-lg sm:text-xl font-medium transition-all active:scale-95 select-none bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 border border-indigo-500/20">-</button>

          <!-- Row 6 -->
          <button class="h-12 sm:h-14 rounded-xl flex items-center justify-center text-lg sm:text-xl font-medium transition-all active:scale-95 select-none bg-slate-800 text-white hover:bg-slate-700 shadow-sm border border-slate-700/50">0</button>
          <button class="h-12 sm:h-14 rounded-xl flex items-center justify-center text-lg sm:text-xl font-medium transition-all active:scale-95 select-none bg-slate-800 text-white hover:bg-slate-700 shadow-sm border border-slate-700/50">.</button>
          <button class="h-12 sm:h-14 rounded-xl flex items-center justify-center text-lg sm:text-xl font-medium transition-all active:scale-95 select-none bg-slate-800/50 text-slate-300 hover:bg-slate-700/80 text-sm sm:text-base border border-slate-700/30">e</button>
          <button class="h-12 sm:h-14 rounded-xl flex items-center justify-center text-lg sm:text-xl font-medium transition-all active:scale-95 select-none bg-slate-800/50 text-slate-300 hover:bg-slate-700/80 text-sm sm:text-base border border-slate-700/30">ANS</button>
          <button class="h-12 sm:h-14 rounded-xl flex items-center justify-center text-lg sm:text-xl font-medium transition-all active:scale-95 select-none bg-indigo-600 text-white hover:bg-indigo-500 font-bold text-xl rounded-xl shadow-md transition-all active:scale-95">=</button>
        </div>
      </div>
    </div>

    
  `;

  const display = document.getElementById('sci-display');
  const history = document.getElementById('sci-history');
  const errorMsg = document.getElementById('sci-error');
  
  let currentExpr = '';
  let lastAns = '0';
  let evaluated = false;

  function updateDisplay() {
    display.value = currentExpr;
    // Auto-scroll to right
    display.scrollLeft = display.scrollWidth;
  }

  function appendToExpr(val) {
    if (evaluated) {
      if (['+', '-', '×', '÷', '^'].includes(val)) {
        currentExpr = lastAns; // Continue with previous answer
      } else {
        currentExpr = '';
      }
      evaluated = false;
      errorMsg.classList.add('hidden');
    }
    
    // Formatting mappings
    if (['sin', 'cos', 'tan', 'log', 'ln', '√'].includes(val)) {
      currentExpr += val + '(';
    } else {
      currentExpr += val;
    }
    updateDisplay();
  }

  function evaluate() {
    if (!currentExpr) return;
    
    let expr = currentExpr;
    
    // Auto-close open parentheses
    const openParenCount = (expr.match(/\(/g) || []).length;
    const closeParenCount = (expr.match(/\)/g) || []).length;
    if (openParenCount > closeParenCount) {
      expr += ')'.repeat(openParenCount - closeParenCount);
    }

    // Prepare for JS evaluation
    let jsExpr = expr
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/\^/g, '**')
      .replace(/π/g, 'PI')
      .replace(/e/g, 'E')
      .replace(/ANS/g, lastAns)
      .replace(/√\(/g, 'sqrt(');

    // Math context setup
    const mathContext = {
      sin: (x) => Math.sin(x * Math.PI / 180),
      cos: (x) => Math.cos(x * Math.PI / 180),
      tan: (x) => Math.tan(x * Math.PI / 180),
      log: Math.log10,
      ln: Math.log,
      sqrt: Math.sqrt,
      PI: Math.PI,
      E: Math.E
    };

    try {
      // Evaluate securely using isolated function
      const args = Object.keys(mathContext);
      const values = Object.values(mathContext);
      
      const calcFunc = new Function(...args, `return ${jsExpr};`);
      let result = calcFunc(...values);

      if (!isFinite(result) || isNaN(result)) {
        throw new Error("Math Error");
      }

      // Precision fix for floating point errors (e.g. sin(180) should be 0)
      if (Math.abs(result) < 1e-10) result = 0;
      
      // Format final result (strip long decimals)
      result = parseFloat(result.toFixed(10)).toString();
      
      history.textContent = expr + ' =';
      currentExpr = result;
      lastAns = result;
      evaluated = true;
      errorMsg.classList.add('hidden');
    } catch (e) {
      errorMsg.classList.remove('hidden');
      evaluated = true; // Prevents continuing on error
    }
    
    updateDisplay();
  }

  // Bind Buttons
  const buttons = root.querySelectorAll('button');
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const val = e.target.textContent;
      
      if (val === 'C') {
        currentExpr = '';
        history.textContent = '';
        errorMsg.classList.add('hidden');
        evaluated = false;
        updateDisplay();
      } else if (val === 'DEL') {
        if (evaluated) {
          currentExpr = '';
          evaluated = false;
        } else if (currentExpr.length > 0) {
          // If ends with a function like 'sin(', remove all 4 chars
          const match = currentExpr.match(/(sin\(|cos\(|tan\(|log\(|ln\(|√\()$/);
          if (match) {
            currentExpr = currentExpr.slice(0, -match[0].length);
          } else {
            currentExpr = currentExpr.slice(0, -1);
          }
        }
        updateDisplay();
      } else if (val === '=') {
        evaluate();
      } else {
        appendToExpr(val);
      }
    });
  });

  // Physical Keyboard Support
  document.addEventListener('keydown', (e) => {
    // Only capture if they aren't typing in a different input (like search)
    if (document.activeElement.tagName === 'INPUT' && document.activeElement.id !== 'sci-display') return;

    const key = e.key;
    if (/[0-9\.\+\-\(\)]/.test(key)) {
      e.preventDefault();
      appendToExpr(key);
    } else if (key === '*' || key === 'x') {
      e.preventDefault();
      appendToExpr('×');
    } else if (key === '/') {
      e.preventDefault();
      appendToExpr('÷');
    } else if (key === '^') {
      e.preventDefault();
      appendToExpr('^');
    } else if (key === 'Enter' || key === '=') {
      e.preventDefault();
      evaluate();
    } else if (key === 'Backspace') {
      e.preventDefault();
      if (evaluated) { currentExpr = ''; evaluated = false; updateDisplay(); }
      else if (currentExpr.length > 0) {
        const match = currentExpr.match(/(sin\(|cos\(|tan\(|log\(|ln\(|√\()$/);
        if (match) currentExpr = currentExpr.slice(0, -match[0].length);
        else currentExpr = currentExpr.slice(0, -1);
        updateDisplay();
      }
    } else if (key === 'Escape') {
      currentExpr = ''; history.textContent = ''; updateDisplay();
    }
  });

});
