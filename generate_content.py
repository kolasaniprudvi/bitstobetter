import os
import re

content_template = """    <article class="article-prose mt-12 max-w-3xl">
      <h2 class="text-2xl font-bold mb-4">Understanding the {title}</h2>
      <p>This calculator helps you understand and plan your finances effectively. By inputting your specific variables, you can accurately model different scenarios and make informed decisions.</p>
      
      <h3 class="text-xl font-bold mt-6 mb-3">How It Works</h3>
      <p>Simply enter your numbers into the fields above. The engine automatically processes standard mathematical formulas to compute the results instantly without page reloads or server delays.</p>
      
      <h3 class="text-xl font-bold mt-6 mb-3">Why Use This?</h3>
      <ul>
        <li><strong>Accuracy:</strong> Uses industry-standard formulas.</li>
        <li><strong>Privacy:</strong> 100% browser-based. Your data never leaves your device.</li>
        <li><strong>Speed:</strong> Instant feedback as you adjust the sliders or inputs.</li>
      </ul>
    </article>"""

html_dirs = [
    r'c:\Users\kolas\MyDirectory\Source Control\bitstobetter\finance',
    r'c:\Users\kolas\MyDirectory\Source Control\bitstobetter\math',
    r'c:\Users\kolas\MyDirectory\Source Control\bitstobetter\health',
    r'c:\Users\kolas\MyDirectory\Source Control\bitstobetter\lifestyle',
    r'c:\Users\kolas\MyDirectory\Source Control\bitstobetter\other'
]

for html_dir in html_dirs:
    if not os.path.exists(html_dir): continue
    for file in os.listdir(html_dir):
        if file.endswith('.html') and 'index' not in file:
            path = os.path.join(html_dir, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Check if it lacks <article> or <h2>
            has_article = '<article' in content or '<h2' in content
            if not has_article:
                # Extract title
                title_match = re.search(r'<title>(.*?)( — BitsToBetter| Calculator.*)</title>', content)
                title = title_match.group(1).strip() if title_match else file.replace('.html', '').replace('-', ' ').title()
                
                article_html = content_template.format(title=title)
                
                # Insert article before </main>
                content = content.replace('</main>', article_html + '\n  </main>')
                
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f'Added article to {file}')
