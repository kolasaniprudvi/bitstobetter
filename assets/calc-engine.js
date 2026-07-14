/**
 * BitsToBetter — calculator engine (all embedded tools)
 * Each key maps to { title, category, fields, compute(values) -> { summary, rows? } }
 */
(function (global) {
  'use strict';

  const fmt = (n, d) =>
    Number.isFinite(n) ? n.toLocaleString(undefined, { maximumFractionDigits: d == null ? 2 : d, minimumFractionDigits: d == null ? 0 : d }) : '—';

  function num(v) {
    const n = parseFloat(v);
    return Number.isFinite(n) ? n : 0;
  }

  function pmt(P, annualRate, nMonths) {
    const r = annualRate / 100 / 12;
    if (nMonths <= 0) return 0;
    if (Math.abs(r) < 1e-12) return P / nMonths;
    return (P * r * Math.pow(1 + r, nMonths)) / (Math.pow(1 + r, nMonths) - 1);
  }

  function amortSchedule(P, annualRate, nMonths) {
    const r = annualRate / 100 / 12;
    const pay = pmt(P, annualRate, nMonths);
    const rows = [];
    let bal = P;
    let totI = 0;
    for (let i = 1; i <= nMonths; i++) {
      const interest = bal * r;
      let principal = pay - interest;
      let installment = pay;
      if (i === nMonths) {
        principal = bal;
        installment = principal + interest;
      }
      bal = Math.max(0, bal - principal);
      totI += interest;
      rows.push([i, installment, interest, principal, bal]);
    }
    return { pay, totI, rows };
  }

  const CATALOG = {
    /* ——— Financial ——— */
    mortgage: {
      title: 'Mortgage Calculator',
      category: 'finance',
      blurb: 'Estimate monthly mortgage payments with reducing-balance amortization.',
      fields: [
        { id: 'principal', label: 'Home loan amount', type: 'number', value: 5000000 },
        { id: 'rate', label: 'Annual interest rate (%)', type: 'number', value: 8.5, step: 0.01 },
        { id: 'years', label: 'Tenure (years)', type: 'number', value: 20 }
      ],
      compute: (v) => {
        const n = Math.round(num(v.years) * 12);
        const s = amortSchedule(num(v.principal), num(v.rate), n);
        return {
          summary: [
            ['Monthly payment', fmt(s.pay, 2)],
            ['Total interest', fmt(s.totI, 2)],
            ['Total payable', fmt(s.pay * n, 2)]
          ],
          headers: ['Month', 'Payment', 'Interest', 'Principal', 'Balance'],
          rows: s.rows.map((r) => r.map((x, i) => (i === 0 ? x : fmt(x, 2))))
        };
      }
    },
    loan: {
      title: 'Loan Calculator',
      category: 'finance',
      blurb: 'Generic EMI-style loan payment and cost summary.',
      fields: [
        { id: 'principal', label: 'Loan amount', type: 'number', value: 300000 },
        { id: 'rate', label: 'Interest rate (% p.a.)', type: 'number', value: 12, step: 0.01 },
        { id: 'months', label: 'Tenure (months)', type: 'number', value: 36 }
      ],
      compute: (v) => {
        const n = Math.round(num(v.months));
        const s = amortSchedule(num(v.principal), num(v.rate), n);
        return {
          summary: [
            ['Monthly EMI', fmt(s.pay, 2)],
            ['Total interest', fmt(s.totI, 2)],
            ['Total cost', fmt(num(v.principal) + s.totI, 2)]
          ],
          headers: ['Month', 'EMI', 'Interest', 'Principal', 'Balance'],
          rows: s.rows.map((r) => r.map((x, i) => (i === 0 ? x : fmt(x, 2))))
        };
      }
    },
    'auto-loan': {
      title: 'Auto Loan Calculator',
      category: 'finance',
      blurb: 'Car / two-wheeler financing with down payment support.',
      fields: [
        { id: 'price', label: 'Vehicle price', type: 'number', value: 1200000 },
        { id: 'down', label: 'Down payment', type: 'number', value: 200000 },
        { id: 'rate', label: 'Interest rate (% p.a.)', type: 'number', value: 9.5, step: 0.01 },
        { id: 'years', label: 'Tenure (years)', type: 'number', value: 5 }
      ],
      compute: (v) => {
        const P = Math.max(0, num(v.price) - num(v.down));
        const n = Math.round(num(v.years) * 12);
        const s = amortSchedule(P, num(v.rate), n);
        return {
          summary: [
            ['Financed amount', fmt(P, 2)],
            ['Monthly payment', fmt(s.pay, 2)],
            ['Total interest', fmt(s.totI, 2)]
          ],
          headers: ['Month', 'Payment', 'Interest', 'Principal', 'Balance'],
          rows: s.rows.slice(0, 120).map((r) => r.map((x, i) => (i === 0 ? x : fmt(x, 2))))
        };
      }
    },
    interest: {
      title: 'Interest Calculator',
      category: 'finance',
      blurb: 'Compare simple vs compound interest on a principal.',
      fields: [
        { id: 'principal', label: 'Principal', type: 'number', value: 100000 },
        { id: 'rate', label: 'Rate (% p.a.)', type: 'number', value: 7, step: 0.01 },
        { id: 'years', label: 'Years', type: 'number', value: 5 },
        {
          id: 'mode',
          label: 'Mode',
          type: 'select',
          options: [
            ['simple', 'Simple interest'],
            ['compound', 'Compound (annual)']
          ]
        }
      ],
      compute: (v) => {
        const P = num(v.principal);
        const r = num(v.rate) / 100;
        const t = num(v.years);
        let interest;
        let amount;
        if (v.mode === 'simple') {
          interest = P * r * t;
          amount = P + interest;
        } else {
          amount = P * Math.pow(1 + r, t);
          interest = amount - P;
        }
        return {
          summary: [
            ['Interest earned', fmt(interest, 2)],
            ['Maturity amount', fmt(amount, 2)]
          ]
        };
      }
    },
    payment: {
      title: 'Payment Calculator',
      category: 'finance',
      blurb: 'Solve for payment, principal, rate, or tenure (three known).',
      fields: [
        { id: 'principal', label: 'Principal (blank to solve)', type: 'number', value: 500000 },
        { id: 'rate', label: 'Annual rate % (blank to solve)', type: 'number', value: 10, step: 0.01 },
        { id: 'months', label: 'Months (blank to solve)', type: 'number', value: 24 },
        { id: 'payment', label: 'Payment (blank to solve)', type: 'number', value: '' }
      ],
      compute: (v) => {
        let P = v.principal === '' ? NaN : num(v.principal);
        let rate = v.rate === '' ? NaN : num(v.rate);
        let n = v.months === '' ? NaN : num(v.months);
        let pay = v.payment === '' ? NaN : num(v.payment);
        if (!Number.isFinite(pay) && Number.isFinite(P) && Number.isFinite(rate) && Number.isFinite(n)) {
          pay = pmt(P, rate, n);
        } else if (!Number.isFinite(P) && Number.isFinite(pay) && Number.isFinite(rate) && Number.isFinite(n)) {
          const r = rate / 100 / 12;
          P = r === 0 ? pay * n : (pay * (1 - Math.pow(1 + r, -n))) / r;
        } else if (!Number.isFinite(n) && Number.isFinite(P) && Number.isFinite(pay) && Number.isFinite(rate)) {
          const r = rate / 100 / 12;
          if (r === 0) n = P / pay;
          else n = Math.log(pay / (pay - r * P)) / Math.log(1 + r);
        }
        return {
          summary: [
            ['Principal', fmt(P, 2)],
            ['Rate % p.a.', fmt(rate, 2)],
            ['Months', fmt(n, 2)],
            ['Payment', fmt(pay, 2)]
          ]
        };
      }
    },
    retirement: {
      title: 'Retirement Calculator',
      category: 'finance',
      blurb: 'Project corpus needed and monthly savings toward retirement.',
      fields: [
        { id: 'expense', label: 'Annual expenses today', type: 'number', value: 800000 },
        { id: 'years', label: 'Years to retirement', type: 'number', value: 25 },
        { id: 'inflation', label: 'Inflation (%)', type: 'number', value: 6, step: 0.1 },
        { id: 'swr', label: 'Safe withdrawal rate (%)', type: 'number', value: 4, step: 0.1 },
        { id: 'returnRate', label: 'Expected return (% p.a.)', type: 'number', value: 11, step: 0.1 },
        { id: 'current', label: 'Current savings', type: 'number', value: 500000 }
      ],
      compute: (v) => {
        const ET = num(v.expense) * Math.pow(1 + num(v.inflation) / 100, num(v.years));
        const corpus = ET / (num(v.swr) / 100);
        const n = Math.round(num(v.years) * 12);
        const r = num(v.returnRate) / 100 / 12;
        const PV = num(v.current);
        const growth = Math.pow(1 + r, n);
        const pmtDue =
          Math.abs(r) < 1e-12
            ? Math.max(0, (corpus - PV) / n)
            : Math.max(0, ((corpus - PV * growth) * r) / ((growth - 1) * (1 + r)));
        return {
          summary: [
            ['Inflation-adjusted spend', fmt(ET, 0)],
            ['Target corpus', fmt(corpus, 0)],
            ['Monthly investment (due)', fmt(pmtDue, 2)]
          ]
        };
      }
    },
    amortization: {
      title: 'Amortization Calculator',
      category: 'finance',
      blurb: 'Full amortization ledger for any fixed-rate loan.',
      fields: [
        { id: 'principal', label: 'Principal', type: 'number', value: 1000000 },
        { id: 'rate', label: 'Rate (% p.a.)', type: 'number', value: 9, step: 0.01 },
        { id: 'years', label: 'Years', type: 'number', value: 10 }
      ],
      compute: (v) => {
        const n = Math.round(num(v.years) * 12);
        const s = amortSchedule(num(v.principal), num(v.rate), n);
        return {
          summary: [
            ['EMI', fmt(s.pay, 2)],
            ['Total interest', fmt(s.totI, 2)]
          ],
          headers: ['#', 'Payment', 'Interest', 'Principal', 'Balance'],
          rows: s.rows.map((r) => r.map((x, i) => (i === 0 ? x : fmt(x, 2))))
        };
      }
    },
    investment: {
      title: 'Investment Calculator',
      category: 'finance',
      blurb: 'Future value of lump-sum and monthly SIP contributions.',
      fields: [
        { id: 'lump', label: 'Lump sum today', type: 'number', value: 100000 },
        { id: 'sip', label: 'Monthly investment', type: 'number', value: 10000 },
        { id: 'rate', label: 'Expected return (% p.a.)', type: 'number', value: 12, step: 0.1 },
        { id: 'years', label: 'Years', type: 'number', value: 15 }
      ],
      compute: (v) => {
        const r = num(v.rate) / 100 / 12;
        const n = Math.round(num(v.years) * 12);
        const fvLump = num(v.lump) * Math.pow(1 + r, n);
        const fvSip = r === 0 ? num(v.sip) * n : num(v.sip) * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
        const invested = num(v.lump) + num(v.sip) * n;
        const total = fvLump + fvSip;
        return {
          summary: [
            ['Future value', fmt(total, 0)],
            ['Total invested', fmt(invested, 0)],
            ['Estimated gain', fmt(total - invested, 0)]
          ]
        };
      }
    },
    inflation: {
      title: 'Inflation Calculator',
      category: 'finance',
      blurb: 'Future cost of today’s money (or present value of a future amount).',
      fields: [
        { id: 'amount', label: 'Amount', type: 'number', value: 100000 },
        { id: 'rate', label: 'Inflation (% p.a.)', type: 'number', value: 6, step: 0.1 },
        { id: 'years', label: 'Years', type: 'number', value: 10 },
        {
          id: 'dir',
          label: 'Direction',
          type: 'select',
          options: [
            ['forward', 'Today → Future cost'],
            ['back', 'Future → Present value']
          ]
        }
      ],
      compute: (v) => {
        const f = Math.pow(1 + num(v.rate) / 100, num(v.years));
        const out = v.dir === 'back' ? num(v.amount) / f : num(v.amount) * f;
        return {
          summary: [
            [v.dir === 'back' ? 'Present value' : 'Future cost', fmt(out, 2)],
            ['Multiplier', fmt(f, 4)]
          ]
        };
      }
    },
    finance: {
      title: 'Finance Calculator',
      category: 'finance',
      blurb: 'Quick PMT / FV / PV helpers for planning scenarios.',
      fields: [
        {
          id: 'fn',
          label: 'Function',
          type: 'select',
          options: [
            ['pmt', 'Payment (PMT)'],
            ['fv', 'Future value (FV)'],
            ['pv', 'Present value (PV)']
          ]
        },
        { id: 'principal', label: 'Present value / Principal', type: 'number', value: 200000 },
        { id: 'pmt', label: 'Payment (for FV/PV)', type: 'number', value: 5000 },
        { id: 'rate', label: 'Annual rate %', type: 'number', value: 10, step: 0.01 },
        { id: 'years', label: 'Years', type: 'number', value: 5 }
      ],
      compute: (v) => {
        const n = Math.round(num(v.years) * 12);
        const r = num(v.rate) / 100 / 12;
        let result = 0;
        let label = 'Result';
        if (v.fn === 'pmt') {
          label = 'Monthly PMT';
          result = pmt(num(v.principal), num(v.rate), n);
        } else if (v.fn === 'fv') {
          label = 'Future value';
          const pv = num(v.principal);
          const p = num(v.pmt);
          result = pv * Math.pow(1 + r, n) + (r === 0 ? p * n : p * ((Math.pow(1 + r, n) - 1) / r));
        } else {
          label = 'Present value';
          const fv = num(v.principal);
          const p = num(v.pmt);
          result =
            r === 0
              ? fv + p * n
              : fv / Math.pow(1 + r, n) + p * ((1 - Math.pow(1 + r, -n)) / r);
        }
        return { summary: [[label, fmt(result, 2)]] };
      }
    },
    'income-tax': {
      title: 'Income Tax Calculator',
      category: 'finance',
      blurb: 'Illustrative new-regime style slab tax (FY 2026-27 educational model).',
      fields: [
        { id: 'income', label: 'Taxable income', type: 'number', value: 1200000 },
        {
          id: 'regime',
          label: 'Regime model',
          type: 'select',
          options: [
            ['new', 'New regime (illustrative)'],
            ['old', 'Old regime (flat 20% after 2.5L – illustrative)']
          ]
        }
      ],
      compute: (v) => {
        const income = num(v.income);
        let tax = 0;
        if (v.regime === 'new') {
          const slabs = [
            [400000, 0],
            [800000, 0.05],
            [1200000, 0.1],
            [1600000, 0.15],
            [2000000, 0.2],
            [2400000, 0.25],
            [Infinity, 0.3]
          ];
          let prev = 0;
          for (const [upto, rate] of slabs) {
            const band = Math.min(income, upto) - prev;
            if (band > 0) tax += band * rate;
            prev = upto;
            if (income <= upto) break;
          }
        } else {
          const taxable = Math.max(0, income - 250000);
          tax = taxable * 0.2;
        }
        const cess = tax * 0.04;
        return {
          summary: [
            ['Estimated tax', fmt(tax, 0)],
            ['Cess (4%)', fmt(cess, 0)],
            ['Total outflow', fmt(tax + cess, 0)],
            ['Effective rate %', fmt(income ? ((tax + cess) / income) * 100 : 0, 2)]
          ]
        };
      }
    },
    'compound-interest': {
      title: 'Compound Interest Calculator',
      category: 'finance',
      blurb: 'Compound interest with selectable compounding frequency.',
      fields: [
        { id: 'principal', label: 'Principal', type: 'number', value: 100000 },
        { id: 'rate', label: 'Annual rate %', type: 'number', value: 8, step: 0.01 },
        { id: 'years', label: 'Years', type: 'number', value: 5 },
        {
          id: 'freq',
          label: 'Compounding',
          type: 'select',
          options: [
            ['1', 'Annually'],
            ['2', 'Semi-annually'],
            ['4', 'Quarterly'],
            ['12', 'Monthly']
          ]
        }
      ],
      compute: (v) => {
        const n = num(v.freq);
        const amount = num(v.principal) * Math.pow(1 + num(v.rate) / 100 / n, n * num(v.years));
        return {
          summary: [
            ['Maturity amount', fmt(amount, 2)],
            ['Interest', fmt(amount - num(v.principal), 2)]
          ]
        };
      }
    },
    salary: {
      title: 'Salary Calculator',
      category: 'finance',
      blurb: 'Rough CTC → monthly in-hand estimate (illustrative deductions).',
      fields: [
        { id: 'ctc', label: 'Annual CTC', type: 'number', value: 1200000 },
        { id: 'bonus', label: 'Annual bonus (in CTC)', type: 'number', value: 100000 },
        { id: 'pf', label: 'Employee PF % of basic', type: 'number', value: 12, step: 0.1 },
        { id: 'basicPct', label: 'Basic as % of CTC', type: 'number', value: 40, step: 1 },
        { id: 'tax', label: 'Est. annual tax', type: 'number', value: 80000 }
      ],
      compute: (v) => {
        const ctc = num(v.ctc);
        const monthlyCtc = ctc / 12;
        const basic = (ctc * num(v.basicPct)) / 100 / 12;
        const pf = (basic * num(v.pf)) / 100;
        const taxMonthly = num(v.tax) / 12;
        const inHand = monthlyCtc - pf - taxMonthly - num(v.bonus) / 12;
        return {
          summary: [
            ['Monthly gross (ex-bonus spread)', fmt(monthlyCtc, 0)],
            ['Est. PF deduction', fmt(pf, 0)],
            ['Est. tax / month', fmt(taxMonthly, 0)],
            ['Est. in-hand', fmt(inHand, 0)]
          ]
        };
      }
    },
    'interest-rate': {
      title: 'Interest Rate Calculator',
      category: 'finance',
      blurb: 'Back-solve approximate APR from loan amount, payment, and tenure.',
      fields: [
        { id: 'principal', label: 'Principal', type: 'number', value: 500000 },
        { id: 'payment', label: 'Monthly payment', type: 'number', value: 16000 },
        { id: 'months', label: 'Months', type: 'number', value: 36 }
      ],
      compute: (v) => {
        const P = num(v.principal);
        const A = num(v.payment);
        const n = num(v.months);
        let lo = 0;
        let hi = 1;
        for (let i = 0; i < 60; i++) {
          const mid = (lo + hi) / 2;
          const pv = mid === 0 ? A * n : (A * (1 - Math.pow(1 + mid, -n))) / mid;
          if (pv > P) lo = mid;
          else hi = mid;
        }
        const monthly = (lo + hi) / 2;
        return {
          summary: [
            ['Approx. monthly rate %', fmt(monthly * 100, 4)],
            ['Approx. APR %', fmt(monthly * 12 * 100, 2)]
          ]
        };
      }
    },
    'sales-tax': {
      title: 'Sales Tax Calculator',
      category: 'finance',
      blurb: 'Add or extract sales tax / GST from a price.',
      fields: [
        { id: 'amount', label: 'Amount', type: 'number', value: 1000 },
        { id: 'rate', label: 'Tax rate %', type: 'number', value: 18, step: 0.01 },
        {
          id: 'mode',
          label: 'Mode',
          type: 'select',
          options: [
            ['add', 'Amount is pre-tax — add tax'],
            ['extract', 'Amount is tax-inclusive — extract']
          ]
        }
      ],
      compute: (v) => {
        const a = num(v.amount);
        const r = num(v.rate) / 100;
        if (v.mode === 'add') {
          const tax = a * r;
          return {
            summary: [
              ['Tax', fmt(tax, 2)],
              ['Total', fmt(a + tax, 2)]
            ]
          };
        }
        const net = a / (1 + r);
        return {
          summary: [
            ['Net before tax', fmt(net, 2)],
            ['Tax component', fmt(a - net, 2)]
          ]
        };
      }
    },

    /* ——— Health ——— */
    bmi: {
      title: 'BMI Calculator',
      category: 'health',
      blurb: 'Body Mass Index from height and weight.',
      fields: [
        { id: 'kg', label: 'Weight (kg)', type: 'number', value: 70, step: 0.1 },
        { id: 'cm', label: 'Height (cm)', type: 'number', value: 170, step: 0.1 }
      ],
      compute: (v) => {
        const m = num(v.cm) / 100;
        const bmi = num(v.kg) / (m * m);
        let cat = 'Obese';
        if (bmi < 18.5) cat = 'Underweight';
        else if (bmi < 25) cat = 'Normal';
        else if (bmi < 30) cat = 'Overweight';
        return {
          summary: [
            ['BMI', fmt(bmi, 1)],
            ['Category', cat]
          ]
        };
      }
    },
    calorie: {
      title: 'Calorie Calculator',
      category: 'health',
      blurb: 'Harris–Benedict BMR × activity for daily calorie needs.',
      fields: [
        {
          id: 'sex',
          label: 'Sex',
          type: 'select',
          options: [
            ['male', 'Male'],
            ['female', 'Female']
          ]
        },
        { id: 'age', label: 'Age', type: 'number', value: 30 },
        { id: 'kg', label: 'Weight (kg)', type: 'number', value: 70 },
        { id: 'cm', label: 'Height (cm)', type: 'number', value: 170 },
        {
          id: 'act',
          label: 'Activity',
          type: 'select',
          options: [
            ['1.2', 'Sedentary'],
            ['1.375', 'Light'],
            ['1.55', 'Moderate'],
            ['1.725', 'Active'],
            ['1.9', 'Very active']
          ]
        }
      ],
      compute: (v) => {
        const w = num(v.kg);
        const h = num(v.cm);
        const a = num(v.age);
        const bmr = v.sex === 'male' ? 88.362 + 13.397 * w + 4.799 * h - 5.677 * a : 447.593 + 9.247 * w + 3.098 * h - 4.33 * a;
        const tdee = bmr * num(v.act);
        return {
          summary: [
            ['BMR (kcal/day)', fmt(bmr, 0)],
            ['Maintenance calories', fmt(tdee, 0)],
            ['Mild cut (−15%)', fmt(tdee * 0.85, 0)]
          ]
        };
      }
    },
    'body-fat': {
      title: 'Body Fat Calculator',
      category: 'health',
      blurb: 'US Navy circumference method estimate.',
      fields: [
        {
          id: 'sex',
          label: 'Sex',
          type: 'select',
          options: [
            ['male', 'Male'],
            ['female', 'Female']
          ]
        },
        { id: 'height', label: 'Height (cm)', type: 'number', value: 170 },
        { id: 'neck', label: 'Neck (cm)', type: 'number', value: 38 },
        { id: 'waist', label: 'Waist (cm)', type: 'number', value: 84 },
        { id: 'hip', label: 'Hip (cm, female)', type: 'number', value: 95 }
      ],
      compute: (v) => {
        const log10 = Math.log10;
        let bf;
        if (v.sex === 'male') {
          bf = 495 / (1.0324 - 0.19077 * log10(num(v.waist) - num(v.neck)) + 0.15456 * log10(num(v.height))) - 450;
        } else {
          bf =
            495 /
              (1.29579 -
                0.35004 * log10(num(v.waist) + num(v.hip) - num(v.neck)) +
                0.221 * log10(num(v.height))) -
            450;
        }
        return { summary: [['Estimated body fat %', fmt(bf, 1)]] };
      }
    },
    bmr: {
      title: 'BMR Calculator',
      category: 'health',
      blurb: 'Basal Metabolic Rate (Mifflin–St Jeor).',
      fields: [
        {
          id: 'sex',
          label: 'Sex',
          type: 'select',
          options: [
            ['male', 'Male'],
            ['female', 'Female']
          ]
        },
        { id: 'age', label: 'Age', type: 'number', value: 30 },
        { id: 'kg', label: 'Weight (kg)', type: 'number', value: 70 },
        { id: 'cm', label: 'Height (cm)', type: 'number', value: 170 }
      ],
      compute: (v) => {
        const bmr =
          v.sex === 'male'
            ? 10 * num(v.kg) + 6.25 * num(v.cm) - 5 * num(v.age) + 5
            : 10 * num(v.kg) + 6.25 * num(v.cm) - 5 * num(v.age) - 161;
        return { summary: [['BMR (kcal/day)', fmt(bmr, 0)]] };
      }
    },
    'ideal-weight': {
      title: 'Ideal Weight Calculator',
      category: 'health',
      blurb: 'Devine formula ideal body weight estimate.',
      fields: [
        {
          id: 'sex',
          label: 'Sex',
          type: 'select',
          options: [
            ['male', 'Male'],
            ['female', 'Female']
          ]
        },
        { id: 'cm', label: 'Height (cm)', type: 'number', value: 170 }
      ],
      compute: (v) => {
        const inches = num(v.cm) / 2.54;
        const over5 = Math.max(0, inches - 60);
        const kg = v.sex === 'male' ? 50 + 2.3 * over5 : 45.5 + 2.3 * over5;
        return { summary: [['Ideal weight (kg)', fmt(kg, 1)]] };
      }
    },
    pace: {
      title: 'Pace Calculator',
      category: 'health',
      blurb: 'Running pace from distance and time.',
      fields: [
        { id: 'km', label: 'Distance (km)', type: 'number', value: 5, step: 0.1 },
        { id: 'minutes', label: 'Time (minutes)', type: 'number', value: 28, step: 0.1 }
      ],
      compute: (v) => {
        const pace = num(v.minutes) / num(v.km);
        const speed = num(v.km) / (num(v.minutes) / 60);
        const min = Math.floor(pace);
        const sec = Math.round((pace - min) * 60);
        return {
          summary: [
            ['Pace', min + ':' + String(sec).padStart(2, '0') + ' / km'],
            ['Speed km/h', fmt(speed, 2)]
          ]
        };
      }
    },
    pregnancy: {
      title: 'Pregnancy Calculator',
      category: 'health',
      blurb: 'Estimate current week from last menstrual period (LMP).',
      fields: [{ id: 'lmp', label: 'LMP date', type: 'date', value: '' }],
      compute: (v) => {
        const lmp = new Date(v.lmp);
        if (isNaN(lmp)) return { summary: [['Error', 'Enter a valid LMP date']] };
        const due = new Date(lmp.getTime());
        due.setDate(due.getDate() + 280);
        const days = Math.floor((Date.now() - lmp.getTime()) / 86400000);
        const weeks = Math.floor(days / 7);
        const rem = days % 7;
        return {
          summary: [
            ['Gestational age', weeks + ' weeks, ' + rem + ' days'],
            ['Estimated due date', due.toISOString().slice(0, 10)]
          ]
        };
      }
    },
    'pregnancy-conception': {
      title: 'Pregnancy Conception Calculator',
      category: 'health',
      blurb: 'Estimated conception window from LMP (≈ LMP + 14 days).',
      fields: [{ id: 'lmp', label: 'LMP date', type: 'date', value: '' }],
      compute: (v) => {
        const lmp = new Date(v.lmp);
        if (isNaN(lmp)) return { summary: [['Error', 'Enter a valid LMP date']] };
        const c = new Date(lmp.getTime());
        c.setDate(c.getDate() + 14);
        const w0 = new Date(c);
        w0.setDate(w0.getDate() - 3);
        const w1 = new Date(c);
        w1.setDate(w1.getDate() + 3);
        return {
          summary: [
            ['Estimated conception', c.toISOString().slice(0, 10)],
            ['Likely window', w0.toISOString().slice(0, 10) + ' → ' + w1.toISOString().slice(0, 10)]
          ]
        };
      }
    },
    'due-date': {
      title: 'Due Date Calculator',
      category: 'health',
      blurb: 'Naegele’s rule: LMP + 280 days.',
      fields: [{ id: 'lmp', label: 'LMP date', type: 'date', value: '' }],
      compute: (v) => {
        const lmp = new Date(v.lmp);
        if (isNaN(lmp)) return { summary: [['Error', 'Enter a valid LMP date']] };
        const due = new Date(lmp);
        due.setDate(due.getDate() + 280);
        return { summary: [['Estimated due date', due.toISOString().slice(0, 10)]] };
      }
    },

    /* ——— Math ——— */
    scientific: {
      title: 'Scientific Calculator',
      category: 'math',
      blurb: 'Evaluate a math expression (safe subset).',
      fields: [{ id: 'expr', label: 'Expression (e.g. sin(pi/4)*sqrt(2))', type: 'text', value: '2*(3+4)^2' }],
      compute: (v) => {
        try {
          const expr = String(v.expr || '')
            .replace(/pi/gi, 'Math.PI')
            .replace(/e(?![a-z])/gi, 'Math.E')
            .replace(/sin/gi, 'Math.sin')
            .replace(/cos/gi, 'Math.cos')
            .replace(/tan/gi, 'Math.tan')
            .replace(/sqrt/gi, 'Math.sqrt')
            .replace(/log/gi, 'Math.log10')
            .replace(/ln/gi, 'Math.log')
            .replace(/\^/g, '**');
          if (!/^[0-9+\-*/().%\sMathPIeEabsinqortlgc,*^]+$/i.test(expr.replace(/Math\./g, ''))) {
            throw new Error('Unsupported characters');
          }
          // eslint-disable-next-line no-new-func
          const val = Function('"use strict"; return (' + expr + ');')();
          return { summary: [['Result', fmt(Number(val), 8)]] };
        } catch (e) {
          return { summary: [['Error', e.message || 'Invalid expression']] };
        }
      }
    },
    fraction: {
      title: 'Fraction Calculator',
      category: 'math',
      blurb: 'Add, subtract, multiply, or divide two fractions.',
      fields: [
        { id: 'a1', label: 'Numerator A', type: 'number', value: 1 },
        { id: 'a2', label: 'Denominator A', type: 'number', value: 2 },
        { id: 'b1', label: 'Numerator B', type: 'number', value: 1 },
        { id: 'b2', label: 'Denominator B', type: 'number', value: 3 },
        {
          id: 'op',
          label: 'Operation',
          type: 'select',
          options: [
            ['+', 'Add'],
            ['-', 'Subtract'],
            ['*', 'Multiply'],
            ['/', 'Divide']
          ]
        }
      ],
      compute: (v) => {
        const gcd = (a, b) => {
          a = Math.abs(a);
          b = Math.abs(b);
          while (b) {
            const t = b;
            b = a % b;
            a = t;
          }
          return a || 1;
        };
        let n1 = num(v.a1);
        let d1 = num(v.a2);
        let n2 = num(v.b1);
        let d2 = num(v.b2);
        let n;
        let d;
        if (v.op === '+') {
          n = n1 * d2 + n2 * d1;
          d = d1 * d2;
        } else if (v.op === '-') {
          n = n1 * d2 - n2 * d1;
          d = d1 * d2;
        } else if (v.op === '*') {
          n = n1 * n2;
          d = d1 * d2;
        } else {
          n = n1 * d2;
          d = d1 * n2;
        }
        const g = gcd(n, d);
        n /= g;
        d /= g;
        return {
          summary: [
            ['Result', n + ' / ' + d],
            ['Decimal', fmt(n / d, 6)]
          ]
        };
      }
    },
    percentage: {
      title: 'Percentage Calculator',
      category: 'math',
      blurb: 'Common percentage finding operations.',
      fields: [
        {
          id: 'mode',
          label: 'Mode',
          type: 'select',
          options: [
            ['of', 'What is X% of Y?'],
            ['is', 'X is what % of Y?'],
            ['change', '% change from X to Y']
          ]
        },
        { id: 'x', label: 'X', type: 'number', value: 20 },
        { id: 'y', label: 'Y', type: 'number', value: 150 }
      ],
      compute: (v) => {
        const x = num(v.x);
        const y = num(v.y);
        if (v.mode === 'of') return { summary: [['Result', fmt((x / 100) * y, 4)]] };
        if (v.mode === 'is') return { summary: [['Result %', fmt(y ? (x / y) * 100 : 0, 4)]] };
        return { summary: [['% change', fmt(x ? ((y - x) / x) * 100 : 0, 4)]] };
      }
    },
    'random-number': {
      title: 'Random Number Generator',
      category: 'math',
      blurb: 'Generate random integers in a range.',
      fields: [
        { id: 'min', label: 'Min', type: 'number', value: 1 },
        { id: 'max', label: 'Max', type: 'number', value: 100 },
        { id: 'count', label: 'How many', type: 'number', value: 5 }
      ],
      compute: (v) => {
        const min = Math.ceil(num(v.min));
        const max = Math.floor(num(v.max));
        const count = Math.min(50, Math.max(1, Math.round(num(v.count))));
        const out = [];
        for (let i = 0; i < count; i++) out.push(Math.floor(Math.random() * (max - min + 1)) + min);
        return { summary: [['Numbers', out.join(', ')]] };
      }
    },
    triangle: {
      title: 'Triangle Calculator',
      category: 'math',
      blurb: 'Area / perimeter from three sides (Heron’s formula).',
      fields: [
        { id: 'a', label: 'Side a', type: 'number', value: 3 },
        { id: 'b', label: 'Side b', type: 'number', value: 4 },
        { id: 'c', label: 'Side c', type: 'number', value: 5 }
      ],
      compute: (v) => {
        const a = num(v.a);
        const b = num(v.b);
        const c = num(v.c);
        const p = a + b + c;
        const s = p / 2;
        const area = Math.sqrt(Math.max(0, s * (s - a) * (s - b) * (s - c)));
        return {
          summary: [
            ['Perimeter', fmt(p, 4)],
            ['Area', fmt(area, 4)]
          ]
        };
      }
    },
    'standard-deviation': {
      title: 'Standard Deviation Calculator',
      category: 'math',
      blurb: 'Population & sample standard deviation from a list.',
      fields: [{ id: 'data', label: 'Numbers (comma or space separated)', type: 'text', value: '2, 4, 4, 4, 5, 5, 7, 9' }],
      compute: (v) => {
        const arr = String(v.data)
          .split(/[\s,]+/)
          .filter(Boolean)
          .map(Number)
          .filter((n) => Number.isFinite(n));
        const n = arr.length;
        if (!n) return { summary: [['Error', 'Enter numbers']] };
        const mean = arr.reduce((a, b) => a + b, 0) / n;
        const variance = arr.reduce((a, b) => a + (b - mean) ** 2, 0) / n;
        const sample = n > 1 ? arr.reduce((a, b) => a + (b - mean) ** 2, 0) / (n - 1) : 0;
        return {
          summary: [
            ['Count', String(n)],
            ['Mean', fmt(mean, 4)],
            ['Population SD', fmt(Math.sqrt(variance), 4)],
            ['Sample SD', fmt(Math.sqrt(sample), 4)]
          ]
        };
      }
    },

    /* ——— Other ——— */
    age: {
      title: 'Age Calculator',
      category: 'other',
      blurb: 'Exact age from date of birth.',
      fields: [{ id: 'dob', label: 'Date of birth', type: 'date', value: '' }],
      compute: (v) => {
        const dob = new Date(v.dob);
        if (isNaN(dob)) return { summary: [['Error', 'Enter DOB']] };
        const now = new Date();
        let years = now.getFullYear() - dob.getFullYear();
        let months = now.getMonth() - dob.getMonth();
        let days = now.getDate() - dob.getDate();
        if (days < 0) {
          months -= 1;
          const prev = new Date(now.getFullYear(), now.getMonth(), 0);
          days += prev.getDate();
        }
        if (months < 0) {
          years -= 1;
          months += 12;
        }
        return { summary: [['Age', years + ' years, ' + months + ' months, ' + days + ' days']] };
      }
    },
    date: {
      title: 'Date Calculator',
      category: 'other',
      blurb: 'Add/subtract days from a date, or difference between two dates.',
      fields: [
        {
          id: 'mode',
          label: 'Mode',
          type: 'select',
          options: [
            ['add', 'Add/subtract days'],
            ['diff', 'Difference between dates']
          ]
        },
        { id: 'd1', label: 'Start date', type: 'date', value: '' },
        { id: 'd2', label: 'End date (diff mode)', type: 'date', value: '' },
        { id: 'days', label: 'Days to add (+/-)', type: 'number', value: 30 }
      ],
      compute: (v) => {
        const d1 = new Date(v.d1);
        if (isNaN(d1)) return { summary: [['Error', 'Enter start date']] };
        if (v.mode === 'diff') {
          const d2 = new Date(v.d2);
          if (isNaN(d2)) return { summary: [['Error', 'Enter end date']] };
          const days = Math.round((d2 - d1) / 86400000);
          return { summary: [['Difference (days)', String(days)]] };
        }
        const out = new Date(d1);
        out.setDate(out.getDate() + Math.round(num(v.days)));
        return { summary: [['Result date', out.toISOString().slice(0, 10)]] };
      }
    },
    time: {
      title: 'Time Calculator',
      category: 'other',
      blurb: 'Add two durations (hh:mm:ss style inputs as hours/minutes/seconds).',
      fields: [
        { id: 'h1', label: 'Hours A', type: 'number', value: 1 },
        { id: 'm1', label: 'Minutes A', type: 'number', value: 45 },
        { id: 's1', label: 'Seconds A', type: 'number', value: 0 },
        { id: 'h2', label: 'Hours B', type: 'number', value: 2 },
        { id: 'm2', label: 'Minutes B', type: 'number', value: 20 },
        { id: 's2', label: 'Seconds B', type: 'number', value: 30 }
      ],
      compute: (v) => {
        let total =
          (num(v.h1) + num(v.h2)) * 3600 + (num(v.m1) + num(v.m2)) * 60 + num(v.s1) + num(v.s2);
        const h = Math.floor(total / 3600);
        total %= 3600;
        const m = Math.floor(total / 60);
        const s = total % 60;
        return { summary: [['Sum', h + 'h ' + m + 'm ' + s + 's']] };
      }
    },
    hours: {
      title: 'Hours Calculator',
      category: 'other',
      blurb: 'Worked hours between two clock times (24h).',
      fields: [
        { id: 'start', label: 'Start (HH:MM)', type: 'text', value: '09:00' },
        { id: 'end', label: 'End (HH:MM)', type: 'text', value: '17:30' },
        { id: 'break', label: 'Break minutes', type: 'number', value: 30 }
      ],
      compute: (v) => {
        const parse = (t) => {
          const p = String(t).split(':');
          return num(p[0]) * 60 + num(p[1] || 0);
        };
        let mins = parse(v.end) - parse(v.start) - num(v.break);
        if (mins < 0) mins += 24 * 60;
        return {
          summary: [
            ['Minutes', String(mins)],
            ['Hours', fmt(mins / 60, 2)]
          ]
        };
      }
    },
    gpa: {
      title: 'GPA Calculator',
      category: 'other',
      blurb: 'Weighted GPA from grade points and credit hours.',
      fields: [
        { id: 'rows', label: 'Entries as grade,credits;grade,credits', type: 'text', value: '4,3;3.7,4;3.3,3' }
      ],
      compute: (v) => {
        const parts = String(v.rows)
          .split(';')
          .map((s) => s.trim())
          .filter(Boolean);
        let points = 0;
        let credits = 0;
        parts.forEach((p) => {
          const [g, c] = p.split(',').map(Number);
          if (Number.isFinite(g) && Number.isFinite(c)) {
            points += g * c;
            credits += c;
          }
        });
        return {
          summary: [
            ['Credits', fmt(credits, 1)],
            ['GPA', fmt(credits ? points / credits : 0, 3)]
          ]
        };
      }
    },
    grade: {
      title: 'Grade Calculator',
      category: 'other',
      blurb: 'Weighted average score from component marks.',
      fields: [
        { id: 'rows', label: 'Entries as score,weight%;score,weight%', type: 'text', value: '85,40;90,60' }
      ],
      compute: (v) => {
        const parts = String(v.rows).split(';').map((s) => s.trim()).filter(Boolean);
        let acc = 0;
        let wsum = 0;
        parts.forEach((p) => {
          const [s, w] = p.split(',').map(Number);
          if (Number.isFinite(s) && Number.isFinite(w)) {
            acc += s * w;
            wsum += w;
          }
        });
        return { summary: [['Weighted average', fmt(wsum ? acc / wsum : 0, 2)]] };
      }
    },
    concrete: {
      title: 'Concrete Calculator',
      category: 'other',
      blurb: 'Slab concrete volume in cubic meters / cubic feet.',
      fields: [
        { id: 'l', label: 'Length (m)', type: 'number', value: 5, step: 0.01 },
        { id: 'w', label: 'Width (m)', type: 'number', value: 4, step: 0.01 },
        { id: 'd', label: 'Depth (m)', type: 'number', value: 0.15, step: 0.01 }
      ],
      compute: (v) => {
        const m3 = num(v.l) * num(v.w) * num(v.d);
        return {
          summary: [
            ['Volume m³', fmt(m3, 3)],
            ['Volume ft³', fmt(m3 * 35.3147, 2)]
          ]
        };
      }
    },
    subnet: {
      title: 'Subnet Calculator',
      category: 'other',
      blurb: 'IPv4 network info from address + CIDR (e.g. 24).',
      fields: [
        { id: 'ip', label: 'IPv4 address', type: 'text', value: '192.168.1.10' },
        { id: 'cidr', label: 'CIDR prefix', type: 'number', value: 24 }
      ],
      compute: (v) => {
        const parts = String(v.ip)
          .split('.')
          .map(Number);
        if (parts.length !== 4 || parts.some((p) => p < 0 || p > 255)) {
          return { summary: [['Error', 'Invalid IPv4']] };
        }
        const cidr = Math.min(32, Math.max(0, Math.round(num(v.cidr))));
        const ipNum = ((parts[0] << 24) >>> 0) + (parts[1] << 16) + (parts[2] << 8) + parts[3];
        const mask = cidr === 0 ? 0 : ((0xffffffff << (32 - cidr)) >>> 0);
        const network = (ipNum & mask) >>> 0;
        const broadcast = (network | (~mask >>> 0)) >>> 0;
        const toIp = (n) => [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join('.');
        const hosts = cidr >= 31 ? 0 : Math.pow(2, 32 - cidr) - 2;
        return {
          summary: [
            ['Netmask', toIp(mask)],
            ['Network', toIp(network)],
            ['Broadcast', toIp(broadcast)],
            ['Usable hosts', String(hosts)]
          ]
        };
      }
    },
    password: {
      title: 'Password Generator',
      category: 'other',
      blurb: 'Generate a random password locally in your browser.',
      fields: [
        { id: 'len', label: 'Length', type: 'number', value: 16 },
        {
          id: 'set',
          label: 'Character set',
          type: 'select',
          options: [
            ['all', 'Letters + numbers + symbols'],
            ['alnum', 'Letters + numbers'],
            ['alpha', 'Letters only']
          ]
        }
      ],
      compute: (v) => {
        const sets = {
          all: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*-_=+',
          alnum: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
          alpha: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
        };
        const chars = sets[v.set] || sets.all;
        const len = Math.min(128, Math.max(4, Math.round(num(v.len))));
        const arr = new Uint32Array(len);
        (global.crypto || window.crypto).getRandomValues(arr);
        let out = '';
        for (let i = 0; i < len; i++) out += chars[arr[i] % chars.length];
        return { summary: [['Password', out]] };
      }
    },
    conversion: {
      title: 'Conversion Calculator',
      category: 'other',
      blurb: 'Common unit conversions.',
      fields: [
        {
          id: 'type',
          label: 'Conversion',
          type: 'select',
          options: [
            ['km-mi', 'Kilometers → Miles'],
            ['mi-km', 'Miles → Kilometers'],
            ['kg-lb', 'Kilograms → Pounds'],
            ['lb-kg', 'Pounds → Kilograms'],
            ['c-f', 'Celsius → Fahrenheit'],
            ['f-c', 'Fahrenheit → Celsius']
          ]
        },
        { id: 'value', label: 'Value', type: 'number', value: 10, step: 0.01 }
      ],
      compute: (v) => {
        const x = num(v.value);
        const map = {
          'km-mi': x * 0.621371,
          'mi-km': x / 0.621371,
          'kg-lb': x * 2.20462,
          'lb-kg': x / 2.20462,
          'c-f': (x * 9) / 5 + 32,
          'f-c': ((x - 32) * 5) / 9
        };
        return { summary: [['Result', fmt(map[v.type], 4)]] };
      }
    }
  };

  /** Nav grouping for dropdowns */
  const NAV = {
    finance: [
      ['mortgage', 'Mortgage Calculator'],
      ['loan', 'Loan Calculator'],
      ['auto-loan', 'Auto Loan Calculator'],
      ['interest', 'Interest Calculator'],
      ['payment', 'Payment Calculator'],
      ['retirement', 'Retirement Calculator'],
      ['amortization', 'Amortization Calculator'],
      ['investment', 'Investment Calculator'],
      ['inflation', 'Inflation Calculator'],
      ['finance', 'Finance Calculator'],
      ['income-tax', 'Income Tax Calculator'],
      ['compound-interest', 'Compound Interest Calculator'],
      ['salary', 'Salary Calculator'],
      ['interest-rate', 'Interest Rate Calculator'],
      ['sales-tax', 'Sales Tax Calculator'],
      ['emi', 'EMI Calculator (advanced)'],
      ['fire', 'FIRE Engine (advanced)']
    ],
    health: [
      ['bmi', 'BMI Calculator'],
      ['calorie', 'Calorie Calculator'],
      ['body-fat', 'Body Fat Calculator'],
      ['bmr', 'BMR Calculator'],
      ['ideal-weight', 'Ideal Weight Calculator'],
      ['pace', 'Pace Calculator'],
      ['pregnancy', 'Pregnancy Calculator'],
      ['pregnancy-conception', 'Pregnancy Conception'],
      ['due-date', 'Due Date Calculator']
    ],
    math: [
      ['scientific', 'Scientific Calculator'],
      ['fraction', 'Fraction Calculator'],
      ['percentage', 'Percentage Calculator'],
      ['random-number', 'Random Number Generator'],
      ['triangle', 'Triangle Calculator'],
      ['standard-deviation', 'Standard Deviation Calculator']
    ],
    other: [
      ['age', 'Age Calculator'],
      ['date', 'Date Calculator'],
      ['time', 'Time Calculator'],
      ['hours', 'Hours Calculator'],
      ['gpa', 'GPA Calculator'],
      ['grade', 'Grade Calculator'],
      ['concrete', 'Concrete Calculator'],
      ['subnet', 'Subnet Calculator'],
      ['password', 'Password Generator'],
      ['conversion', 'Conversion Calculator']
    ]
  };

  function hrefFor(key) {
    if (key === 'emi') return '/finance/emi.html';
    if (key === 'fire') return '/finance/fire.html';
    const cat = (CATALOG[key] && CATALOG[key].category) || 'other';
    const folder = cat === 'finance' ? 'finance' : cat === 'health' ? 'health' : cat === 'math' ? 'math' : 'other';
    return '/' + folder + '/' + key + '.html';
  }

  global.BTB_CALCS = { CATALOG: CATALOG, NAV: NAV, hrefFor: hrefFor, fmt: fmt };
})(window);
