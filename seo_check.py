import glob
import re

files_to_check = ['index.html', 'finance/emi.html', 'math/scientific.html', 'health/bmi.html']

for file in files_to_check:
    print(f'--- {file} ---')
    try:
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(e)
        continue
    
    title = re.search(r'<title>(.*?)</title>', content)
    print('Title:', title.group(1) if title else 'None')
    
    desc = re.search(r'<meta name="description" content="(.*?)"', content)
    print('Description:', desc.group(1) if desc else 'None')
    
    keywords = re.search(r'<meta name="keywords" content="(.*?)"', content)
    print('Keywords:', keywords.group(1) if keywords else 'None')
    
    canonical = re.search(r'<link rel="canonical" href="(.*?)"', content)
    print('Canonical:', canonical.group(1) if canonical else 'None')
    
    h1 = re.search(r'<h1.*?>(.*?)</h1>', content, re.DOTALL)
    if h1:
        clean_h1 = re.sub(r'<[^>]+>', '', h1.group(1)).strip()
        print('H1:', clean_h1)
    else:
        print('H1: None')
    
    ld_json = re.search(r'<script type="application/ld\+json">(.*?)</script>', content, re.DOTALL)
    print('LD-JSON Schema:', 'Yes' if ld_json else 'No')
    print()
