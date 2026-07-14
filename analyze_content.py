import os

html_dir = r'c:\Users\kolas\MyDirectory\Source Control\bitstobetter\finance'
for file in os.listdir(html_dir):
    if file.endswith('.html'):
        path = os.path.join(html_dir, file)
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
            has_calc = 'id="calc-root"' in content or 'calculate-' in content
            has_article = '<article' in content or '<h2>' in content or '<h2 class' in content
            print(f'{file}: Has Calc: {has_calc}, Has Content: {has_article}')
