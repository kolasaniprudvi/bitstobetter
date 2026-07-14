/**
 * BitsToBetter shared chrome — categorized dropdowns + hover-stable menus
 */
(function (global) {
  'use strict';

  const CHEV =
    '<svg class="h-4 w-4 dd-chev" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>';

  function brand() {
    return (
      '<a href="/" class="brand-link">' +
      '<img src="/assets/logo.png" alt="" width="32" height="32" class="brand-logo" decoding="async" />' +
      '<span>BitsToBetter</span>' +
      '</a>'
    );
  }

  function linkList(items) {
    return items
      .map(function (it) {
        return '<li><a href="' + it[0] + '">' + it[1] + '</a></li>';
      })
      .join('');
  }

  /** Wide scrollable dropdown for a calculator category */
  function categoryDD(title, id, columns) {
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
  }

  function financeMenu() {
    return categoryDD('Financial', 'finance', [
      {
        heading: 'Loans & payments',
        links: [
          ['/finance/mortgage.html', 'Mortgage Calculator'],
          ['/finance/loan.html', 'Loan Calculator'],
          ['/finance/auto-loan.html', 'Auto Loan Calculator'],
          ['/finance/payment.html', 'Payment Calculator'],
          ['/finance/amortization.html', 'Amortization Calculator'],
          ['/finance/emi.html', 'EMI Calculator'],
          ['/finance/loan-prepayment.html', 'Loan Pre-payment'],
          ['/finance/home-loan-eligibility.html', 'Home Loan Eligibility']
        ]
      },
      {
        heading: 'Interest & investing',
        links: [
          ['/finance/interest.html', 'Interest Calculator'],
          ['/finance/interest-rate.html', 'Interest Rate Calculator'],
          ['/finance/inflation.html', 'Inflation Calculator'],
          ['/finance/fire.html', 'FIRE Engine'],
          ['/finance/sip.html', 'SIP Calculator'],
          ['/finance/step-up-sip.html', 'Step-Up SIP'],
          ['/finance/lumpsum.html', 'Lumpsum Calculator'],
          ['/finance/swp.html', 'SWP Calculator'],
          ['/finance/cagr.html', 'CAGR Calculator'],
          ['/finance/compounding.html', 'Compounding Calculator'],
          ['/finance/goal-sip.html', 'Goal SIP']
        ]
      },
      {
        heading: 'Tax & income',
        links: [
          ['/finance/income-tax.html', 'Income Tax Calculator'],
          ['/finance/salary.html', 'Salary Calculator'],
          ['/finance/gst.html', 'GST Calculator'],
          ['/finance/hra.html', 'HRA Exemption'],
          ['/finance/gratuity.html', 'Gratuity Calculator'],
          ['/finance/new-regime.html', 'New Tax Regime'],
          ['/finance/old-vs-new.html', 'Old vs New Regime']
        ]
      },
      {
        heading: 'Govt schemes',
        links: [
          ['/finance/ppf.html', 'PPF Calculator'],
          ['/finance/fd.html', 'FD Calculator'],
          ['/finance/rd.html', 'RD Calculator'],
          ['/finance/nps.html', 'NPS Calculator'],
          ['/finance/epf.html', 'EPF Calculator'],
          ['/finance/nsc.html', 'NSC Calculator'],
          ['/finance/', 'All financial tools →']
        ]
      }
    ]);
  }

  function healthMenu() {
    return categoryDD('Fitness & Health', 'health', [
      {
        heading: 'Body metrics',
        links: [
          ['/health/bmi.html', 'BMI Calculator'],
          ['/health/body-fat.html', 'Body Fat Calculator'],
          ['/health/bmr.html', 'BMR Calculator'],
          ['/health/ideal-weight.html', 'Ideal Weight Calculator'],
          ['/health/calorie.html', 'Calorie Calculator']
        ]
      },
      {
        heading: 'Activity & pregnancy',
        links: [
          ['/health/pace.html', 'Pace Calculator'],
          ['/health/pregnancy.html', 'Pregnancy Calculator'],
          ['/health/pregnancy-conception.html', 'Pregnancy Conception'],
          ['/health/due-date.html', 'Due Date Calculator'],
          ['/health/', 'All health tools →']
        ]
      }
    ]);
  }

  function mathMenu() {
    return categoryDD('Math', 'math', [
      {
        heading: 'Core math',
        links: [
          ['/math/scientific.html', 'Scientific Calculator'],
          ['/math/fraction.html', 'Fraction Calculator'],
          ['/math/percentage.html', 'Percentage Calculator'],
          ['/math/standard-deviation.html', 'Standard Deviation']
        ]
      },
      {
        heading: 'Extras',
        links: [
          ['/math/triangle.html', 'Triangle Calculator'],
          ['/math/random-number.html', 'Random Number Generator'],
          ['/math/', 'All math tools →']
        ]
      }
    ]);
  }

  function otherMenu() {
    return categoryDD('Other', 'other', [
      {
        heading: 'Time & age',
        links: [
          ['/other/age.html', 'Age Calculator'],
          ['/other/date.html', 'Date Calculator'],
          ['/other/time.html', 'Time Calculator'],
          ['/other/hours.html', 'Hours Calculator']
        ]
      },
      {
        heading: 'School & utilities',
        links: [
          ['/other/gpa.html', 'GPA Calculator'],
          ['/other/grade.html', 'Grade Calculator'],
          ['/other/concrete.html', 'Concrete Calculator'],
          ['/other/subnet.html', 'Subnet Calculator'],
          ['/other/password.html', 'Password Generator'],
          ['/other/conversion.html', 'Conversion Calculator'],
          ['/other/', 'All other tools →']
        ]
      }
    ]);
  }

  function mountHeader() {
    const root = document.getElementById('site-header');
    if (!root) return;
    root.className = 'site-header no-print';
    root.setAttribute('role', 'banner');
    const path = location.pathname.replace(/\\/g, '/');

    function active(seg) {
      return path.indexOf('/' + seg) !== -1 ? ' is-active' : '';
    }

    root.innerHTML =
      '<div class="container-hub h-16 flex items-center justify-between gap-4">' +
      brand() +
      '<nav class="hidden lg:flex items-center gap-6" aria-label="Primary">' +
      '<a href="/" class="nav-link' +
      (path === '/' || /\/index\.html$/.test(path) && path.split('/').length <= 2 ? ' is-active' : '') +
      '">Home</a>' +
      financeMenu() +
      healthMenu() +
      mathMenu() +
      otherMenu() +
      '<a href="/about.html" class="nav-link' +
      active('about') +
      '">About</a>' +
      '<a href="/contact.html" class="nav-link' +
      active('contact') +
      '">Contact</a>' +
      '</nav>' +
      '<button type="button" id="mobile-toggle" class="lg:hidden p-2 text-muted-foreground" aria-label="Open menu" aria-expanded="false">' +
      '<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>' +
      '</button></div>' +
      mobileNav();

    wireNav(root);
  }

  function mobileNav() {
    function block(title, links) {
      return (
        '<details class="mobile-acc">' +
        '<summary class="mobile-acc-sum">' +
        title +
        '</summary>' +
        '<div class="mobile-acc-body">' +
        links
          .map(function (l) {
            return '<a href="' + l[0] + '">' + l[1] + '</a>';
          })
          .join('') +
        '</div></details>'
      );
    }
    return (
      '<div id="mobile-nav" class="lg:hidden hidden border-t border-border bg-background max-h-[calc(100vh-4rem)] overflow-y-auto w-full">' +
      '<div class="flex flex-col p-4 gap-1">' +
      '<a href="/" class="nav-link py-2">Home</a>' +
      block('Financial Calculators', [
        ['/finance/mortgage.html', 'Mortgage'],
        ['/finance/loan.html', 'Loan'],
        ['/finance/auto-loan.html', 'Auto Loan'],
        ['/finance/interest.html', 'Interest'],
        ['/finance/payment.html', 'Payment'],
        ['/finance/amortization.html', 'Amortization'],
        ['/finance/inflation.html', 'Inflation'],
        ['/finance/income-tax.html', 'Income Tax'],
        ['/finance/salary.html', 'Salary'],
        ['/finance/interest-rate.html', 'Interest Rate'],
        ['/finance/emi.html', 'EMI'],
        ['/finance/fire.html', 'FIRE'],
        ['/finance/sip.html', 'SIP'],
        ['/finance/step-up-sip.html', 'Step-Up SIP'],
        ['/finance/lumpsum.html', 'Lumpsum'],
        ['/finance/swp.html', 'SWP'],
        ['/finance/cagr.html', 'CAGR'],
        ['/finance/compounding.html', 'Compounding'],
        ['/finance/goal-sip.html', 'Goal SIP'],
        ['/finance/gst.html', 'GST'],
        ['/finance/hra.html', 'HRA Exemption'],
        ['/finance/gratuity.html', 'Gratuity'],
        ['/finance/new-regime.html', 'New Tax Regime'],
        ['/finance/old-vs-new.html', 'Old vs New Regime'],
        ['/finance/loan-prepayment.html', 'Loan Pre-payment'],
        ['/finance/home-loan-eligibility.html', 'Home Loan Eligibility'],
        ['/finance/nps.html', 'NPS'],
        ['/finance/epf.html', 'EPF'],
        ['/finance/nsc.html', 'NSC']
      ]) +
      block('Fitness & Health', [
        ['/health/bmi.html', 'BMI'],
        ['/health/calorie.html', 'Calorie'],
        ['/health/body-fat.html', 'Body Fat'],
        ['/health/bmr.html', 'BMR'],
        ['/health/ideal-weight.html', 'Ideal Weight'],
        ['/health/pace.html', 'Pace'],
        ['/health/pregnancy.html', 'Pregnancy'],
        ['/health/pregnancy-conception.html', 'Conception'],
        ['/health/due-date.html', 'Due Date']
      ]) +
      block('Math', [
        ['/math/scientific.html', 'Scientific'],
        ['/math/fraction.html', 'Fraction'],
        ['/math/percentage.html', 'Percentage'],
        ['/math/random-number.html', 'Random Number'],
        ['/math/triangle.html', 'Triangle'],
        ['/math/standard-deviation.html', 'Standard Deviation']
      ]) +
      block('Other', [
        ['/other/age.html', 'Age'],
        ['/other/date.html', 'Date'],
        ['/other/time.html', 'Time'],
        ['/other/hours.html', 'Hours'],
        ['/other/gpa.html', 'GPA'],
        ['/other/grade.html', 'Grade'],
        ['/other/concrete.html', 'Concrete'],
        ['/other/subnet.html', 'Subnet'],
        ['/other/password.html', 'Password'],
        ['/other/conversion.html', 'Conversion']
      ]) +
      '<a href="/about.html" class="nav-link py-2">About</a>' +
      '<a href="/contact.html" class="nav-link py-2">Contact</a>' +
      '</div></div>'
    );
  }

  function wireNav(root) {
    const toggle = root.querySelector('#mobile-toggle');
    const mobile = root.querySelector('#mobile-nav');
    if (toggle && mobile) {
      toggle.addEventListener('click', function () {
        const open = mobile.classList.toggle('hidden') === false;
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    }

    // Hover-stable dropdowns with delay (prevents closing while moving to options)
    root.querySelectorAll('.nav-dd').forEach(function (dd) {
      let closeTimer = null;
      const btn = dd.querySelector(':scope > button');

      function open() {
        if (closeTimer) {
          clearTimeout(closeTimer);
          closeTimer = null;
        }
        root.querySelectorAll('.nav-dd.is-open').forEach(function (other) {
          if (other !== dd) closeDD(other);
        });
        dd.classList.add('is-open');
        if (btn) btn.setAttribute('aria-expanded', 'true');
      }

      function closeDD(target) {
        target.classList.remove('is-open');
        const b = target.querySelector(':scope > button');
        if (b) b.setAttribute('aria-expanded', 'false');
      }

      function scheduleClose() {
        if (closeTimer) clearTimeout(closeTimer);
        closeTimer = setTimeout(function () {
          closeDD(dd);
          closeTimer = null;
        }, 400);
      }

      dd.addEventListener('mouseenter', open);
      dd.addEventListener('mouseleave', scheduleClose);
      dd.addEventListener('focusin', open);
      dd.addEventListener('focusout', function (e) {
        if (!dd.contains(e.relatedTarget)) scheduleClose();
      });

      if (btn) {
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          if (dd.classList.contains('is-open')) {
            closeDD(dd);
          } else {
            open();
          }
        });
      }
    });

    document.addEventListener('click', function (e) {
      if (!root.contains(e.target)) {
        root.querySelectorAll('.nav-dd.is-open').forEach(function (dd) {
          dd.classList.remove('is-open');
        });
      }
    });
  }

  function mountFooter() {
    const root = document.getElementById('site-footer');
    if (!root) return;
    root.className = 'site-footer no-print';
    root.setAttribute('role', 'contentinfo');
    root.innerHTML =
      '<div class="container-hub">' +
      '<div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">' +
      '<div><a href="/" class="brand-link mb-3 inline-flex"><img src="/assets/logo.png" alt="" width="32" height="32" class="brand-logo" /><span>BitsToBetter</span></a>' +
      '<p class="mt-2 text-sm">Free calculators for finance, health, math, and everyday utilities. 100% browser-based.</p></div>' +
      '<div><h3 class="font-semibold text-foreground mb-3">Categories</h3><ul class="space-y-2">' +
      '<li><a href="/finance/">Financial</a></li><li><a href="/health/">Fitness &amp; Health</a></li>' +
      '<li><a href="/math/">Math</a></li><li><a href="/other/">Other</a></li></ul></div>' +
      '<div><h3 class="font-semibold text-foreground mb-3">Company</h3><ul class="space-y-2">' +
      '<li><a href="/about.html">About</a></li><li><a href="/contact.html">Contact</a></li>' +
      '<li><a href="/privacy.html">Privacy</a></li><li><a href="/terms.html">Terms</a></li></ul></div>' +
      '<div><h3 class="font-semibold text-foreground mb-3">Social</h3><ul class="space-y-2">' +
      '<li><a href="https://twitter.com/bitstobetter" target="_blank" rel="noopener noreferrer">X / Twitter</a></li>' +
      '<li><a href="https://www.linkedin.com/company/bitstobetter" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>' +
      '<li><a href="https://github.com/kolasaniprudvi/bitstobetter" target="_blank" rel="noopener noreferrer">GitHub</a></li></ul></div>' +
      '</div><p class="mt-10 pt-6 border-t border-border text-xs">&copy; <span data-year></span> BitsToBetter. Educational tools only.</p></div>';
    root.querySelectorAll('[data-year]').forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  function downloadBlob(filename, mime, content) {
    const blob = content instanceof Blob ? content : new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () {
      URL.revokeObjectURL(url);
    }, 1000);
  }

  function toCSV(headers, rows) {
    const esc = function (v) {
      const s = String(v == null ? '' : v);
      if (/[",\n]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
      return s;
    };
    return [headers.map(esc).join(',')]
      .concat(
        rows.map(function (r) {
          return r.map(esc).join(',');
        })
      )
      .join('\r\n');
  }

  global.BTB = {
    mountHeader: mountHeader,
    mountFooter: mountFooter,
    downloadCSV: function (filename, headers, rows) {
      downloadBlob(filename, 'text/csv;charset=utf-8', '\uFEFF' + toCSV(headers, rows));
    },
    downloadXLSX: function (filename, sheetName, headers, rows) {
      if (typeof XLSX === 'undefined') {
        global.BTB.downloadCSV(filename.replace(/\.xlsx$/i, '.csv'), headers, rows);
        return;
      }
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([headers].concat(rows)), sheetName.slice(0, 31));
      XLSX.writeFile(wb, filename);
    },
    downloadJSON: function (filename, obj) {
      downloadBlob(filename, 'application/json', JSON.stringify(obj, null, 2));
    },
    downloadBlob: downloadBlob
  };

  document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('site-header')) mountHeader();
    mountFooter();
  });
})(window);
