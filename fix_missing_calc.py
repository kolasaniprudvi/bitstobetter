import os
import re

mapping = {
    'auto-loan.html': 'loan',
    'compound-interest.html': 'interest',
    'income-tax.html': 'finance',
    'interest-rate.html': 'payment',
    'sales-tax.html': 'finance',
    'body-fat.html': 'bmi',
    'due-date.html': 'pregnancy',
    'ideal-weight.html': 'bmi',
    'pregnancy-conception.html': 'pregnancy',
    'random-number.html': 'scientific',
    'standard-deviation.html': 'scientific'
}

html_dir = r'c:\Users\kolas\MyDirectory\Source Control\bitstobetter'
for root, _, files in os.walk(html_dir):
    for file in files:
        if file in mapping:
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            new_content = re.sub(r'data-calc="([a-zA-Z0-9_-]+)"', f'data-calc="{mapping[file]}"', content)
            if new_content != content:
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f'Fixed {file}')
