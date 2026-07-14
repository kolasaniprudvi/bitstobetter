import glob
import os
import re

calc_engine = r'c:\Users\kolas\MyDirectory\Source Control\bitstobetter\assets\calc-engine.js'
with open(calc_engine, 'r', encoding='utf-8') as f:
    text = f.read()

keys = set(re.findall(r'^\s+([a-zA-Z0-9_-]+):\s*\{', text, re.MULTILINE))

html_dir = r'c:\Users\kolas\MyDirectory\Source Control\bitstobetter'
missing = []
for root, _, files in os.walk(html_dir):
    for file in files:
        if file.endswith('.html'):
            path = os.path.join(root, file)
            try:
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    m = re.search(r'data-calc="([a-zA-Z0-9_-]+)"', content)
                    if m:
                        key = m.group(1)
                        if key not in keys:
                            missing.append((path, key))
            except:
                pass

for path, key in missing:
    print(f'File: {os.path.basename(path)} has missing data-calc: {key}')
