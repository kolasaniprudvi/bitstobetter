/**
 * BitsToBetter — Global Header Component with Adaptive Logo, Search, and Categorized Dropdowns
 * This component is injected into every page and preserves all existing calculator functionality.
 */

(function (global) {
  'use strict';

  // ═══════════════════════════════════════════════════════════════════════════
  // ADAPTIVE SVG LOGO — Works in Light/Dark modes
  // ═══════════════════════════════════════════════════════════════════════════
  function createAdaptiveLogo() {
    return `
      <a href="/" class="flex items-center gap-2 font-bold text-xl hover:opacity-80 transition-opacity">
        <svg width="40" height="40" viewBox="0 0 40 40" class="text-slate-900 dark:text-white" fill="none" aria-label="BitsToBetter">
          <!-- Main container: upward arrow trend + calculator grid mashup -->
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:currentColor;stop-opacity:1" />
              <stop offset="100%" style="stop-color:currentColor;stop-opacity:0.7" />
            </linearGradient>
          </defs>
          
          <!-- Upward arrow (wealth growth) -->
          <path d="M 8 28 L 20 12 L 32 28" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M 20 12 L 20 32" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>
          
          <!-- Calculator grid (3x3 dots = precision) -->
          <circle cx="10" cy="20" r="1.5" fill="currentColor" opacity="0.6"/>
          <circle cx="20" cy="20" r="1.5" fill="currentColor"/>
          <circle cx="30" cy="20" r="1.5" fill="currentColor" opacity="0.6"/>
          
          <!-- Health pulse line (fitness integration) -->
          <path d="M 8 35 Q 12 32 15 35 T 22 35" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" opacity="0.5"/>
        </svg>
        <span class="hidden sm:inline">BitsToBetter</span>
      </a>
    `;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SEARCHABLE CALCULATOR CATALOG
  // ═══════════════════════════════════════════════════════════════════════════
  const SEARCH_CATALOG = [
    // FINANCE
    { id: 'emi', title: 'EMI Calculator', keywords: 'loan mortgage home car emi', url: '/finance/emi.html', category: 'Finance' },
    { id: 'fire', title: 'FIRE Engine', keywords: 'retirement fire investing goals planning', url: '/finance/fire.html', category: 'Finance' },
    { id: 'ppf', title: 'PPF Calculator', keywords: 'ppf scheme public provident fund tax saving', url: '/finance/ppf.html', category: 'Finance' },
    { id: 'fd', title: 'FD Calculator', keywords: 'fixed deposit interest compound savings', url: '/finance/fd.html', category: 'Finance' },
    { id: 'rd', title: 'RD Calculator', keywords: 'recurring deposit monthly savings', url: '/finance/rd.html', category: 'Finance' },
    { id: 'sip', title: 'SIP Calculator', keywords: 'systematic investment plan mutual funds', url: '/finance/sip.html', category: 'Finance' },
    { id: 'gst', title: 'GST Calculator', keywords: 'goods service tax gst rate', url: '/finance/gst.html', category: 'Finance' },
    { id: 'tax', title: 'Income Tax Calculator', keywords: 'income tax salaried professional deduction', url: '/finance/income-tax.html', category: 'Finance' },
    { id: 'inflation', title: 'Inflation Calculator', keywords: 'inflation purchasing power future value', url: '/finance/inflation.html', category: 'Finance' },
    { id: 'nps', title: 'NPS Calculator', keywords: 'national pension scheme retirement nps', url: '/finance/nps.html', category: 'Finance' },
    
    // FITNESS
    { id: 'bmi', title: 'BMI Calculator', keywords: 'bmi body mass index weight health', url: '/health/bmi.html', category: 'Fitness' },
    { id: 'bmr', title: 'BMR Calculator', keywords: 'basal metabolic rate calorie burn', url: '/health/bmr.html', category: 'Fitness' },
    { id: 'tdee', title: 'TDEE Calculator', keywords: 'tdee daily calorie expenditure energy', url: '/health/tdee.html', category: 'Fitness' },
    { id: 'macro', title: 'Macro Calculator', keywords: 'macronutrients protein carbs fat nutrition', url: '/health/macro.html', category: 'Fitness' },
    { id: 'gym', title: 'Gym Workout Guide', keywords: 'gym training strength hypertrophy posture', url: '/health/gym-guide.html', category: 'Fitness' },
    { id: 'calisthenics', title: 'Calisthenics Guide', keywords: 'calisthenics bodyweight training pull-ups', url: '/health/calisthenics-guide.html', category: 'Fitness' },
    { id: 'yoga', title: 'Yoga Guide', keywords: 'yoga flexibility breathing asana meditation', url: '/health/yoga-guide.html', category: 'Fitness' },
    
    // TECH & LIFESTYLE
    { id: 'pomodoro', title: 'Pomodoro Timer', keywords: 'pomodoro timer productivity focus', url: '/tech/pomodoro.html', category: 'Tools' },
    { id: 'password', title: 'Password Generator', keywords: 'password generator secure strength', url: '/tech/password-gen.html', category: 'Tools' },
    { id: 'json', title: 'JSON Formatter', keywords: 'json formatter validator prettify', url: '/tech/json-formatter.html', category: 'Tools' },
    { id: 'habit', title: 'Habit Tracker', keywords: 'habit tracker accountability goals habits', url: '/lifestyle/habit-tracker.html', category: 'Lifestyle' },
    { id: 'compound', title: 'Compound Habit Guide', keywords: 'habit stacking compound habits psychology', url: '/lifestyle/compound-habits.html', category: 'Lifestyle' },
  ];

  // ═══════════════════════════════════════════════════════════════════════════
  // GLOBAL SEARCH ENGINE
  // ═══════════════════════════════════════════════════════════════════════════
  function initializeSearch() {
    const searchInput = document.getElementById('global-search');
    const searchResults = document.getElementById('search-results');
    
    if (!searchInput || !searchResults) return;

    searchInput.addEventListener('input', function(e) {
      const query = e.target.value.toLowerCase().trim();
      
      if (query.length === 0) {
        searchResults.classList.add('hidden');
        return;
      }

      const matches = SEARCH_CATALOG.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.keywords.toLowerCase().includes(query)
      );

      if (matches.length === 0) {
        searchResults.innerHTML = '<div class="p-4 text-center text-muted-foreground">No calculators found</div>';
        searchResults.classList.remove('hidden');
        return;
      }

      // Group by category
      const grouped = {};
      matches.forEach(item => {
        if (!grouped[item.category]) grouped[item.category] = [];
        grouped[item.category].push(item);
      });

      let html = '<div class="max-h-96 overflow-y-auto">';
      Object.entries(grouped).forEach(([category, items]) => {
        html += `<div class="px-3 py-2 border-b border-border"><span class="text-xs font-semibold text-muted-foreground">${category}</span></div>`;
        items.forEach(item => {
          html += `<a href="${item.url}" class="block px-4 py-3 hover:bg-muted transition-colors"><div class="font-medium text-sm">${item.title}</div></a>`;
        });
      });
      html += '</div>';

      searchResults.innerHTML = html;
      searchResults.classList.remove('hidden');
    });

    // Close search on blur
    searchInput.addEventListener('blur', () => {
      setTimeout(() => searchResults.classList.add('hidden'), 200);
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // HEADER COMPONENT
  // ═══════════════════════════════════════════════════════════════════════════
  function createHeader() {
    return `
      <nav class="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-border backdrop-blur-sm">
        <div class="container-hub max-w-7xl mx-auto px-4 md:px-6 py-4">
          <div class="flex items-center justify-between gap-6">
            
            <!-- Logo -->
            <div class="flex-shrink-0">
              ${createAdaptiveLogo()}
            </div>

            <!-- Search Bar -->
            <div class="flex-1 max-w-sm mx-auto relative">
              <div class="search-input-wrapper relative">
                <input 
                  type="text" 
                  id="global-search" 
                  class="w-full px-4 py-2 text-sm border border-border rounded-lg bg-muted text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" 
                  placeholder="Search calculators..."
                  autocomplete="off"
                >
                <svg class="h-4 w-4 absolute right-3 top-3 text-muted-foreground pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </div>
              <div id="search-results" class="absolute top-full mt-1 left-0 right-0 bg-white dark:bg-slate-800 border border-border rounded-lg shadow-lg hidden z-10"></div>
            </div>

            <!-- Categorized Dropdowns -->
            <div class="flex items-center gap-1">
              
              <!-- Finance Dropdown -->
              <div class="group relative">
                <button class="px-3 py-2 text-sm font-medium text-foreground hover:text-primary rounded-lg hover:bg-muted transition-colors">
                  Finance
                  <svg class="h-4 w-4 inline ml-1 group-hover:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
                  </svg>
                </button>
                <div class="absolute left-0 mt-0 w-56 bg-white dark:bg-slate-800 border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-3 space-y-1">
                  <a href="/finance/emi.html" class="block px-3 py-2 text-sm hover:bg-muted rounded-lg transition-colors">📊 EMI & Loan Calculator</a>
                  <a href="/finance/fire.html" class="block px-3 py-2 text-sm hover:bg-muted rounded-lg transition-colors">🔥 FIRE Engine</a>
                  <a href="/finance/ppf.html" class="block px-3 py-2 text-sm hover:bg-muted rounded-lg transition-colors">📈 PPF Calculator</a>
                  <a href="/finance/fd.html" class="block px-3 py-2 text-sm hover:bg-muted rounded-lg transition-colors">💰 Fixed Deposit</a>
                  <a href="/finance/rd.html" class="block px-3 py-2 text-sm hover:bg-muted rounded-lg transition-colors">💳 Recurring Deposit</a>
                  <a href="/finance/sip.html" class="block px-3 py-2 text-sm hover:bg-muted rounded-lg transition-colors">📑 SIP & Mutual Funds</a>
                  <a href="/finance/income-tax.html" class="block px-3 py-2 text-sm hover:bg-muted rounded-lg transition-colors">🧾 Income Tax</a>
                  <a href="/finance/" class="block px-3 py-2 text-sm text-primary font-semibold hover:bg-primary/10 rounded-lg transition-colors border-t border-border mt-2 pt-2">→ All Finance Tools</a>
                </div>
              </div>

              <!-- Fitness Dropdown -->
              <div class="group relative">
                <button class="px-3 py-2 text-sm font-medium text-foreground hover:text-primary rounded-lg hover:bg-muted transition-colors">
                  Fitness
                  <svg class="h-4 w-4 inline ml-1 group-hover:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
                  </svg>
                </button>
                <div class="absolute left-0 mt-0 w-56 bg-white dark:bg-slate-800 border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-3 space-y-1">
                  <a href="/health/bmi.html" class="block px-3 py-2 text-sm hover:bg-muted rounded-lg transition-colors">⚖️ BMI Calculator</a>
                  <a href="/health/bmr.html" class="block px-3 py-2 text-sm hover:bg-muted rounded-lg transition-colors">🔥 BMR Calculator</a>
                  <a href="/health/tdee.html" class="block px-3 py-2 text-sm hover:bg-muted rounded-lg transition-colors">💪 TDEE Calculator</a>
                  <a href="/health/macro.html" class="block px-3 py-2 text-sm hover:bg-muted rounded-lg transition-colors">🍗 Macro Calculator</a>
                  <a href="/health/gym-guide.html" class="block px-3 py-2 text-sm hover:bg-muted rounded-lg transition-colors">🏋️ Gym Training Guide</a>
                  <a href="/health/calisthenics-guide.html" class="block px-3 py-2 text-sm hover:bg-muted rounded-lg transition-colors">🤸 Calisthenics</a>
                  <a href="/health/yoga-guide.html" class="block px-3 py-2 text-sm hover:bg-muted rounded-lg transition-colors">🧘 Yoga Guide</a>
                  <a href="/health/" class="block px-3 py-2 text-sm text-primary font-semibold hover:bg-primary/10 rounded-lg transition-colors border-t border-border mt-2 pt-2">→ All Health Tools</a>
                </div>
              </div>

              <!-- Tools Dropdown -->
              <div class="group relative">
                <button class="px-3 py-2 text-sm font-medium text-foreground hover:text-primary rounded-lg hover:bg-muted transition-colors">
                  Tools
                  <svg class="h-4 w-4 inline ml-1 group-hover:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
                  </svg>
                </button>
                <div class="absolute left-0 mt-0 w-56 bg-white dark:bg-slate-800 border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-3 space-y-1">
                  <a href="/tech/pomodoro.html" class="block px-3 py-2 text-sm hover:bg-muted rounded-lg transition-colors">⏱️ Pomodoro Timer</a>
                  <a href="/tech/password-gen.html" class="block px-3 py-2 text-sm hover:bg-muted rounded-lg transition-colors">🔐 Password Generator</a>
                  <a href="/tech/json-formatter.html" class="block px-3 py-2 text-sm hover:bg-muted rounded-lg transition-colors">{ } JSON Formatter</a>
                  <a href="/lifestyle/habit-tracker.html" class="block px-3 py-2 text-sm hover:bg-muted rounded-lg transition-colors">📅 Habit Tracker</a>
                  <a href="/lifestyle/compound-habits.html" class="block px-3 py-2 text-sm hover:bg-muted rounded-lg transition-colors">🔗 Compound Habits</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    `;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // INITIALIZATION
  // ═══════════════════════════════════════════════════════════════════════════
  document.addEventListener('DOMContentLoaded', function() {
    const headerPlaceholder = document.getElementById('site-header');
    if (headerPlaceholder) {
      headerPlaceholder.innerHTML = createHeader();
      initializeSearch();
    }
  });

})(window);
