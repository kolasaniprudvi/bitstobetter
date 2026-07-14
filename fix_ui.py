with open(r'c:\Users\kolas\MyDirectory\Source Control\bitstobetter\assets\scientific-calc.js', 'r', encoding='utf-8') as f:
    text = f.read()

import re

sci_btn = 'h-12 sm:h-14 rounded-xl flex items-center justify-center text-lg sm:text-xl font-medium transition-all active:scale-95 select-none'
num_btn = 'bg-slate-800 text-white hover:bg-slate-700 shadow-sm border border-slate-700/50'
op_btn = 'bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 border border-indigo-500/20'
fn_btn = 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/80 text-sm sm:text-base border border-slate-700/30'

# Replace class references
text = text.replace('class="sci-btn fn-btn"', f'class="{sci_btn} {fn_btn}"')
text = text.replace('class="sci-btn num-btn"', f'class="{sci_btn} {num_btn}"')
text = text.replace('class="sci-btn op-btn"', f'class="{sci_btn} {op_btn}"')
text = text.replace('class="sci-btn ctrl-btn', f'class="{sci_btn}')
text = text.replace('class="sci-btn bg-indigo-600', f'class="{sci_btn} bg-indigo-600')

# Remove the <style> block completely
text = re.sub(r'<style type=\"text/tailwindcss\">.*?</style>', '', text, flags=re.DOTALL)

with open(r'c:\Users\kolas\MyDirectory\Source Control\bitstobetter\assets\scientific-calc.js', 'w', encoding='utf-8') as f:
    f.write(text)
print('Applied inline Tailwind classes successfully.')
