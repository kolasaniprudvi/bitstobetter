import os
import glob
from datetime import datetime

directories = ['finance', 'health', 'math', 'lifestyle', 'other']

urls = []
# Add root
urls.append(f'''  <url>
    <loc>https://bitstobetter.com/</loc>
    <lastmod>{datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ')}</lastmod>
    <priority>1.0</priority>
  </url>''')

for category in directories:
    for filepath in glob.glob(f'{category}/*.html'):
        url_path = filepath.replace(chr(92), "/")
        loc = f"https://bitstobetter.com/{url_path}"
        
        urls.append(f'''  <url>
    <loc>{loc}</loc>
    <lastmod>{datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ')}</lastmod>
    <priority>0.8</priority>
  </url>''')

xml_content = f'''<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
{chr(10).join(urls)}
</urlset>'''

with open('sitemap.xml', 'w', encoding='utf-8') as f:
    f.write(xml_content)

print(f'sitemap.xml generated with {len(urls)} URLs.')
