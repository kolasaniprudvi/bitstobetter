import os
import glob
import re

directories = ['finance', 'health', 'math', 'lifestyle', 'other']
search_index = []

for category in directories:
    for filepath in glob.glob(f'{category}/*.html'):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        title_match = re.search(r'<title>(.*?)</title>', content)
        if title_match:
            title = title_match.group(1).split('—')[0].split('|')[0].strip()
            # Escape single quotes in title
            title = title.replace("'", "\\'")
            url = f'/{filepath.replace(chr(92), "/")}'
            cat_label = category.capitalize()
            search_index.append(f"{{ title: '{title}', url: '{url}', category: '{cat_label}' }}")

with open('full_search_index.txt', 'w', encoding='utf-8') as f:
    f.write('      const searchIndex = [\n        ' + ',\n        '.join(search_index) + '\n      ];\n')
print('Done!')
