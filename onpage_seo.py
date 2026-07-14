import glob
import re

files_to_check = ['index.html', 'finance/emi.html', 'health/bmi.html', 'math/scientific.html']

for file in files_to_check:
    print(f'--- {file} ---')
    try:
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(e)
        continue
        
    # Headers
    h1s = re.findall(r'<h1[^>]*>(.*?)</h1>', content, re.DOTALL)
    print(f'H1 Count: {len(h1s)}')
    if h1s:
        clean_h1 = re.sub(r'<[^>]+>', '', h1s[0]).strip()
        print(f'  H1: {clean_h1}')
        
    h2s = re.findall(r'<h2[^>]*>(.*?)</h2>', content, re.DOTALL)
    print(f'H2 Count: {len(h2s)}')
    for i, h2 in enumerate(h2s[:3]):
        clean_h2 = re.sub(r'<[^>]+>', '', h2).strip()
        print(f'  H2: {clean_h2}')
        
    # Images and Alts
    imgs = re.findall(r'<img([^>]*)>', content)
    missing_alt = 0
    for img in imgs:
        if 'alt=' not in img:
            missing_alt += 1
    print(f'Images: {len(imgs)}, Missing Alt: {missing_alt}')
    
    # Word Count (rough approximation)
    text_blocks = re.findall(r'<(?:p|h[1-6]|li)[^>]*>(.*?)</(?:p|h[1-6]|li)>', content, re.DOTALL)
    all_text = ' '.join(text_blocks)
    clean_text = re.sub(r'<[^>]+>', ' ', all_text)
    words = len(clean_text.split())
    print(f'Approximate Word Count: {words}')
    print()
