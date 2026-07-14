import os
import glob
import re
import json

directories = ['finance', 'health', 'math', 'lifestyle', 'other']
search_index = []

def extract_text(html):
    # Extract text from p, h1, h2, h3, li
    texts = re.findall(r'<(?:p|h[1-3]|li|th|td)[^>]*>(.*?)</(?:p|h[1-3]|li|th|td)>', html, re.IGNORECASE | re.DOTALL)
    
    # Strip inner HTML tags
    clean_texts = [re.sub(r'<[^>]+>', ' ', t) for t in texts]
    
    # Join all text
    full_text = ' '.join(clean_texts)
    
    # Lowercase, remove punctuation, remove extra whitespace
    full_text = full_text.lower()
    full_text = re.sub(r'[^\w\s]', ' ', full_text)
    
    # Tokenize and deduplicate to save space
    words = full_text.split()
    # Filter very common short words or numbers to save space if needed
    words = [w for w in set(words) if len(w) > 2]
    
    return ' '.join(words)

for category in directories:
    for filepath in glob.glob(f'{category}/*.html'):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        title_match = re.search(r'<title>(.*?)</title>', content)
        if title_match:
            title = title_match.group(1).split('—')[0].split('|')[0].strip()
            title = title.replace("'", "\\'")
            
            url = f'/{filepath.replace(chr(92), "/")}'
            cat_label = category.capitalize()
            
            # Extract keywords
            keywords = extract_text(content)
            # Escape for JS string
            keywords = keywords.replace("'", "\\'").replace('"', '\\"')
            
            search_index.append(f"{{ title: '{title}', url: '{url}', category: '{cat_label}', keywords: '{keywords}' }}")

# Now inject into site.js
with open(r'c:\Users\kolas\MyDirectory\Source Control\bitstobetter\assets\site.js', 'r', encoding='utf-8') as f:
    site_js = f.read()

# Generate replacement string
new_array = 'const searchIndex = [\n        ' + ',\n        '.join(search_index) + '\n      ];'

# Replace existing searchIndex
pattern = r'const searchIndex = \[.*?\];'
new_site_js = re.sub(pattern, new_array, site_js, flags=re.DOTALL)

# Update executeSearch to check keywords
old_execute = r'''        const words = query.split\(' '\).filter\(w => w\.length > 0\);
        return searchIndex\.filter\(function \(item\) \{
          const title = item\.title\.toLowerCase\(\);
          const cat = item\.category\.toLowerCase\(\);
          return words\.every\(w => title\.includes\(w\) \|\| cat\.includes\(w\)\);
        \}\)\.slice\(0, 8\);'''

new_execute = '''        const words = query.split(' ').filter(w => w.length > 0);
        return searchIndex.filter(function (item) {
          const title = item.title.toLowerCase();
          const cat = item.category.toLowerCase();
          const kw = (item.keywords || '').toLowerCase();
          return words.every(w => title.includes(w) || cat.includes(w) || kw.includes(w));
        }).slice(0, 8);'''

new_site_js = re.sub(old_execute, new_execute, new_site_js)

with open(r'c:\Users\kolas\MyDirectory\Source Control\bitstobetter\assets\site.js', 'w', encoding='utf-8') as f:
    f.write(new_site_js)

print('Full-text search index injected successfully.')
