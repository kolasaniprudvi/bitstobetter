import os
import glob
import re

directories = ['finance', 'health', 'math', 'lifestyle', 'other']

# First, handle the calculators
for category in directories:
    for filepath in glob.glob(f'{category}/*.html'):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Extract title
        title_match = re.search(r'<title>(.*?)</title>', content)
        if not title_match:
            continue
        title = title_match.group(1).replace('"', '&quot;')
        
        # Determine canonical URL
        url_match = re.search(r'<link rel="canonical" href="(.*?)"', content)
        if url_match:
            url = url_match.group(1)
        else:
            url = f'https://bitstobetter.com/{filepath.replace(chr(92), "/")}'
            
        # Find first meaningful paragraph for description
        paragraphs = re.findall(r'<p[^>]*>(.*?)</p>', content, re.DOTALL)
        dynamic_desc = "Free, browser-based calculator from BitsToBetter."
        for p in paragraphs:
            # Strip html tags
            clean_p = re.sub(r'<[^>]+>', '', p).strip()
            # Replace whitespace with single space
            clean_p = re.sub(r'\s+', ' ', clean_p)
            if len(clean_p) > 40:
                dynamic_desc = clean_p
                break
                
        # Truncate to ~155 chars
        if len(dynamic_desc) > 155:
            dynamic_desc = dynamic_desc[:152].rsplit(' ', 1)[0] + '...'
            
        dynamic_desc = dynamic_desc.replace('"', '&quot;')
        
        # Remove old description
        content = re.sub(r'<meta name="description" content=".*?"\s*/?>\n?', '', content)
        # Remove old og/twitter tags just in case
        content = re.sub(r'<meta property="og:.*?".*?>\n?', '', content)
        content = re.sub(r'<meta name="twitter:.*?".*?>\n?', '', content)
        
        # Create new block
        seo_block = f'''<meta name="description" content="{dynamic_desc}" />
  <meta property="og:title" content="{title}" />
  <meta property="og:description" content="{dynamic_desc}" />
  <meta property="og:url" content="{url}" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="https://bitstobetter.com/assets/logo.png" />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="{title}" />
  <meta name="twitter:description" content="{dynamic_desc}" />
  <meta name="twitter:image" content="https://bitstobetter.com/assets/logo.png" />'''
        
        # Inject right after title
        content = re.sub(r'(<title>.*?</title>)', r'\1\n  ' + seo_block, content)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

# Handle index.html
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

title_match = re.search(r'<title>(.*?)</title>', content)
if title_match:
    title = title_match.group(1).replace('"', '&quot;')
    url = "https://bitstobetter.com/"
    dynamic_desc = "Free educational calculators and guides for finance, health, and utilities. Understand the math behind EMI, FIRE, BMI, and more with our Hub & Spoke guides."
    
    content = re.sub(r'<meta name="description" content=".*?"\s*/?>\n?', '', content)
    content = re.sub(r'<meta property="og:.*?".*?>\n?', '', content)
    content = re.sub(r'<meta name="twitter:.*?".*?>\n?', '', content)
    
    seo_block = f'''<meta name="description" content="{dynamic_desc}" />
  <meta property="og:title" content="{title}" />
  <meta property="og:description" content="{dynamic_desc}" />
  <meta property="og:url" content="{url}" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="https://bitstobetter.com/assets/logo.png" />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="{title}" />
  <meta name="twitter:description" content="{dynamic_desc}" />
  <meta name="twitter:image" content="https://bitstobetter.com/assets/logo.png" />'''

    content = re.sub(r'(<title>.*?</title>)', r'\1\n  ' + seo_block, content)
    
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)

print('SEO metadata successfully injected into all files.')
