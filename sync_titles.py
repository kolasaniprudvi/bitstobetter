import os
import glob
import re

with open(r'c:\Users\kolas\MyDirectory\Source Control\bitstobetter\assets\site.js', 'r', encoding='utf-8') as f:
    site_js = f.read()

matches = re.findall(r'\[\'(/[a-z]+/[a-z0-9-]+\.html)\', \'(.*?)\'\]', site_js)
url_to_title = {}
for m in matches:
    if m[0] not in url_to_title:
        url_to_title[m[0]] = m[1] # Keep first match (Desktop nav, usually more verbose/better)

directories = ['finance', 'health', 'math', 'lifestyle', 'other']
updated_count = 0

for category in directories:
    for filepath in glob.glob(f'{category}/*.html'):
        url = f'/{filepath.replace(chr(92), "/")}'
        
        if url in url_to_title:
            canonical_title = url_to_title[url]
            # Ensure " Calculator" is included if the tool is a calculator, just to be safe. 
            # Actually, the desktop nav is already very good (e.g. "EMI Calculator", "Mortgage Calculator").
            
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
                
            content = re.sub(r'<title>.*?</title>', f'<title>{canonical_title} — BitsToBetter</title>', content, flags=re.DOTALL)
            content = re.sub(r'<h1([^>]*)>.*?</h1>', f'<h1\\1>{canonical_title}</h1>', content, flags=re.DOTALL)
            content = re.sub(r'<span class="text-foreground font-medium">.*?</span>', f'<span class="text-foreground font-medium">{canonical_title}</span>', content)
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            updated_count += 1
            
print(f'Synchronized titles across {updated_count} files.')
