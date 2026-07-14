import codecs
import re

with codecs.open(r'c:\Users\kolas\MyDirectory\Source Control\bitstobetter\assets\site.js', 'r', 'utf-8') as f:
    text = f.read()

wire_nav_fixed = """
  function wireNav(root) {
    const toggle = root.querySelector('#mobile-toggle');
    const mobile = root.querySelector('#mobile-nav');
    if (toggle && mobile) {
      toggle.addEventListener('click', function () {
        const open = mobile.classList.toggle('hidden') === false;
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    }

    // Global search functionality
    const searchInput = document.getElementById('global-search');
    const searchResults = document.getElementById('search-results');
    
    if (searchInput && searchResults) {
      const searchIndex = [
        { title: 'SIP Calculator', url: '/finance/sip.html', category: 'Finance' },
        { title: 'Lumpsum Calculator', url: '/finance/lumpsum.html', category: 'Finance' },
        { title: 'Step-Up SIP Calculator', url: '/finance/step-up-sip.html', category: 'Finance' },
        { title: 'SWP Calculator', url: '/finance/swp.html', category: 'Finance' },
        { title: 'FIRE Engine', url: '/finance/fire.html', category: 'Finance' },
        { title: 'EMI Calculator', url: '/finance/emi.html', category: 'Finance' },
        { title: 'BMI Calculator', url: '/health/bmi.html', category: 'Health' },
        { title: 'BMR Calculator', url: '/health/bmr.html', category: 'Health' },
        { title: 'Calorie Calculator', url: '/health/calorie.html', category: 'Health' },
        { title: 'Pregnancy Calculator', url: '/health/pregnancy.html', category: 'Health' },
        { title: 'Scientific Calculator', url: '/math/scientific.html', category: 'Math' },
        { title: 'Percentage Calculator', url: '/math/percentage.html', category: 'Math' },
        { title: 'Fraction Calculator', url: '/math/fraction.html', category: 'Math' },
        { title: 'Pomodoro Timer', url: '/lifestyle/pomodoro.html', category: 'Lifestyle' },
        { title: 'Password Generator', url: '/lifestyle/password-generator.html', category: 'Lifestyle' },
        { title: 'JSON Formatter', url: '/lifestyle/json-formatter.html', category: 'Lifestyle' },
        { title: 'Habit Tracker', url: '/lifestyle/habit-tracker.html', category: 'Lifestyle' },
        { title: 'Posture & Biomechanics Guide', url: '/health/posture.html', category: 'Health' }
      ];

      function executeSearch(query) {
        if (query.length < 1) {
          searchResults.classList.add('hidden');
          return [];
        }
        
        const words = query.split(' ').filter(w => w.length > 0);
        return searchIndex.filter(function (item) {
          const title = item.title.toLowerCase();
          const cat = item.category.toLowerCase();
          return words.every(w => title.includes(w) || cat.includes(w));
        });
      }

      searchInput.addEventListener('input', function (e) {
        const query = e.target.value.toLowerCase().trim();
        const results = executeSearch(query);
        
        if (query.length < 1) return;

        if (results.length === 0) {
          searchResults.innerHTML = '<div class="search-result-item p-2">No results found</div>';
        } else {
          searchResults.innerHTML = results.map(function (item) {
            return '<a href="' + item.url + '" class="search-result-item block p-2 hover:bg-muted">' +
                   '<span class="search-result-title font-medium">' + item.title + '</span> - ' +
                   '<span class="search-result-category text-sm text-muted-foreground">' + item.category + '</span>' +
                   '</a>';
          }).join('');
        }

        searchResults.classList.remove('hidden');
      });

      // Close search results when clicking outside
      document.addEventListener('click', function(e) {
         if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
             searchResults.classList.add('hidden');
         }
      });
    }
  }
"""

text = re.sub(r'  function wireNav\(root\) \{.*?(?=  function mountFooter)', wire_nav_fixed + '\n', text, flags=re.DOTALL)

with codecs.open(r'c:\Users\kolas\MyDirectory\Source Control\bitstobetter\assets\site.js', 'w', 'utf-8') as f:
    f.write(text)
print('Fixed wireNav syntax error')
