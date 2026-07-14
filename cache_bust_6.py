import glob

directories = ['finance', 'health', 'math', 'lifestyle', 'other']
updated_count = 0

for category in directories:
    for filepath in glob.glob(f'{category}/*.html'):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        changed = False
        
        if 'v=5' in content:
            content = content.replace('v=5', 'v=6')
            changed = True
            
        if changed:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            updated_count += 1

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()
if 'v=5' in content:
    content = content.replace('v=5', 'v=6')
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    updated_count += 1

print(f'Cache-busted to v=6 in {updated_count} files.')
