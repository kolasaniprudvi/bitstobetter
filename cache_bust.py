import glob
import os

directories = ['finance', 'health', 'math', 'lifestyle', 'other']
updated_count = 0

for category in directories:
    for filepath in glob.glob(f'{category}/*.html'):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        changed = False
        
        # Cache bust site.js
        if 'src="/assets/site.js" defer' in content:
            content = content.replace('src="/assets/site.js" defer', 'src="/assets/site.js?v=3" defer')
            changed = True
            
        # Cache bust scientific-calc.js (just in case)
        if 'src="/assets/scientific-calc.js" defer' in content:
            content = content.replace('src="/assets/scientific-calc.js" defer', 'src="/assets/scientific-calc.js?v=3" defer')
            changed = True
        
        if changed:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            updated_count += 1

# Also do it for the main index.html
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()
if 'src="/assets/site.js"' in content:
    content = content.replace('src="/assets/site.js"', 'src="/assets/site.js?v=3"')
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    updated_count += 1

print(f'Cache-busted scripts in {updated_count} files.')
