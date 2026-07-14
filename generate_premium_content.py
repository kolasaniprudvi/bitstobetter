import os
import glob
import re
import json

# Custom content mappings for popular calculators
CUSTOM_CONTENT = {
    'Mortgage Calculator': {
        'myth_title': '"I should always get a 30-year mortgage to lower my payments."',
        'fact_text': 'While a 30-year mortgage lowers your monthly payment, you pay vastly more in interest over the life of the loan. A 15-year mortgage has higher payments but builds equity much faster and saves tens of thousands in interest.',
        'chapter1_text': 'A mortgage operates on an amortization schedule, meaning each payment is split between the principal (the amount you borrowed) and interest (the cost of borrowing). In the early years, the majority of your payment goes toward interest. Over time, as the principal decreases, more of your payment goes toward paying off the loan.',
        'chapter2_title': 'Early Payoff Strategies',
        'chapter2_text': 'Making just one extra mortgage payment per year can shave years off your loan and save you thousands in interest. Always ensure your lender applies extra payments directly to the "principal" rather than prepaying the next month\'s bill.',
        'takeaway1': 'Understand your amortization schedule.',
        'takeaway2': 'Consider bi-weekly payments to accelerate payoff.',
        'takeaway3': 'Refinance only when the break-even point makes sense.'
    },
    'EMI Calculator': {
        'myth_title': '"A lower EMI always means a better loan deal."',
        'fact_text': 'A lower EMI usually means a longer loan tenure. While it eases monthly cash flow, it dramatically increases the total interest you will pay to the bank. Focus on the total cost of the loan, not just the EMI.',
        'chapter1_text': 'Equated Monthly Installment (EMI) uses the reducing balance method. Your interest is calculated on the outstanding principal. As you pay each month, the principal drops, and the interest component of your EMI shrinks while the principal repayment component grows.',
        'chapter2_title': 'Managing Debt Traps',
        'chapter2_text': 'Never stretch your loan tenure just to get a comfortable EMI for a depreciating asset (like a car). Always aim for the shortest tenure you can comfortably afford, and try to prepay high-interest loans like personal loans as fast as possible.',
        'takeaway1': 'Total interest paid is the true cost of the loan.',
        'takeaway2': 'Pre-payments early in the tenure yield massive savings.',
        'takeaway3': 'Avoid taking long loans for depreciating assets.'
    },
    'Auto Loan Calculator': {
        'myth_title': '"I can afford the car because I can afford the monthly payment."',
        'fact_text': 'Dealerships often stretch the loan term (e.g., 72 or 84 months) to make an expensive car fit a monthly budget. This leaves you "underwater" (owing more than the car is worth) because cars depreciate rapidly.',
        'chapter1_text': 'Auto loans are amortized installment loans. Unlike mortgages, cars are depreciating assets, meaning they lose value every year. Structuring a loan correctly is crucial to avoid negative equity.',
        'chapter2_title': 'The 20/4/10 Rule for Car Buying',
        'chapter2_text': 'Financial experts recommend the 20/4/10 rule: Put down at least 20%, finance for no more than 4 years (48 months), and keep total monthly vehicle costs (loan, insurance, gas) under 10% of your gross income.',
        'takeaway1': 'Never finance a car for more than 48 to 60 months.',
        'takeaway2': 'Put down a large deposit to offset immediate depreciation.',
        'takeaway3': 'Factor in insurance and maintenance to your true cost of ownership.'
    },
    'BMI Calculator': {
        'myth_title': '"BMI is a perfect measure of my health and fitness."',
        'fact_text': 'BMI only calculates the ratio of your weight to your height. It cannot distinguish between muscle mass and fat mass. A bodybuilder with low body fat might be classified as "obese" according to BMI.',
        'chapter1_text': 'The Body Mass Index (BMI) is a simple mathematical formula developed in the 19th century to assess populations, not individuals. It is calculated as weight in kilograms divided by height in meters squared (kg/m²).',
        'chapter2_title': 'Holistic Health Metrics',
        'chapter2_text': 'While BMI is a useful screening tool for the general population, you should combine it with other metrics like waist circumference, body fat percentage, and blood panels for a true picture of metabolic health.',
        'takeaway1': 'BMI is a screening tool, not a diagnostic tool.',
        'takeaway2': 'Muscle is denser than fat, which skews BMI for athletes.',
        'takeaway3': 'Focus on metabolic markers rather than just the scale.'
    },
    'Compound Interest Calculator': {
        'myth_title': '"I can just start investing later when I make more money."',
        'fact_text': 'Time is significantly more powerful than capital when it comes to compounding. Because your returns generate their own returns, starting 10 years earlier with half the money often yields a higher final corpus than starting later with double the money.',
        'chapter1_text': 'Compound interest is the "eighth wonder of the world." It is the process where the interest you earn on your principal balance is reinvested, generating its own interest in the next period. Over long horizons, the growth curve becomes exponential rather than linear.',
        'chapter2_title': 'Maximizing Compounding Velocity',
        'chapter2_text': 'To maximize compounding velocity, you must optimize three variables: Time (start as early as possible), Rate (invest in growth assets like equities), and Frequency (compound daily or monthly instead of annually).',
        'takeaway1': 'Time in the market beats timing the market.',
        'takeaway2': 'Reinvest all dividends and interest.',
        'takeaway3': 'Higher compounding frequency accelerates wealth creation.'
    },
    'Public Provident Fund (PPF) Calculator': {
        'myth_title': '"I should just invest at the end of the financial year to save tax."',
        'fact_text': 'PPF interest is calculated on the minimum balance between the 5th and the end of each month. If you invest after the 5th, you lose interest for that entire month. Investing a lumpsum between April 1st and April 5th maximizes your annual returns.',
        'chapter1_text': 'The Public Provident Fund (PPF) is a sovereign-backed, tax-free savings vehicle in India. Because it falls under the "Exempt-Exempt-Exempt" (EEE) category, your deposits, accrued interest, and final maturity amount are entirely tax-free.',
        'chapter2_title': 'Strategic PPF Funding',
        'chapter2_text': 'Because PPF has a strict 15-year lock-in period, it should be viewed as a long-term debt allocation in your portfolio. To maximize compounding, fund the entire ₹1.5 Lakh limit in the first week of April every financial year.',
        'takeaway1': 'Always deposit before the 5th of the month.',
        'takeaway2': 'Utilize PPF as the debt-component of a balanced portfolio.',
        'takeaway3': 'You can extend the account in blocks of 5 years post-maturity.'
    }
}

def generate_html(title):
    # Determine custom content or fallback
    data = CUSTOM_CONTENT.get(title, {
        'myth_title': f'"I don\'t need to worry about the math behind {title} if I use a calculator."',
        'fact_text': f'Understanding the mechanics of {title} empowers you to make strategic adjustments. A calculator gives you the answer, but understanding the math gives you the strategy to improve your baseline.',
        'chapter1_text': f'The computations driving {title} rely on standardized algorithms to provide accurate projections. By inputting your specific variables, the engine mathematically maps out your trajectory without estimation errors.',
        'chapter2_title': f'Strategic Execution',
        'chapter2_text': f'Data without action is useless. Once you have calculated your baseline for {title}, use the insights to optimize your approach. Small adjustments to your inputs often yield exponentially better long-term results.',
        'takeaway1': f'Always double-check your initial assumptions.',
        'takeaway2': f'Small percentage changes compound significantly over time.',
        'takeaway3': f'Revisit this calculation annually to stay on track.'
    })

    return f'''
    <!-- Chapter 1: The Math -->
    <section class="mb-16 mt-12 max-w-4xl">
      <div class="flex items-center gap-3 mb-6">
        <span class="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white font-bold text-xl shadow-md">1</span>
        <h2 class="text-3xl font-bold text-slate-900 m-0">The Mechanics Behind {title}</h2>
      </div>
      
      <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div class="p-6 sm:p-8">
          <p class="text-lg text-slate-700 mb-6 leading-relaxed">
            {data["chapter1_text"]}
          </p>
          
          <!-- Myth vs Fact Box -->
          <div class="bg-indigo-50 border-l-4 border-indigo-600 p-6 my-8 rounded-r-xl shadow-sm">
            <h3 class="text-xl font-bold text-indigo-900 mt-0 mb-3 flex items-center gap-2">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Myth vs. Scientific Fact
            </h3>
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <p class="text-sm font-bold text-red-600 uppercase tracking-wider mb-1">The Myth</p>
                <p class="text-slate-700 m-0">{data["myth_title"]}</p>
              </div>
              <div>
                <p class="text-sm font-bold text-emerald-600 uppercase tracking-wider mb-1">The Scientific Fact</p>
                <p class="text-slate-700 m-0">{data["fact_text"]}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Chapter 2: Strategy -->
    <section class="mb-16 max-w-4xl">
      <div class="flex items-center gap-3 mb-6">
        <span class="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white font-bold text-xl shadow-md">2</span>
        <h2 class="text-3xl font-bold text-slate-900 m-0">{data["chapter2_title"]}</h2>
      </div>
      
      <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div class="p-6 sm:p-8">
          <p class="text-lg text-slate-700 mb-6 leading-relaxed">
            {data["chapter2_text"]}
          </p>

          <!-- Takeaway Summary -->
          <div class="bg-slate-50 border border-slate-200 rounded-xl p-6 shadow-sm">
            <h4 class="text-lg font-bold text-slate-900 mt-0 mb-3">Key Takeaways for Your Plan:</h4>
            <ul class="list-disc pl-5 m-0 space-y-2 text-slate-700">
              <li><strong>Analysis:</strong> {data["takeaway1"]}</li>
              <li><strong>Optimization:</strong> {data["takeaway2"]}</li>
              <li><strong>Execution:</strong> {data["takeaway3"]}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    '''

directories = ['finance', 'health', 'math', 'lifestyle', 'other']
updated_count = 0

for directory in directories:
    for filepath in glob.glob(f'{directory}/*.html'):
        # Skip fully custom pages that already have detailed content
        if 'fire.html' in filepath or 'sip.html' in filepath:
            continue
            
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Extract title
        title_match = re.search(r'<h1[^>]*>(.*?)</h1>', content)
        if not title_match:
            continue
            
        title = title_match.group(1).strip()
        
        # We need to replace the old <article class="article-prose mt-12 max-w-3xl">...</article>
        article_pattern = r'<article class="article-prose mt-12 max-w-3xl">.*?</article>'
        
        if re.search(article_pattern, content, flags=re.DOTALL):
            new_content = generate_html(title)
            content = re.sub(article_pattern, new_content, content, flags=re.DOTALL)
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            updated_count += 1

print(f"Successfully updated {updated_count} calculator pages with premium chapter content.")
