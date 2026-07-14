import os
import glob
import re

directories = ['finance', 'health', 'math', 'lifestyle', 'other']

bespoke_targets = {
    'EMI Calculator': 'EMI Calculator: Interactive Loan & Amortization Math',
    'Scientific Calculator': 'Scientific Calculator: Advanced Browser-Based Math Solver',
    'BMI Calculator': 'BMI Calculator: Body Mass Index & Health Metric Tracker',
    'Mortgage Calculator': 'Mortgage Calculator: Home Loan Repayment & Amortization Math',
    'Compound Interest Calculator': 'Compound Interest Calculator: Long-Term Growth & Investment Math',
    'Salary Calculator': 'Salary Calculator: Net Pay & Tax Deduction Estimator',
    'Password Generator': 'Password Generator: Secure, Random & Offline Key Creator'
}

category_suffixes = {
    'finance': ': Free Investment & Loan Planning Tool',
    'health': ': Free Health & Wellness Metric Tool',
    'math': ': Free Interactive Math & Equation Solver',
    'lifestyle': ': Free Daily Utility & Planning Tool',
    'other': ': Free Interactive Calculator & Guide'
}

updated_count = 0

for category in directories:
    for filepath in glob.glob(f'{category}/*.html'):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Find H1
        h1_match = re.search(r'(<h1[^>]*>)(.*?)(</h1>)', content, re.DOTALL)
        if not h1_match:
            continue
            
        h1_tag_open = h1_match.group(1)
        h1_text = h1_match.group(2).strip()
        h1_tag_close = h1_match.group(3)
        
        # Clean html from h1_text just for checking
        clean_h1 = re.sub(r'<[^>]+>', '', h1_text).strip()
        
        # Skip if it already has a colon (like FIRE Engine)
        if ':' in clean_h1:
            continue
            
        new_h1_text = h1_text
        
        # Check bespoke
        matched_bespoke = False
        for key, target in bespoke_targets.items():
            if key.lower() == clean_h1.lower():
                new_h1_text = target
                matched_bespoke = True
                break
                
        # Check category fallback
        if not matched_bespoke:
            new_h1_text = h1_text + category_suffixes.get(category, '')
            
        # Replace
        new_h1_block = f"{h1_tag_open}{new_h1_text}{h1_tag_close}"
        content = content[:h1_match.start()] + new_h1_block + content[h1_match.end():]
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        updated_count += 1

print(f'H1 headers expanded in {updated_count} files.')
