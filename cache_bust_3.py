import glob

directories = ['finance', 'health', 'math', 'lifestyle', 'other']
updated_count = 0

for category in directories:
    for filepath in glob.glob(f'{category}/*.html'):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        changed = False
        
        if 'v=2' in content:
            content = content.replace('v=2', 'v=3')
            changed = True
            
        if changed:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            updated_count += 1

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()
if 'v=2' in content:
    content = content.replace('v=2', 'v=3')
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    updated_count += 1

print(f'Cache-busted to v=3 in {updated_count} files.')
