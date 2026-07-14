import re

f = r'c:\Users\kolas\MyDirectory\Source Control\bitstobetter\assets\site.js'
with open(f, 'r', encoding='utf-8') as file:
    content = file.read()

# Replace categoryDD
old_cat_dd = '''  function categoryDD(title, id, columns) {
    // columns: [{ heading, links: [[href,label], ...] }, ...]
    const cols = columns
      .map(function (col) {
        return (
          '<div class="dd-col">' +
          '<h4 class="dd-col-title">' +
          col.heading +
          '</h4>' +
          '<ul class="dd-col-list">' +
          linkList(col.links) +
          '</ul></div>'
        );
      })
      .join('');

    return (
      '<div class="nav-dd" data-dd="' +
      id +
      '">' +
      '<button type="button" class="nav-link" aria-expanded="false" aria-haspopup="true">' +
      title +
      ' ' +
      CHEV +
      '</button>' +
      '<div class="dd-panel dd-panel--wide" role="menu">' +
      '<div class="dd-bridge" aria-hidden="true"></div>' +
      '<div class="dd-panel-inner">' +
      cols +
      '</div></div></div>'
    );
  }'''

new_cat_dd = '''  function categoryDD(title, id, columns, footerLink) {
    const cols = columns
      .map(function (col) {
        return (
          '<details class="dd-col group">' +
          '<summary class="dd-col-title cursor-pointer list-none flex items-center justify-between"><span>' +
          col.heading +
          '</span><svg class="w-4 h-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg></summary>' +
          '<ul class="dd-col-list mt-2">' +
          linkList(col.links) +
          '</ul></details>'
        );
      })
      .join('');

    const footer = footerLink ? '<div class="mt-4 pt-3 border-t border-slate-200 text-center"><a href="' + footerLink[0] + '" class="text-sm font-bold text-indigo-600 hover:text-indigo-800 hover:underline">' + footerLink[1] + '</a></div>' : '';

    return (
      '<div class="nav-dd" data-dd="' +
      id +
      '">' +
      '<button type="button" class="nav-link" aria-expanded="false" aria-haspopup="true">' +
      title +
      ' ' +
      CHEV +
      '</button>' +
      '<div class="dd-panel dd-panel--wide" role="menu">' +
      '<div class="dd-bridge" aria-hidden="true"></div>' +
      '<div class="dd-panel-inner">' +
      cols +
      '</div>' +
      footer +
      '</div></div>'
    );
  }'''

content = content.replace(old_cat_dd, new_cat_dd)

# Replace the menus individually
# Finance
content = content.replace(
    "          ['/finance/', 'All financial tools →']\n        ]\n      }\n    ]);",
    "        ]\n      }\n    ], ['/finance/', 'All financial tools →']);"
)

# Health
content = content.replace(
    "          ['/health/', 'All health tools →']\n        ]\n      }\n    ]);",
    "        ]\n      }\n    ], ['/health/', 'All health tools →']);"
)

# Math
content = content.replace(
    "          ['/math/', 'All math tools →']\n        ]\n      }\n    ]);",
    "        ]\n      }\n    ], ['/math/', 'All math tools →']);"
)

# Lifestyle
content = content.replace(
    "          ['/lifestyle/', 'All lifestyle tools →']\n        ]\n      }\n    ]);",
    "        ]\n      }\n    ], ['/lifestyle/', 'All lifestyle tools →']);"
)

# Other
content = content.replace(
    "          ['/other/', 'All other tools →']\n        ]\n      }\n    ]);",
    "        ]\n      }\n    ], ['/other/', 'All other tools →']);"
)

with open(f, 'w', encoding='utf-8') as file:
    file.write(content)
print("Updated site.js")
