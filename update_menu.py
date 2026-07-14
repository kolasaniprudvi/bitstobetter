import codecs
import re

with codecs.open(r'c:\Users\kolas\MyDirectory\Source Control\bitstobetter\assets\site.js', 'r', 'utf-8') as f:
    text = f.read()

new_categoryDD = """  function categoryDD(title, id, columns, allLink) {
    var cols = columns
      .map(function (col) {
        var links = col.links
          .map(function (link) {
            return '<a href="' + link[0] + '" class="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors">' + link[1] + '</a>';
          })
          .join('');
        return (
          '<div class="group/sub relative">' +
          '<button class="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-left rounded-md hover:bg-muted transition-colors">' +
          col.heading +
          '<svg class="h-4 w-4 -rotate-90 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>' +
          '</button>' +
          '<div class="absolute left-full top-0 ml-1 w-64 bg-card border border-border shadow-xl rounded-xl invisible opacity-0 -translate-x-2 group-hover/sub:visible group-hover/sub:opacity-100 group-hover/sub:translate-x-0 transition-all p-2 z-50">' +
          links +
          '</div>' +
          '</div>'
        );
      })
      .join('');

    return (
      '<div class="nav-dd group relative" id="dd-' + id + '">' +
      '<a href="' + allLink[0] + '" class="nav-link flex items-center gap-1 group-hover:text-primary transition-colors" aria-expanded="false" aria-controls="panel-' + id + '">' +
      title +
      '<span class="transform transition-transform group-hover:rotate-180">' + CHEV + '</span>' +
      '</a>' +
      '<div id="panel-' + id + '" class="dd-panel absolute left-0 top-full mt-2 w-64 bg-card border border-border shadow-xl rounded-xl invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all p-2 z-40">' +
      '<a href="' + allLink[0] + '" class="block px-3 py-2 mb-2 text-sm font-bold text-primary hover:bg-muted rounded-md border-b border-border transition-colors">View All ' + title + ' Tools</a>' +
      '<div class="flex flex-col gap-1">' +
      cols +
      '</div>' +
      '</div></div>'
    );
  }"""

# Replace the old function
text = re.sub(r'  function categoryDD\(title, id, columns, allLink\) \{.*?(?=  function financeMenu)', new_categoryDD + '\n\n', text, flags=re.DOTALL)

# Since we are moving to Tailwind driven hover states, we can remove the old JS hover logic
text = re.sub(r'''    const navDDs = root\.querySelectorAll\('\.nav-dd'\);.*?\}\);''', '', text, flags=re.DOTALL)
text = re.sub(r'''    document\.addEventListener\('click', function \(e\) \{.*?\}\);''', '', text, flags=re.DOTALL)

with codecs.open(r'c:\Users\kolas\MyDirectory\Source Control\bitstobetter\assets\site.js', 'w', 'utf-8') as f:
    f.write(text)
print('Updated categoryDD in site.js')
