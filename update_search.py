with open(r'c:\Users\kolas\MyDirectory\Source Control\bitstobetter\full_search_index.txt', 'r', encoding='utf-8') as f:
    search_array = f.read()

replacement = search_array + '''
      let selectedIndex = -1;
      let currentResults = [];

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
        }).slice(0, 8); // Limit to top 8 to prevent huge dropdowns
      }

      function renderResults() {
        if (currentResults.length === 0) {
          searchResults.innerHTML = '<div class="search-result-item p-2">No results found</div>';
        } else {
          searchResults.innerHTML = currentResults.map(function (item, index) {
            const isSelected = index === selectedIndex ? 'bg-indigo-50 border-l-2 border-indigo-500' : 'hover:bg-muted';
            return '<a href="' + item.url + '" class="search-result-item block p-2 transition-colors ' + isSelected + '" data-index="' + index + '">' +
                   '<span class="search-result-title font-medium">' + item.title + '</span> - ' +
                   '<span class="search-result-category text-sm text-muted-foreground">' + item.category + '</span>' +
                   '</a>';
          }).join('');
        }
        searchResults.classList.remove('hidden');
      }

      searchInput.addEventListener('input', function (e) {
        const query = e.target.value.toLowerCase().trim();
        if (query.length < 1) {
            searchResults.classList.add('hidden');
            currentResults = [];
            selectedIndex = -1;
            return;
        }
        currentResults = executeSearch(query);
        selectedIndex = -1;
        renderResults();
      });

      searchInput.addEventListener('keydown', function (e) {
        if (currentResults.length === 0) return;

        if (e.key === 'ArrowDown') {
          e.preventDefault();
          selectedIndex = (selectedIndex + 1) % currentResults.length;
          renderResults();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          selectedIndex = (selectedIndex - 1 + currentResults.length) % currentResults.length;
          renderResults();
        } else if (e.key === 'Enter') {
          e.preventDefault();
          if (selectedIndex >= 0 && selectedIndex < currentResults.length) {
            window.location.href = currentResults[selectedIndex].url;
          } else {
            window.location.href = currentResults[0].url; // default to first
          }
        }
      });
'''

import re
with open(r'c:\Users\kolas\MyDirectory\Source Control\bitstobetter\assets\site.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Replace everything from `const searchIndex = [` up to `// Close search results when clicking outside`
pattern = r'const searchIndex = \[.*?// Close search results when clicking outside'
new_text = re.sub(pattern, replacement + '\n      // Close search results when clicking outside', text, flags=re.DOTALL)

with open(r'c:\Users\kolas\MyDirectory\Source Control\bitstobetter\assets\site.js', 'w', encoding='utf-8') as f:
    f.write(new_text)

print('Updated site.js with full index and keyboard search!')
