#!/usr/bin/env python3
"""Generate calculator HTML pages from calc-engine.js metadata."""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent if (Path(__file__).name == "generate_calcs.py") else Path(".")
eng = (ROOT / "assets" / "calc-engine.js").read_text(encoding="utf-8")

titles = {
    m.group(1): m.group(2)
    for m in re.finditer(
        r"([a-z0-9-]+):\s*\{\s*\n\s*title:\s*'([^']+)'",
        eng,
    )
}
blurbs = {
    m.group(1): m.group(2)
    for m in re.finditer(
        r"([a-z0-9-]+):\s*\{\s*\n\s*title:\s*'[^']+',\s*\n\s*category:\s*'[^']+',\s*\n\s*blurb:\s*'([^']+)'",
        eng,
    )
}

cats = {
    "finance": [
        "mortgage",
        "loan",
        "auto-loan",
        "interest",
        "payment",
        "retirement",
        "amortization",
        "investment",
        "inflation",
        "finance",
        "income-tax",
        "compound-interest",
        "salary",
        "interest-rate",
        "sales-tax",
    ],
    "health": [
        "bmi",
        "calorie",
        "body-fat",
        "bmr",
        "ideal-weight",
        "pace",
        "pregnancy",
        "pregnancy-conception",
        "due-date",
    ],
    "math": [
        "scientific",
        "fraction",
        "percentage",
        "random-number",
        "triangle",
        "standard-deviation",
    ],
    "other": [
        "age",
        "date",
        "time",
        "hours",
        "gpa",
        "grade",
        "concrete",
        "subnet",
        "password",
        "conversion",
    ],
}

catlabel = {
    "finance": "Financial Calculators",
    "health": "Fitness & Health",
    "math": "Math Calculators",
    "other": "Other Calculators",
}
appcat = {
    "finance": "FinanceApplication",
    "health": "HealthApplication",
    "math": "EducationalApplication",
    "other": "UtilitiesApplication",
}

PAGE = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#0F172A" />
  <title>{title} — BitsToBetter</title>
  <meta name="description" content="{title} on BitsToBetter. Free, private, 100% browser-based." />
  <link rel="canonical" href="https://bitstobetter.com/{folder}/{key}.html" />
  <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="/assets/site.css" />
  <script type="application/ld+json">
  {{"@context":"https://schema.org","@type":"SoftwareApplication","name":"BitsToBetter {title}","applicationCategory":"{appcat}","operatingSystem":"Web Browser","offers":{{"@type":"Offer","price":"0","priceCurrency":"USD"}},"url":"https://bitstobetter.com/{folder}/{key}.html"}}
  </script>
</head>
<body class="font-sans antialiased" data-calc="{key}">
  <header id="site-header"></header>
  <main class="container-hub max-w-6xl py-10">
    <nav class="text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
      <a href="/" class="hover:text-primary">Home</a> /
      <a href="/{folder}/" class="hover:text-primary">{catlabel}</a> /
      <span class="text-foreground font-medium">{title}</span>
    </nav>
    <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">{title}</h1>
    <p class="text-muted-foreground text-lg mb-8 max-w-3xl">{blurb}</p>
    <div id="calc-root"></div>
  </main>
  <footer id="site-footer"></footer>
  <script src="/assets/site.js" defer></script>
  <script src="/assets/calc-engine.js" defer></script>
  <script src="/assets/calc-page.js" defer></script>
</body>
</html>
"""

count = 0
for folder, keys in cats.items():
    d = ROOT / folder
    d.mkdir(exist_ok=True)
    for key in keys:
        title = titles.get(key, key.replace("-", " ").title() + " Calculator")
        blurb = blurbs.get(key, "Free browser-based calculator. Your data never leaves the device.")
        html = PAGE.format(
            title=title,
            folder=folder,
            key=key,
            catlabel=catlabel[folder],
            appcat=appcat[folder],
            blurb=blurb,
        )
        (d / f"{key}.html").write_text(html, encoding="utf-8")
        count += 1

    cards = "\n".join(
        f'      <a class="hub-card" href="/{folder}/{k}.html"><h3>{titles.get(k, k)}</h3><p>{blurbs.get(k, "")}</p></a>'
        for k in keys
    )
    if folder == "finance":
        cards += '\n      <a class="hub-card" href="/finance/emi.html"><h3>EMI Calculator (advanced)</h3><p>Full amortization, charts, PDF/Excel exports.</p></a>'
        cards += '\n      <a class="hub-card" href="/finance/fire.html"><h3>FIRE Engine (advanced)</h3><p>Inflation, SWR, allocation, protection layout.</p></a>'

    index = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#0F172A" />
  <title>{catlabel[folder]} — BitsToBetter</title>
  <link rel="canonical" href="https://bitstobetter.com/{folder}/" />
  <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="/assets/site.css" />
</head>
<body class="font-sans antialiased">
  <header id="site-header"></header>
  <main class="container-hub max-w-6xl py-12">
    <h1 class="text-3xl font-extrabold mb-2">{catlabel[folder]}</h1>
    <p class="text-muted-foreground mb-8">All tools run locally in your browser.</p>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
{cards}
    </div>
  </main>
  <footer id="site-footer"></footer>
  <script src="/assets/site.js" defer></script>
</body>
</html>
"""
    (d / "index.html").write_text(index, encoding="utf-8")

print(f"generated {count} calculator pages + hub indexes")
print(f"titles parsed: {len(titles)}, blurbs: {len(blurbs)}")
