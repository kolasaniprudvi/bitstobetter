import os
import glob
import re

directories = ['finance', 'health', 'math', 'lifestyle', 'other']

# Map of keyword regex to target URL
# Note: we use word boundaries (\b) to match whole words only.
link_targets = {
    r'\bamortization\b': '/finance/emi.html',
    r'\bEMI\b': '/finance/emi.html',
    r'\bFIRE\b': '/finance/fire.html',
    r'\bfinancial independence\b': '/finance/fire.html',
    r'\bcompound interest\b': '/finance/compound-interest.html',
    r'\bBMI\b': '/health/bmi.html',
    r'\bbody mass index\b': '/health/bmi.html',
    r'\bscientific calculator\b': '/math/scientific.html'
}

updated_count = 0

for category in directories:
    for filepath in glob.glob(f'{category}/*.html'):
        current_url = f'/{filepath.replace(chr(92), "/")}'
        
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        linked_urls = set() # Track URLs linked in this file to limit to 1 per page
        
        def p_replacer(match):
            p_content = match.group(0)
            
            # Skip if this paragraph already has a link (to be ultra-safe)
            if '<a ' in p_content.lower():
                return p_content
                
            # Try to inject links
            for pattern, url in link_targets.items():
                if url == current_url:
                    continue # Don't link to self
                if url in linked_urls:
                    continue # Already linked this URL on this page
                    
                # Search for keyword
                if re.search(pattern, p_content, re.IGNORECASE):
                    # Replace first occurrence
                    def kw_replacer(kw_match):
                        original = kw_match.group(0)
                        return f'<a href="{url}" class="text-indigo-600 font-semibold hover:underline">{original}</a>'
                    
                    p_content, num_subs = re.subn(pattern, kw_replacer, p_content, count=1, flags=re.IGNORECASE)
                    if num_subs > 0:
                        linked_urls.add(url)
                        
            return p_content

        # Replace inside <p> tags only
        new_content = re.sub(r'<p[^>]*>.*?</p>', p_replacer, content, flags=re.DOTALL)
        
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            updated_count += 1

print(f'Internal links injected in {updated_count} files.')
