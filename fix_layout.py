import os
import re

def reorder_html(content):
    # Find the calc-root
    calc_match = re.search(r'\s*<div id="calc-root"></div>', content)
    
    if not calc_match:
        return content

    calc_html = calc_match.group(0)
    
    # Remove calc from its current location
    content = content.replace(calc_html, '')
    
    # Find the end of the <p> description after <h1>
    # Description is usually the <p> with max-w-3xl or just the first <p> after <h1>
    desc_match = re.search(r'</h1>\s*<p[^>]*>.*?</p>', content, flags=re.DOTALL)
    if desc_match:
        insert_pos = desc_match.end()
        content = content[:insert_pos] + '\n' + calc_html + content[insert_pos:]
    else:
        # Fallback to after h1
        h1_match = re.search(r'</h1>', content)
        if h1_match:
            insert_pos = h1_match.end()
            content = content[:insert_pos] + '\n' + calc_html + content[insert_pos:]
            
    return content

html_dirs = [
    r'c:\Users\kolas\MyDirectory\Source Control\bitstobetter\finance',
    r'c:\Users\kolas\MyDirectory\Source Control\bitstobetter\math',
    r'c:\Users\kolas\MyDirectory\Source Control\bitstobetter\health',
    r'c:\Users\kolas\MyDirectory\Source Control\bitstobetter\lifestyle',
    r'c:\Users\kolas\MyDirectory\Source Control\bitstobetter\other'
]

for html_dir in html_dirs:
    if not os.path.exists(html_dir): continue
    for file in os.listdir(html_dir):
        if file.endswith('.html'):
            path = os.path.join(html_dir, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content = reorder_html(content)
            if new_content != content:
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f'Reordered {file}')
