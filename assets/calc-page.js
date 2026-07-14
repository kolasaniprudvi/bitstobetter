/**
 * Renders a calculator page from data-calc attribute using BTB_CALCS
 */
(function () {
  'use strict';

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    const key = document.body.getAttribute('data-calc');
    if (!key || !window.BTB_CALCS || !BTB_CALCS.CATALOG[key]) return;
    const def = BTB_CALCS.CATALOG[key];
    const root = document.getElementById('calc-root');
    if (!root) return;

    // Default dates
    const today = new Date().toISOString().slice(0, 10);

    root.innerHTML =
      '<div class="grid lg:grid-cols-5 gap-8">' +
      '<form id="calc-form" class="lg:col-span-2 calc-panel space-y-4 no-print"></form>' +
      '<div class="lg:col-span-3 space-y-4">' +
      '<div id="calc-summary" class="calc-panel" aria-live="polite"><p class="text-muted-foreground text-sm">Enter values and calculate.</p></div>' +
      '<div id="calc-table-wrap" class="calc-panel hidden"></div>' +
      '<div class="export-bar no-print">' +
      '<button type="button" id="dl-csv" class="export-primary" disabled>CSV Report</button>' +
      '<button type="button" id="dl-json" disabled>JSON</button>' +
      '</div></div></div>';

    const form = document.getElementById('calc-form');
    def.fields.forEach(function (f) {
      const wrap = document.createElement('div');
      const label = document.createElement('label');
      label.className = 'block text-sm font-semibold';
      label.setAttribute('for', f.id);
      label.textContent = f.label;
      wrap.appendChild(label);
      let input;
      if (f.type === 'select') {
        input = document.createElement('select');
        input.className = 'field-select';
        (f.options || []).forEach(function (opt) {
          const o = document.createElement('option');
          o.value = opt[0];
          o.textContent = opt[1];
          input.appendChild(o);
        });
      } else {
        input = document.createElement('input');
        input.className = 'field-input';
        input.type = f.type || 'number';
        if (f.step) input.step = f.step;
        if (f.type === 'date' && !f.value) input.value = today;
        else if (f.value !== undefined && f.value !== '') input.value = f.value;
      }
      input.id = f.id;
      input.name = f.id;
      wrap.appendChild(input);
      form.appendChild(wrap);
    });
    const btn = document.createElement('button');
    btn.type = 'submit';
    btn.className = 'btn-primary w-full';
    btn.textContent = 'Calculate';
    form.appendChild(btn);

    let last = null;

    function gather() {
      const values = {};
      def.fields.forEach(function (f) {
        const el = document.getElementById(f.id);
        values[f.id] = el ? el.value : '';
      });
      return values;
    }

    function render(result) {
      last = { meta: { title: def.title, key: key, at: new Date().toISOString() }, values: gather(), result: result };
      const sum = document.getElementById('calc-summary');
      sum.innerHTML =
        '<h2 class="font-bold text-lg mb-3">Results</h2><dl class="space-y-2">' +
        (result.summary || [])
          .map(function (row) {
            return (
              '<div class="flex justify-between gap-4 border-b border-border pb-2">' +
              '<dt class="text-muted-foreground">' +
              row[0] +
              '</dt><dd class="font-semibold text-right break-all">' +
              row[1] +
              '</dd></div>'
            );
          })
          .join('') +
        '</dl>';

      const wrap = document.getElementById('calc-table-wrap');
      if (result.headers && result.rows && result.rows.length) {
        wrap.classList.remove('hidden');
        wrap.innerHTML =
          '<h3 class="text-xl font-bold text-slate-900 mb-4">Detailed Ledger</h3>' +
          '<div class="overflow-hidden border border-slate-200 rounded-xl shadow-sm bg-white">' +
          '<div style="max-height: 400px; overflow-y: auto;">' +
          '<table class="min-w-full divide-y divide-slate-200">' +
          '<thead class="bg-slate-50 sticky top-0 z-10 shadow-sm"><tr>' +
          result.headers
            .map(function (h) {
              return '<th class="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">' + h + '</th>';
            })
            .join('') +
          '</tr></thead><tbody class="bg-white divide-y divide-slate-100 text-sm">' +
          result.rows
            .map(function (r) {
              return (
                '<tr class="hover:bg-slate-50 transition-colors">' +
                r
                  .map(function (c) {
                    return '<td class="px-4 py-3 whitespace-nowrap text-slate-700">' + c + '</td>';
                  })
                  .join('') +
                '</tr>'
              );
            })
            .join('') +
          '</tbody></table></div></div>';
      } else {
        wrap.classList.add('hidden');
        wrap.innerHTML = '';
      }
      document.getElementById('dl-csv').disabled = false;
      document.getElementById('dl-json').disabled = false;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      try {
        render(def.compute(gather()));
      } catch (err) {
        render({ summary: [['Error', err.message || String(err)]] });
      }
    });

    document.getElementById('dl-csv').addEventListener('click', function () {
      if (!last || !window.BTB) return;
      const rows = (last.result.summary || []).map(function (r) {
        return [r[0], r[1]];
      });
      if (last.result.headers && last.result.rows) {
        rows.push([]);
        rows.push(last.result.headers);
        last.result.rows.forEach(function (r) {
          rows.push(r);
        });
      }
      BTB.downloadCSV('BitsToBetter-' + key + '.csv', ['Field', 'Value'], rows);
    });
    document.getElementById('dl-json').addEventListener('click', function () {
      if (!last || !window.BTB) return;
      BTB.downloadJSON('BitsToBetter-' + key + '.json', last);
    });

    form.requestSubmit();
  });
})();
