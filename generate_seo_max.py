import os
import glob
import re
import json

directories = ['finance', 'health', 'math', 'lifestyle', 'other']

def get_faqs_for_category(category, title):
    # Dynamic generation of FAQs based on category
    if category == 'finance':
        return [
            {"question": f"Is this {title} accurate for long-term planning?", "answer": f"Yes, this {title} uses standard financial algorithms to provide highly accurate long-term projections. However, always consult with a certified financial planner before making major investment decisions."},
            {"question": f"How can I improve my results using the {title}?", "answer": "Small, consistent adjustments to your principal or compounding frequency often yield exponentially better results over time. Use this tool to model different scenarios."},
            {"question": f"Are there hidden fees accounted for in this {title}?", "answer": "This calculator provides the pure mathematical output. You must manually account for taxes, inflation, and platform fees depending on your specific financial institution."}
        ]
    elif category == 'health':
        return [
            {"question": f"Can I use the {title} for medical diagnosis?", "answer": f"No, the {title} is strictly for educational and screening purposes. Always consult a healthcare professional or doctor for medical advice and diagnosis."},
            {"question": f"How often should I use the {title} to track progress?", "answer": "For most health metrics, checking weekly or bi-weekly provides a much more accurate trend line than daily checking, which can fluctuate due to hydration and sleep."},
            {"question": f"Does the {title} account for body composition?", "answer": "Standard formulas rely on baseline metrics. If you are a highly trained athlete or have atypical body composition, you should rely on clinical measurements rather than standard calculator outputs."}
        ]
    elif category == 'math':
        return [
            {"question": f"What formula does the {title} use?", "answer": f"The {title} utilizes standard mathematical theorems and algorithms to instantly process your variables with zero estimation error."},
            {"question": f"Can I use this {title} for academic homework?", "answer": "Yes, this tool is excellent for verifying your manual calculations, but you should always understand the underlying mechanics rather than just copying the final answer."}
        ]
    else:
        return [
            {"question": f"How accurate is the {title}?", "answer": f"The {title} is highly accurate and relies on strict algorithmic formulas to process your inputs instantly in the browser."},
            {"question": f"Is my data safe when using the {title}?", "answer": "Absolutely. This tool runs 100% locally in your web browser. None of your inputs are ever sent to a server or stored in a database."}
        ]

def generate_faq_html(faqs):
    html = '''
    <!-- FAQ Section -->
    <section class="mb-16 mt-16 max-w-4xl border-t border-slate-200 pt-12">
      <h2 class="text-3xl font-bold text-slate-900 mb-8">Frequently Asked Questions</h2>
      <div class="space-y-6">
    '''
    for faq in faqs:
        html += f'''
        <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 class="text-lg font-bold text-slate-900 mb-2">{faq["question"]}</h3>
          <p class="text-slate-700 m-0 leading-relaxed">{faq["answer"]}</p>
        </div>
        '''
    html += '''
      </div>
    </section>
    '''
    return html

def generate_json_ld(faqs):
    schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": []
    }
    for faq in faqs:
        schema["mainEntity"].append({
            "@type": "Question",
            "name": faq["question"],
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq["answer"]
            }
        })
    return f'\n  <script type="application/ld+json">\n  {json.dumps(schema, indent=2)}\n  </script>\n'

def generate_related_links(current_file, category):
    # Find all html files in the same category
    files = glob.glob(f'{category}/*.html')
    links = []
    for f in files:
        if os.path.basename(f) == os.path.basename(current_file):
            continue
        # Extract title
        with open(f, 'r', encoding='utf-8') as file:
            content = file.read()
            title_match = re.search(r'<title>(.*?)</title>', content)
            if title_match:
                title = title_match.group(1).split('—')[0].strip()
                if not title:
                    title = title_match.group(1).split('|')[0].strip()
                url = f"/{f.replace(chr(92), '/')}"
                links.append({"title": title, "url": url})
        
        # Limit to 4 related links for UI purposes
        if len(links) >= 4:
            break
            
    if not links:
        return ""
        
    html = '''
    <!-- Related Calculators Silo -->
    <section class="mb-8 mt-12 max-w-6xl border-t border-slate-200 pt-12">
      <h2 class="text-2xl font-bold text-slate-900 mb-6">Related Tools</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    '''
    for link in links:
        html += f'''
        <a href="{link['url']}" class="block bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl p-4 transition-colors group">
          <h3 class="text-slate-900 font-semibold text-sm group-hover:text-indigo-600 transition-colors">{link['title']}</h3>
          <p class="text-slate-500 text-xs mt-1">Open calculator &rarr;</p>
        </a>
        '''
    html += '''
      </div>
    </section>
    '''
    return html

updated_count = 0

for category in directories:
    for filepath in glob.glob(f'{category}/*.html'):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Extract title from h1
        title_match = re.search(r'<h1[^>]*>(.*?)</h1>', content)
        if not title_match:
            continue
            
        title = title_match.group(1).strip()
        
        faqs = get_faqs_for_category(category, title)
        faq_html = generate_faq_html(faqs)
        json_ld = generate_json_ld(faqs)
        related_html = generate_related_links(filepath, category)
        
        changed = False
        
        # Inject JSON-LD before </head> if not already there
        if 'application/ld+json">\n  {\n    "@context": "https://schema.org",\n    "@type": "FAQPage"' not in content:
            content = content.replace('</head>', f'{json_ld}</head>')
            changed = True
            
        # Inject FAQ HTML and Related Tools before closing </main>
        # We need to make sure we don't duplicate it.
        if '<!-- FAQ Section -->' not in content:
            # Find the position of </main>
            main_end = content.rfind('</main>')
            if main_end != -1:
                content = content[:main_end] + faq_html + related_html + content[main_end:]
                changed = True
                
        if changed:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            updated_count += 1

print(f"Successfully injected SEO Max optimizations into {updated_count} files.")
