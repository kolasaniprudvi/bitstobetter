import re

files = {
    'finance/lumpsum.html': ('lumpsumData', 'calculateLumpsum'),
    'finance/goal-sip.html': ('goalData', 'calculateGoal'),
    'finance/loan-prepayment.html': ('prepayData', 'calculatePrepay'),
    'finance/step-up-sip.html': ('stepupData', 'calculateStepUp'),
    'finance/swp.html': ('swpData', 'calculateSWP')
}

for filepath, (data_var, calc_func) in files.items():
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    const_match = re.search(f'const {data_var} = {{(.*?)}};\s*', content)
    if not const_match:
        print(f'Could not find const {data_var} in {filepath}')
        continue
        
    var_list = const_match.group(1)
    
    # 1. Remove the bad const declaration from outer scope
    content = content.replace(const_match.group(0), '')
    
    # 2. Add let data_var = {}; at the top of DOMContentLoaded
    dom_loaded_str = "document.addEventListener('DOMContentLoaded', function() {"
    content = content.replace(dom_loaded_str, f"{dom_loaded_str}\n      let {data_var} = {{}};")
    
    # 3. Add data_var = { ... }; at the end of calculate function
    if '// Enable export buttons' in content:
        content = content.replace('// Enable export buttons', f'{data_var} = {{{var_list}}};\n        // Enable export buttons')
    else:
        print(f'Could not find enable buttons comment in {filepath}')
            
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print(f'Fixed {filepath}')
