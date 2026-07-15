/**
 * BitsToBetter - calculator engine (all embedded tools)
 * Synchronized with the mobile app engine
 */
(function (global) {
  'use strict';
/**
 * BitsToBetter — calculator engine (all embedded tools)
 * Each key maps to { title, category, fields, compute(values) -> { summary, rows? } }
 */
const fmt = (n, d) => Number.isFinite(n) ? n.toLocaleString(undefined, { maximumFractionDigits: d == null ? 2 : d, minimumFractionDigits: d == null ? 0 : d }) : '—';
function num(v) {
    const n = parseFloat(v);
    return Number.isFinite(n) ? n : 0;
}
function pmt(P, annualRate, nMonths) {
    const r = annualRate / 100 / 12;
    if (nMonths <= 0)
        return 0;
    if (Math.abs(r) < 1e-12)
        return P / nMonths;
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
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
function formatMonthYear(d) {
    if (!d)
        return '';
    return MONTHS[d.getMonth()] + ' ' + d.getFullYear();
}
function advancedAmortSchedule(P, annualRate, nMonths, extraPay, startDateStr, upfrontFees) {
    const r = annualRate / 100 / 12;
    const standardPay = pmt(P, annualRate, nMonths);
    const actualPay = standardPay + num(extraPay);
    let bal = P;
    let totI = 0;
    const rows = [];
    let currentDate = startDateStr ? new Date(startDateStr) : new Date();
    let i = 1;
    while (bal > 0.01 && i <= 1200) {
        let interest = bal * r;
        let principal = actualPay - interest;
        let installment = actualPay;
        if (bal + interest <= actualPay) {
            principal = bal;
            installment = bal + interest;
        }
        bal -= principal;
        totI += interest;
        const monthStr = formatMonthYear(currentDate);
        rows.push([monthStr, installment, interest, principal, bal]);
        currentDate.setMonth(currentDate.getMonth() + 1);
        i++;
    }
    return { standardPay, actualPay, totI, monthsTaken: i - 1, rows };
}
function advancedInvestmentSchedule(lumpSum, monthlySip, annualRate, inflationRate, months, startDateStr) {
    const r = annualRate / 100 / 12;
    const infl = inflationRate / 100 / 12;
    const rows = [];
    let balance = lumpSum;
    let totalInvested = lumpSum;
    let currentDate = startDateStr ? new Date(startDateStr) : new Date();
    // Track yearly to avoid rendering 360 rows
    let yearInvested = 0;
    let yearInterest = 0;
    for (let i = 1; i <= months; i++) {
        totalInvested += monthlySip;
        yearInvested += monthlySip;
        const interest = balance * r;
        yearInterest += interest;
        balance = balance + monthlySip + interest;
        currentDate.setMonth(currentDate.getMonth() + 1);
        if (i % 12 === 0 || i === months) {
            const realValue = balance / Math.pow(1 + infl, i);
            rows.push([
                formatMonthYear(currentDate),
                fmt(yearInvested, 2),
                fmt(yearInterest, 2),
                fmt(balance, 2),
                fmt(realValue, 2)
            ]);
            yearInvested = 0;
            yearInterest = 0;
        }
    }
    return { balance, totalInvested, rows };
}
const CATALOG = {
    /* ——— Financial ——— */
    loan: {
        title: 'EMI',
        category: 'loan',
        blurb: 'Advanced loan calculator supporting extra payments, explicit start dates, and dynamic solving.',
        fields: (v) => {
            const solve = v.solveFor || 'emi';
            const tenureUnit = v.tenureUnit || 'Months';
            const f = [
                {
                    id: 'solveFor', label: 'Calculate What?', type: 'select', value: 'emi',
                    options: [['emi', 'EMI'], ['principal', 'Principal'], ['months', 'Tenure'], ['rate', 'Interest Rate']]
                }
            ];
            if (solve !== 'principal')
                f.push({ id: 'principal', label: 'Loan Amount', type: 'number', value: 300000 });
            if (solve !== 'rate')
                f.push({ id: 'rate', label: 'Interest Rate (% p.a.)', type: 'number', value: 12, step: 0.1 });
            if (solve !== 'months') {
                f.push({ id: 'tenureUnit', label: 'Tenure In', type: 'select', value: 'Months', options: [['Months', 'Months'], ['Years', 'Years']] });
                f.push({ id: 'tenureValue', label: tenureUnit === 'Years' ? 'Tenure (Years)' : 'Tenure (Months)', type: 'number', value: tenureUnit === 'Years' ? 5 : 60 });
            }
            if (solve !== 'emi')
                f.push({ id: 'emi', label: 'Target Monthly EMI', type: 'number', value: 5000 });
            f.push({ id: 'expenses', label: 'Upfront Fees / Expenses', type: 'number', value: 0 });
            f.push({ id: 'extraPayment', label: 'Extra Monthly Payment', type: 'number', value: 0 });
            f.push({ id: 'startDate', label: 'Start Date', type: 'date', value: new Date().toISOString().split('T')[0] });
            return f;
        },
        compute: (v) => {
            const solve = v.solveFor || 'emi';
            let P = num(v.principal);
            let r = num(v.rate);
            let tUnit = v.tenureUnit || 'Months';
            let months = num(v.tenureValue);
            if (tUnit === 'Years')
                months = months * 12;
            let E = num(v.emi);
            const extra = num(v.extraPayment);
            const expenses = num(v.expenses);
            if (solve === 'emi') {
                E = pmt(P, r, months);
            }
            else if (solve === 'principal') {
                const ratePerMonth = r / 100 / 12;
                if (ratePerMonth === 0)
                    P = E * months;
                else
                    P = E * ((1 - Math.pow(1 + ratePerMonth, -months)) / ratePerMonth);
            }
            else if (solve === 'months') {
                const ratePerMonth = r / 100 / 12;
                if (ratePerMonth === 0)
                    months = P / E;
                else {
                    const inner = 1 - (P * ratePerMonth) / E;
                    if (inner <= 0)
                        months = 9999;
                    else
                        months = -Math.log(inner) / Math.log(1 + ratePerMonth);
                }
            }
            else if (solve === 'rate') {
                if (E * months <= P)
                    r = 0;
                else {
                    let low = 0.0, high = 100.0, guess = 10.0;
                    for (let i = 0; i < 100; i++) {
                        guess = (low + high) / 2;
                        const testEMI = pmt(P, guess, months);
                        if (Math.abs(testEMI - E) < 0.001)
                            break;
                        if (testEMI > E)
                            high = guess;
                        else
                            low = guess;
                    }
                    r = guess;
                }
            }
            months = Math.ceil(months);
            if (months >= 9999) {
                return {
                    summary: [['Error', 'EMI is too low to cover interest.']]
                };
            }
            const s = advancedAmortSchedule(P, r, months, extra, v.startDate, expenses);
            const baseMetrics = [
                ['Loan Amount', fmt(P, 2)],
                ['Interest Rate', fmt(r, 2) + '%'],
                ['Tenure', months + ' Months'],
                ['Standard EMI', fmt(s.standardPay, 2)],
            ];
            if (extra > 0) {
                baseMetrics.push(['Actual Monthly Payment', fmt(s.actualPay, 2)]);
                baseMetrics.push(['Original Tenure', months + ' Months']);
                baseMetrics.push(['Actual Tenure', s.monthsTaken + ' Months']);
            }
            baseMetrics.push(['Upfront Expenses', fmt(expenses, 2)]);
            baseMetrics.push(['Total Interest Paid', fmt(s.totI, 2)]);
            baseMetrics.push(['Total Cost (inc. Fees)', fmt(P + s.totI + expenses, 2)]);
            return {
                summary: baseMetrics,
                headers: ['Month', 'Payment', 'Interest', 'Principal', 'Balance'],
                rows: s.rows.map(row => [
                    row[0],
                    fmt(row[1], 2),
                    fmt(row[2], 2),
                    fmt(row[3], 2),
                    fmt(row[4], 2)
                ])
            };
        }
    },
    mortgage: {
        title: 'Mortgage',
        category: 'loan',
        blurb: 'Advanced mortgage calculator supporting explicit start dates, extra payments, and dynamic variable solving.',
        fields: (v) => {
            const solve = v.solveFor || 'emi';
            const tenureUnit = v.tenureUnit || 'Years';
            const f = [
                {
                    id: 'solveFor', label: 'Calculate What?', type: 'select', value: 'emi',
                    options: [['emi', 'Monthly P&I'], ['principal', 'Home Affordability (Price)'], ['months', 'Tenure'], ['rate', 'Interest Rate']]
                }
            ];
            if (solve !== 'principal') {
                f.push({ id: 'price', label: 'Home Price', type: 'number', value: 400000 });
                f.push({ id: 'down', label: 'Down Payment (Cash)', type: 'number', value: 80000 });
            }
            if (solve !== 'rate')
                f.push({ id: 'rate', label: 'Annual Interest Rate (%)', type: 'number', value: 6.5, step: 0.1 });
            if (solve !== 'months') {
                f.push({ id: 'tenureUnit', label: 'Tenure In', type: 'select', value: 'Years', options: [['Months', 'Months'], ['Years', 'Years']] });
                f.push({ id: 'tenureValue', label: tenureUnit === 'Years' ? 'Tenure (Years)' : 'Tenure (Months)', type: 'number', value: tenureUnit === 'Years' ? 30 : 360 });
            }
            if (solve !== 'emi')
                f.push({ id: 'emi', label: 'Target Monthly P&I', type: 'number', value: 2000 });
            f.push({ id: 'tax', label: 'Annual Property Tax', type: 'number', value: 4800 });
            f.push({ id: 'ins', label: 'Annual Home Insurance', type: 'number', value: 1200 });
            f.push({ id: 'hoa', label: 'Monthly HOA Fees', type: 'number', value: 200 });
            f.push({ id: 'expenses', label: 'Upfront Closing Costs', type: 'number', value: 5000 });
            f.push({ id: 'extraPayment', label: 'Extra Monthly Payment', type: 'number', value: 0 });
            f.push({ id: 'startDate', label: 'Start Date', type: 'date', value: new Date().toISOString().split('T')[0] });
            return f;
        },
        compute: (v) => {
            const solve = v.solveFor || 'emi';
            let price = num(v.price);
            let down = num(v.down);
            let P = Math.max(0, price - down);
            let r = num(v.rate);
            let tUnit = v.tenureUnit || 'Years';
            let months = num(v.tenureValue);
            if (tUnit === 'Years')
                months = months * 12;
            let E = num(v.emi);
            const extra = num(v.extraPayment);
            const expenses = num(v.expenses);
            if (solve === 'emi') {
                E = pmt(P, r, months);
            }
            else if (solve === 'principal') {
                const ratePerMonth = r / 100 / 12;
                if (ratePerMonth === 0)
                    P = E * months;
                else
                    P = E * ((1 - Math.pow(1 + ratePerMonth, -months)) / ratePerMonth);
                price = P + down;
            }
            else if (solve === 'months') {
                const ratePerMonth = r / 100 / 12;
                if (ratePerMonth === 0)
                    months = P / E;
                else {
                    const inner = 1 - (P * ratePerMonth) / E;
                    if (inner <= 0)
                        months = 9999;
                    else
                        months = -Math.log(inner) / Math.log(1 + ratePerMonth);
                }
            }
            else if (solve === 'rate') {
                if (E * months <= P)
                    r = 0;
                else {
                    let low = 0.0, high = 100.0, guess = 10.0;
                    for (let i = 0; i < 100; i++) {
                        guess = (low + high) / 2;
                        const testEMI = pmt(P, guess, months);
                        if (Math.abs(testEMI - E) < 0.001)
                            break;
                        if (testEMI > E)
                            high = guess;
                        else
                            low = guess;
                    }
                    r = guess;
                }
            }
            months = Math.ceil(months);
            if (months >= 9999)
                return { summary: [['Error', 'P&I Payment is too low to cover interest.']] };
            const s = advancedAmortSchedule(P, r, months, extra, v.startDate, expenses);
            const taxMo = num(v.tax) / 12;
            const insMo = num(v.ins) / 12;
            const hoa = num(v.hoa);
            const staticCosts = taxMo + insMo + hoa;
            const piti = s.standardPay + staticCosts;
            const baseMetrics = [
                ['Home Price', fmt(price, 2)],
                ['Loan Amount', fmt(P, 2)],
                ['Interest Rate', fmt(r, 2) + '%'],
                ['Principal & Interest (P&I)', fmt(s.standardPay, 2)],
                ['Taxes, Ins & HOA', fmt(staticCosts, 2)],
                ['Total Monthly Payment (PITI)', fmt(piti, 2)]
            ];
            if (extra > 0) {
                baseMetrics.push(['Actual Monthly PITI (w/ Extra)', fmt(piti + extra, 2)]);
                baseMetrics.push(['Original Tenure', months + ' Months']);
                baseMetrics.push(['Actual Tenure (w/ Extra)', s.monthsTaken + ' Months']);
            }
            baseMetrics.push(['Upfront Closing Costs', fmt(expenses, 2)]);
            baseMetrics.push(['Total Interest Paid', fmt(s.totI, 2)]);
            baseMetrics.push(['Total Out of Pocket', fmt(P + s.totI + expenses + down, 2)]);
            return {
                summary: baseMetrics,
                headers: ['Month', 'P&I + Extra', 'Interest', 'Principal', 'Balance'],
                rows: s.rows.map(row => [row[0], fmt(row[1], 2), fmt(row[2], 2), fmt(row[3], 2), fmt(row[4], 2)])
            };
        }
    },
    'auto-loan': {
        title: 'Auto Loan',
        category: 'loan',
        blurb: 'Advanced car financing with trade-ins, extra payments, and dynamic variable solving.',
        fields: (v) => {
            const solve = v.solveFor || 'emi';
            const tenureUnit = v.tenureUnit || 'Months';
            const f = [
                {
                    id: 'solveFor', label: 'Calculate What?', type: 'select', value: 'emi',
                    options: [['emi', 'Monthly Payment'], ['principal', 'Vehicle Price'], ['months', 'Tenure'], ['rate', 'Interest Rate']]
                }
            ];
            if (solve !== 'principal')
                f.push({ id: 'price', label: 'Vehicle Price', type: 'number', value: 35000 });
            f.push({ id: 'down', label: 'Down Payment (Cash)', type: 'number', value: 5000 });
            f.push({ id: 'tradeIn', label: 'Trade-In Value', type: 'number', value: 0 });
            f.push({ id: 'salesTax', label: 'Sales Tax (%)', type: 'number', value: 7.5, step: 0.1 });
            f.push({ id: 'fees', label: 'Dealer & Reg Fees', type: 'number', value: 1200 });
            if (solve !== 'rate')
                f.push({ id: 'rate', label: 'Interest Rate (% APR)', type: 'number', value: 6.5, step: 0.1 });
            if (solve !== 'months') {
                f.push({ id: 'tenureUnit', label: 'Tenure In', type: 'select', value: 'Months', options: [['Months', 'Months'], ['Years', 'Years']] });
                f.push({ id: 'tenureValue', label: tenureUnit === 'Years' ? 'Tenure (Years)' : 'Tenure (Months)', type: 'number', value: tenureUnit === 'Years' ? 5 : 60 });
            }
            if (solve !== 'emi')
                f.push({ id: 'emi', label: 'Target Monthly Payment', type: 'number', value: 600 });
            f.push({ id: 'extraPayment', label: 'Extra Monthly Payment', type: 'number', value: 0 });
            f.push({ id: 'startDate', label: 'Start Date', type: 'date', value: new Date().toISOString().split('T')[0] });
            return f;
        },
        compute: (v) => {
            const solve = v.solveFor || 'emi';
            let price = num(v.price);
            let down = num(v.down);
            let trade = num(v.tradeIn);
            let taxRate = num(v.salesTax) / 100;
            let fees = num(v.fees);
            let r = num(v.rate);
            let tUnit = v.tenureUnit || 'Months';
            let months = num(v.tenureValue);
            if (tUnit === 'Years')
                months = months * 12;
            let E = num(v.emi);
            const extra = num(v.extraPayment);
            let P = 0;
            let taxAmount = 0;
            let outTheDoor = 0;
            if (solve === 'principal') {
                const ratePerMonth = r / 100 / 12;
                if (ratePerMonth === 0)
                    P = E * months;
                else
                    P = E * ((1 - Math.pow(1 + ratePerMonth, -months)) / ratePerMonth);
                price = (P + trade * (1 + taxRate) - fees + down) / (1 + taxRate);
                price = Math.max(0, price);
            }
            taxAmount = Math.max(0, price - trade) * taxRate;
            outTheDoor = price + taxAmount + fees;
            P = Math.max(0, outTheDoor - down - trade);
            if (solve === 'emi') {
                E = pmt(P, r, months);
            }
            else if (solve === 'months') {
                const ratePerMonth = r / 100 / 12;
                if (ratePerMonth === 0)
                    months = P / E;
                else {
                    const inner = 1 - (P * ratePerMonth) / E;
                    if (inner <= 0)
                        months = 9999;
                    else
                        months = -Math.log(inner) / Math.log(1 + ratePerMonth);
                }
            }
            else if (solve === 'rate') {
                if (E * months <= P)
                    r = 0;
                else {
                    let low = 0.0, high = 100.0, guess = 10.0;
                    for (let i = 0; i < 100; i++) {
                        guess = (low + high) / 2;
                        const testEMI = pmt(P, guess, months);
                        if (Math.abs(testEMI - E) < 0.001)
                            break;
                        if (testEMI > E)
                            high = guess;
                        else
                            low = guess;
                    }
                    r = guess;
                }
            }
            months = Math.ceil(months);
            if (months >= 9999)
                return { summary: [['Error', 'Payment is too low to cover interest.']] };
            const s = advancedAmortSchedule(P, r, months, extra, v.startDate, fees);
            const baseMetrics = [
                ['Vehicle Price', fmt(price, 2)],
                ['Sales Tax Amount', fmt(taxAmount, 2)],
                ['Out-The-Door Price', fmt(outTheDoor, 2)],
                ['Financed Amount', fmt(P, 2)],
                ['Interest Rate', fmt(r, 2) + '%'],
                ['Standard Monthly Payment', fmt(s.standardPay, 2)],
            ];
            if (extra > 0) {
                baseMetrics.push(['Actual Monthly Payment', fmt(s.actualPay, 2)]);
                baseMetrics.push(['Original Tenure', months + ' Months']);
                baseMetrics.push(['Actual Tenure', s.monthsTaken + ' Months']);
            }
            baseMetrics.push(['Total Interest Paid', fmt(s.totI, 2)]);
            return {
                summary: baseMetrics,
                headers: ['Month', 'Payment', 'Interest', 'Principal', 'Balance'],
                rows: s.rows.map(row => [row[0], fmt(row[1], 2), fmt(row[2], 2), fmt(row[3], 2), fmt(row[4], 2)])
            };
        }
    },
    interest: {
        title: 'Interest',
        category: 'investment',
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
            }
            else {
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
        title: 'Payment',
        category: 'loan',
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
            }
            else if (!Number.isFinite(P) && Number.isFinite(pay) && Number.isFinite(rate) && Number.isFinite(n)) {
                const r = rate / 100 / 12;
                P = r === 0 ? pay * n : (pay * (1 - Math.pow(1 + r, -n))) / r;
            }
            else if (!Number.isFinite(n) && Number.isFinite(P) && Number.isFinite(pay) && Number.isFinite(rate)) {
                const r = rate / 100 / 12;
                if (r === 0)
                    n = P / pay;
                else
                    n = Math.log(pay / (pay - r * P)) / Math.log(1 + r);
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
        title: 'Retirement',
        category: 'investment',
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
            const pmtDue = Math.abs(r) < 1e-12
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
        title: 'Amortization',
        category: 'loan',
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
        title: 'Investment',
        category: 'investment',
        blurb: 'Advanced dynamic SIP and lump sum calculator with real-value inflation tracking.',
        fields: (v) => {
            const solve = v.solveFor || 'fv';
            const tenureUnit = v.tenureUnit || 'Years';
            const f = [
                {
                    id: 'solveFor', label: 'Calculate What?', type: 'select', value: 'fv',
                    options: [['fv', 'Future Value'], ['sip', 'Monthly SIP Required'], ['lump', 'Lump Sum Required'], ['months', 'Tenure Required']]
                }
            ];
            if (solve !== 'fv')
                f.push({ id: 'targetFv', label: 'Target Future Value', type: 'number', value: 1000000 });
            if (solve !== 'lump')
                f.push({ id: 'lump', label: 'Lump Sum Today', type: 'number', value: 10000 });
            if (solve !== 'sip')
                f.push({ id: 'sip', label: 'Monthly Investment (SIP)', type: 'number', value: 1000 });
            f.push({ id: 'rate', label: 'Expected Return (% p.a.)', type: 'number', value: 12, step: 0.1 });
            if (solve !== 'months') {
                f.push({ id: 'tenureUnit', label: 'Tenure In', type: 'select', value: 'Years', options: [['Months', 'Months'], ['Years', 'Years']] });
                f.push({ id: 'tenureValue', label: tenureUnit === 'Years' ? 'Tenure (Years)' : 'Tenure (Months)', type: 'number', value: tenureUnit === 'Years' ? 15 : 180 });
            }
            f.push({ id: 'inflation', label: 'Expected Inflation (%)', type: 'number', value: 6, step: 0.1 });
            f.push({ id: 'startDate', label: 'Start Date', type: 'date', value: new Date().toISOString().split('T')[0] });
            return f;
        },
        compute: (v) => {
            const solve = v.solveFor || 'fv';
            let FV = num(v.targetFv);
            let lump = num(v.lump);
            let sip = num(v.sip);
            let r = num(v.rate) / 100 / 12;
            let tUnit = v.tenureUnit || 'Years';
            let months = num(v.tenureValue);
            if (tUnit === 'Years')
                months = months * 12;
            if (solve === 'fv') {
                FV = lump * Math.pow(1 + r, months);
                if (r === 0)
                    FV += sip * months;
                else
                    FV += sip * ((Math.pow(1 + r, months) - 1) / r) * (1 + r);
            }
            else if (solve === 'lump') {
                let fvSip = 0;
                if (r === 0)
                    fvSip = sip * months;
                else
                    fvSip = sip * ((Math.pow(1 + r, months) - 1) / r) * (1 + r);
                const fvNeededFromLump = FV - fvSip;
                lump = fvNeededFromLump / Math.pow(1 + r, months);
                lump = Math.max(0, lump);
            }
            else if (solve === 'sip') {
                const fvLump = lump * Math.pow(1 + r, months);
                const fvNeededFromSip = FV - fvLump;
                if (r === 0)
                    sip = fvNeededFromSip / months;
                else
                    sip = fvNeededFromSip / (((Math.pow(1 + r, months) - 1) / r) * (1 + r));
                sip = Math.max(0, sip);
            }
            else if (solve === 'months') {
                if (r === 0) {
                    months = (FV - lump) / sip;
                }
                else {
                    let low = 0, high = 1200, guess = 120;
                    for (let i = 0; i < 100; i++) {
                        guess = (low + high) / 2;
                        const testFV = (lump * Math.pow(1 + r, guess)) + (sip * ((Math.pow(1 + r, guess) - 1) / r) * (1 + r));
                        if (Math.abs(testFV - FV) < 1.0)
                            break;
                        if (testFV > FV)
                            high = guess;
                        else
                            low = guess;
                    }
                    months = Math.ceil(guess);
                }
            }
            months = Math.ceil(months);
            const s = advancedInvestmentSchedule(lump, sip, num(v.rate), num(v.inflation), months, v.startDate);
            return {
                summary: [
                    ['Target Future Value (Nominal)', fmt(s.balance, 0)],
                    ['Real Value (Purchasing Power)', fmt(s.balance / Math.pow(1 + (num(v.inflation) / 100 / 12), months), 0)],
                    ['Total Invested', fmt(s.totalInvested, 0)],
                    ['Estimated Nominal Gain', fmt(s.balance - s.totalInvested, 0)],
                    ['Monthly SIP', fmt(sip, 2)],
                    ['Lump Sum', fmt(lump, 2)],
                    ['Tenure', months + ' Months']
                ],
                headers: ['Year End', 'Yearly SIP', 'Yearly Interest', 'Total Balance', 'Real Value'],
                rows: s.rows
            };
        }
    },
    inflation: {
        title: 'Inflation',
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
        title: 'Finance',
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
            }
            else if (v.fn === 'fv') {
                label = 'Future value';
                const pv = num(v.principal);
                const p = num(v.pmt);
                result = pv * Math.pow(1 + r, n) + (r === 0 ? p * n : p * ((Math.pow(1 + r, n) - 1) / r));
            }
            else {
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
        title: 'Income Tax',
        category: 'tax',
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
                    if (band > 0)
                        tax += band * rate;
                    prev = upto;
                    if (income <= upto)
                        break;
                }
            }
            else {
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
        title: 'Compound Interest',
        category: 'investment',
        blurb: 'Advanced compound interest solver allowing you to solve for Future Value, Principal, or Rate.',
        fields: (v) => {
            const solve = v.solveFor || 'fv';
            const tenureUnit = v.tenureUnit || 'Years';
            const f = [
                {
                    id: 'solveFor', label: 'Calculate What?', type: 'select', value: 'fv',
                    options: [['fv', 'Future Value'], ['principal', 'Principal Needed'], ['rate', 'Interest Rate Required'], ['months', 'Time Required']]
                }
            ];
            if (solve !== 'fv')
                f.push({ id: 'targetFv', label: 'Target Future Value', type: 'number', value: 150000 });
            if (solve !== 'principal')
                f.push({ id: 'principal', label: 'Principal Amount', type: 'number', value: 100000 });
            if (solve !== 'rate')
                f.push({ id: 'rate', label: 'Interest Rate (% p.a.)', type: 'number', value: 8, step: 0.1 });
            if (solve !== 'months') {
                f.push({ id: 'tenureUnit', label: 'Tenure In', type: 'select', value: 'Years', options: [['Months', 'Months'], ['Years', 'Years']] });
                f.push({ id: 'tenureValue', label: tenureUnit === 'Years' ? 'Tenure (Years)' : 'Tenure (Months)', type: 'number', value: tenureUnit === 'Years' ? 10 : 120 });
            }
            f.push({
                id: 'freq', label: 'Compounding Frequency', type: 'select', value: '1',
                options: [['12', 'Monthly'], ['4', 'Quarterly'], ['2', 'Half-Yearly'], ['1', 'Annually']]
            });
            f.push({ id: 'startDate', label: 'Start Date', type: 'date', value: new Date().toISOString().split('T')[0] });
            return f;
        },
        compute: (v) => {
            const solve = v.solveFor || 'fv';
            let FV = num(v.targetFv);
            let P = num(v.principal);
            let r = num(v.rate) / 100;
            let tUnit = v.tenureUnit || 'Years';
            let months = num(v.tenureValue);
            if (tUnit === 'Years')
                months = months * 12;
            let t = months / 12; // Time in years
            const n = parseInt(v.freq || '1', 10);
            if (solve === 'fv') {
                FV = P * Math.pow(1 + r / n, n * t);
            }
            else if (solve === 'principal') {
                P = FV / Math.pow(1 + r / n, n * t);
            }
            else if (solve === 'rate') {
                r = n * (Math.pow(FV / P, 1 / (n * t)) - 1);
                if (isNaN(r) || r < 0)
                    r = 0;
            }
            else if (solve === 'months') {
                t = Math.log(FV / P) / (n * Math.log(1 + r / n));
                months = t * 12;
            }
            const amount = P * Math.pow(1 + r / n, n * t);
            const interest = amount - P;
            return {
                summary: [
                    ['Principal', fmt(P, 2)],
                    ['Future Value', fmt(amount, 2)],
                    ['Total Interest Earned', fmt(interest, 2)],
                    ['Interest Rate', fmt(r * 100, 2) + '%'],
                    ['Tenure', Math.ceil(months) + ' Months']
                ]
            };
        }
    },
    salary: {
        title: 'Salary',
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
        title: 'Interest Rate',
        category: 'loan',
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
                if (pv > P)
                    lo = mid;
                else
                    hi = mid;
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
        title: 'Sales Tax',
        category: 'tax',
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
    /*  Finance - Additional  */
    'delay-cost': {
        title: 'SIP Delay Cost',
        category: 'investment',
        blurb: 'Calculate the enormous wealth lost by delaying your SIP.',
        fields: [
            { id: 'sip', label: 'Monthly SIP Amount', type: 'number', value: 10000 },
            { id: 'rate', label: 'Expected Return (% p.a.)', type: 'number', value: 12 },
            { id: 'years', label: 'Total Investment Tenure (Years)', type: 'number', value: 20 },
            { id: 'delay', label: 'Delay in starting SIP (Years)', type: 'number', value: 5 }
        ],
        compute: (v) => {
            const p = num(v.sip);
            const r = num(v.rate) / 100 / 12;
            const totalYears = num(v.years);
            const delayYears = num(v.delay);
            const nTotal = totalYears * 12;
            const nDelayed = Math.max(0, (totalYears - delayYears) * 12);
            let fvTotal = 0;
            let fvDelayed = 0;
            if (r === 0) {
                fvTotal = p * nTotal;
                fvDelayed = p * nDelayed;
            }
            else {
                fvTotal = p * ((Math.pow(1 + r, nTotal) - 1) / r) * (1 + r);
                fvDelayed = p * ((Math.pow(1 + r, nDelayed) - 1) / r) * (1 + r);
            }
            const wealthLost = fvTotal - fvDelayed;
            const totalInvestedTotal = p * nTotal;
            const totalInvestedDelayed = p * nDelayed;
            const lessInvested = totalInvestedTotal - totalInvestedDelayed;
            return {
                summary: [
                    ['Corpus if started today', fmt(fvTotal, 0)],
                    ['Corpus if delayed', fmt(fvDelayed, 0)],
                    ['Total Wealth Lost', fmt(wealthLost, 0)],
                    ['Difference in Investment', fmt(lessInvested, 0) + ' saved, but ' + fmt(wealthLost, 0) + ' lost!']
                ]
            };
        }
    },
    /* ——— Health ——— */
    tdee: {
        title: 'TDEE',
        category: 'fitness',
        blurb: 'Total Daily Energy Expenditure based on Mifflin-St Jeor.',
        fields: [
            {
                id: 'unit',
                label: 'System',
                type: 'select',
                options: [
                    ['metric', 'Metric (kg, cm)'],
                    ['imperial', 'Imperial (lbs, inches)']
                ]
            },
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
            { id: 'weight', label: 'Weight', type: 'number', value: 70 },
            { id: 'height', label: 'Height', type: 'number', value: 170 },
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
            let w = num(v.weight);
            let h = num(v.height);
            if (v.unit === 'imperial') {
                w = w * 0.453592;
                h = h * 2.54;
            }
            const a = num(v.age);
            const bmr = v.sex === 'male' ? 10 * w + 6.25 * h - 5 * a + 5 : 10 * w + 6.25 * h - 5 * a - 161;
            const tdee = bmr * num(v.act);
            return {
                summary: [
                    ['BMR (kcal/day)', fmt(bmr, 0)],
                    ['Maintenance calories (TDEE)', fmt(tdee, 0)],
                    ['Mild cut (-15%)', fmt(tdee * 0.85, 0)],
                    ['Aggressive cut (-25%)', fmt(tdee * 0.75, 0)],
                    ['Bulk (+10%)', fmt(tdee * 1.10, 0)]
                ]
            };
        }
    },
    bmi: {
        title: 'BMI',
        category: 'health',
        blurb: 'Body Mass Index from height and weight.',
        fields: [
            {
                id: 'unit',
                label: 'System',
                type: 'select',
                options: [
                    ['metric', 'Metric (kg, cm)'],
                    ['imperial', 'Imperial (lbs, inches)']
                ]
            },
            { id: 'weight', label: 'Weight', type: 'number', value: 70, step: 0.1 },
            { id: 'height', label: 'Height', type: 'number', value: 170, step: 0.1 }
        ],
        compute: (v) => {
            let weightKg = num(v.weight);
            let heightCm = num(v.height);
            if (v.unit === 'imperial') {
                weightKg = num(v.weight) * 0.453592;
                heightCm = num(v.height) * 2.54;
            }
            const m = heightCm / 100;
            const bmi = m > 0 ? weightKg / (m * m) : 0;
            let cat = 'Obese';
            if (bmi < 18.5)
                cat = 'Underweight';
            else if (bmi < 25)
                cat = 'Normal';
            else if (bmi < 30)
                cat = 'Overweight';
            return {
                summary: [
                    ['BMI', fmt(bmi, 1)],
                    ['Category', cat]
                ]
            };
        }
    },
    calorie: {
        title: 'Calorie',
        category: 'fitness',
        blurb: 'Harris–Benedict BMR × activity for daily calorie needs.',
        fields: [
            {
                id: 'unit',
                label: 'System',
                type: 'select',
                options: [
                    ['metric', 'Metric (kg, cm)'],
                    ['imperial', 'Imperial (lbs, inches)']
                ]
            },
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
            { id: 'weight', label: 'Weight', type: 'number', value: 70 },
            { id: 'height', label: 'Height', type: 'number', value: 170 },
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
            let w = num(v.weight);
            let h = num(v.height);
            if (v.unit === 'imperial') {
                w = w * 0.453592;
                h = h * 2.54;
            }
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
        title: 'Body Fat',
        category: 'fitness',
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
            }
            else {
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
        title: 'BMR',
        category: 'fitness',
        blurb: 'Basal Metabolic Rate (Mifflin–St Jeor).',
        fields: [
            {
                id: 'unit',
                label: 'System',
                type: 'select',
                options: [
                    ['metric', 'Metric (kg, cm)'],
                    ['imperial', 'Imperial (lbs, inches)']
                ]
            },
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
            { id: 'weight', label: 'Weight', type: 'number', value: 70 },
            { id: 'height', label: 'Height', type: 'number', value: 170 }
        ],
        compute: (v) => {
            let w = num(v.weight);
            let h = num(v.height);
            if (v.unit === 'imperial') {
                w = w * 0.453592;
                h = h * 2.54;
            }
            const bmr = v.sex === 'male'
                ? 10 * w + 6.25 * h - 5 * num(v.age) + 5
                : 10 * w + 6.25 * h - 5 * num(v.age) - 161;
            return { summary: [['BMR (kcal/day)', fmt(bmr, 0)]] };
        }
    },
    'ideal-weight': {
        title: 'Ideal Weight',
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
        title: 'Pace',
        category: 'fitness',
        blurb: 'Running pace from distance and time.',
        fields: [
            {
                id: 'unit',
                label: 'System',
                type: 'select',
                options: [
                    ['metric', 'Metric (km)'],
                    ['imperial', 'Imperial (miles)']
                ]
            },
            { id: 'distance', label: 'Distance', type: 'number', value: 5, step: 0.1 },
            { id: 'minutes', label: 'Time (minutes)', type: 'number', value: 28, step: 0.1 }
        ],
        compute: (v) => {
            const dist = num(v.distance) || 0.1;
            const pace = num(v.minutes) / dist;
            const speed = dist / (num(v.minutes) / 60);
            const min = Math.floor(pace);
            const sec = Math.round((pace - min) * 60);
            const label = v.unit === 'imperial' ? ' / mile' : ' / km';
            const speedLabel = v.unit === 'imperial' ? 'Speed mph' : 'Speed km/h';
            return {
                summary: [
                    ['Pace', min + ':' + String(sec).padStart(2, '0') + label],
                    [speedLabel, fmt(speed, 2)]
                ]
            };
        }
    },
    pregnancy: {
        title: 'Pregnancy',
        category: 'pregnancy',
        blurb: 'Estimate current week from last menstrual period (LMP).',
        fields: [{ id: 'lmp', label: 'LMP date', type: 'date', value: '' }],
        compute: (v) => {
            const lmp = new Date(v.lmp);
            if (isNaN(lmp))
                return { summary: [['Error', 'Enter a valid LMP date']] };
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
        title: 'Pregnancy Conception',
        category: 'pregnancy',
        blurb: 'Estimated conception window from LMP (≈ LMP + 14 days).',
        fields: [{ id: 'lmp', label: 'LMP date', type: 'date', value: '' }],
        compute: (v) => {
            const lmp = new Date(v.lmp);
            if (isNaN(lmp))
                return { summary: [['Error', 'Enter a valid LMP date']] };
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
        title: 'Due Date',
        category: 'pregnancy',
        blurb: 'Naegele’s rule: LMP + 280 days.',
        fields: [{ id: 'lmp', label: 'LMP date', type: 'date', value: '' }],
        compute: (v) => {
            const lmp = new Date(v.lmp);
            if (isNaN(lmp))
                return { summary: [['Error', 'Enter a valid LMP date']] };
            const due = new Date(lmp);
            due.setDate(due.getDate() + 280);
            return { summary: [['Estimated due date', due.toISOString().slice(0, 10)]] };
        }
    },
    /* ——— Math ——— */
    scientific: {
        title: 'Scientific',
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
            }
            catch (e) {
                return { summary: [['Error', e.message || 'Invalid expression']] };
            }
        }
    },
    fraction: {
        title: 'Fraction',
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
            }
            else if (v.op === '-') {
                n = n1 * d2 - n2 * d1;
                d = d1 * d2;
            }
            else if (v.op === '*') {
                n = n1 * n2;
                d = d1 * d2;
            }
            else {
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
        title: 'Percentage',
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
            if (v.mode === 'of')
                return { summary: [['Result', fmt((x / 100) * y, 4)]] };
            if (v.mode === 'is')
                return { summary: [['Result %', fmt(y ? (x / y) * 100 : 0, 4)]] };
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
            for (let i = 0; i < count; i++)
                out.push(Math.floor(Math.random() * (max - min + 1)) + min);
            return { summary: [['Numbers', out.join(', ')]] };
        }
    },
    triangle: {
        title: 'Triangle',
        category: 'geometry',
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
        title: 'Standard Deviation',
        category: 'statistics',
        blurb: 'Population & sample standard deviation from a list.',
        fields: [{ id: 'data', label: 'Numbers (comma or space separated)', type: 'text', value: '2, 4, 4, 4, 5, 5, 7, 9' }],
        compute: (v) => {
            const arr = String(v.data)
                .split(/[\s,]+/)
                .filter(Boolean)
                .map(Number)
                .filter((n) => Number.isFinite(n));
            const n = arr.length;
            if (!n)
                return { summary: [['Error', 'Enter numbers']] };
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
        title: 'Age',
        category: 'date-and-time',
        blurb: 'Exact age from date of birth.',
        fields: [{ id: 'dob', label: 'Date of birth', type: 'date', value: '' }],
        compute: (v) => {
            const dob = new Date(v.dob);
            if (isNaN(dob))
                return { summary: [['Error', 'Enter DOB']] };
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
        title: 'Date',
        category: 'date-and-time',
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
            if (isNaN(d1))
                return { summary: [['Error', 'Enter start date']] };
            if (v.mode === 'diff') {
                const d2 = new Date(v.d2);
                if (isNaN(d2))
                    return { summary: [['Error', 'Enter end date']] };
                const days = Math.round((d2 - d1) / 86400000);
                return { summary: [['Difference (days)', String(days)]] };
            }
            const out = new Date(d1);
            out.setDate(out.getDate() + Math.round(num(v.days)));
            return { summary: [['Result date', out.toISOString().slice(0, 10)]] };
        }
    },
    time: {
        title: 'Time',
        category: 'date-and-time',
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
            let total = (num(v.h1) + num(v.h2)) * 3600 + (num(v.m1) + num(v.m2)) * 60 + num(v.s1) + num(v.s2);
            const h = Math.floor(total / 3600);
            total %= 3600;
            const m = Math.floor(total / 60);
            const s = total % 60;
            return { summary: [['Sum', h + 'h ' + m + 'm ' + s + 's']] };
        }
    },
    hours: {
        title: 'Hours',
        category: 'date-and-time',
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
            if (mins < 0)
                mins += 24 * 60;
            return {
                summary: [
                    ['Minutes', String(mins)],
                    ['Hours', fmt(mins / 60, 2)]
                ]
            };
        }
    },
    gpa: {
        title: 'GPA',
        category: 'education',
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
        title: 'Grade',
        category: 'education',
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
        title: 'Concrete',
        category: 'construction',
        blurb: 'Slab concrete volume in cubic meters / cubic feet.',
        fields: [
            { id: 'l', label: 'Length (m)', type: 'number', value: 5, step: 0.01 },
            { id: 'w', label: 'Width (m)', type: 'number', value: 4, step: 0.01 },
            { id: 'd', label: 'Depth (m)', type: 'number', value: 0.15, step: 0.01 },
            { id: 'wastage', label: 'Wastage Margin (%)', type: 'number', value: 10, step: 1 }
        ],
        compute: (v) => {
            const m3 = num(v.l) * num(v.w) * num(v.d);
            const wastage = 1 + (num(v.wastage) / 100);
            const m3Total = m3 * wastage;
            return {
                summary: [
                    ['Net Volume (m³)', fmt(m3, 3)],
                    ['Order Volume w/ Wastage (m³)', fmt(m3Total, 3)],
                    ['Order Volume (ft³)', fmt(m3Total * 35.3147, 2)]
                ]
            };
        }
    },
    subnet: {
        title: 'Subnet',
        category: 'networking',
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
            let ipClass = 'Unknown';
            if (parts[0] >= 1 && parts[0] <= 126)
                ipClass = 'A';
            else if (parts[0] >= 128 && parts[0] <= 191)
                ipClass = 'B';
            else if (parts[0] >= 192 && parts[0] <= 223)
                ipClass = 'C';
            else if (parts[0] >= 224 && parts[0] <= 239)
                ipClass = 'D (Multicast)';
            else if (parts[0] >= 240 && parts[0] <= 255)
                ipClass = 'E (Experimental)';
            return {
                summary: [
                    ['IP Class', ipClass],
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
        category: 'security',
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
                all: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*-_.',
                alnum: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
                alpha: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
            };
            const chars = sets[v.set] || sets.all;
            const len = Math.min(128, Math.max(4, Math.round(Number(v.len))));
            let out = '';
            for (let i = 0; i < len; i++)
                out += chars[Math.floor(Math.random() * chars.length)];
            return { summary: [['Password', out]] };
        }
    },
    conversion: {
        title: 'Unit Conversion',
        category: 'conversion',
        blurb: 'Common unit conversions.',
        fields: (v) => {
            const UnitDict = {
                Length: {
                    base: 'Meter (m)',
                    units: {
                        'Kilometer (km)': 1000,
                        'Meter (m)': 1,
                        'Centimeter (cm)': 0.01,
                        'Millimeter (mm)': 0.001,
                        'Micrometer (μm)': 0.000001,
                        'Nanometer (nm)': 0.000000001,
                        'Mile (mi)': 1609.344,
                        'Yard (yd)': 0.9144,
                        'Foot (ft)': 0.3048,
                        'Inch (in)': 0.0254,
                        'Nautical Mile (NM)': 1852
                    }
                },
                Area: {
                    base: 'Square Meter (sq m)',
                    units: {
                        'Square Kilometer (sq km)': 1000000,
                        'Square Meter (sq m)': 1,
                        'Square Centimeter (sq cm)': 0.0001,
                        'Hectare (ha)': 10000,
                        'Acre (ac)': 4046.85642,
                        'Square Mile (sq mi)': 2589988.11,
                        'Square Yard (sq yd)': 0.83612736,
                        'Square Foot (sq ft)': 0.09290304,
                        'Square Inch (sq in)': 0.00064516
                    }
                },
                Weight: {
                    base: 'Kilogram (kg)',
                    units: {
                        'Metric Ton (mt)': 1000,
                        'Kilogram (kg)': 1,
                        'Gram (g)': 0.001,
                        'Milligram (mg)': 0.000001,
                        'Pound (lb)': 0.45359237,
                        'Ounce (oz)': 0.02834952,
                        'Ton (US/Short)': 907.18474,
                        'Ton (UK/Long)': 1016.04691
                    }
                },
                Volume: {
                    base: 'Liter (L)',
                    units: {
                        'Cubic Meter (m³)': 1000,
                        'Liter (L)': 1,
                        'Milliliter (mL)': 0.001,
                        'Gallon (US)': 3.78541178,
                        'Gallon (UK)': 4.54609,
                        'Quart (US)': 0.946352946,
                        'Pint (US)': 0.473176473,
                        'Fluid Ounce (US)': 0.0295735296,
                        'Cubic Foot (ft³)': 28.3168466,
                        'Cubic Inch (in³)': 0.016387064
                    }
                },
                Temperature: {
                    base: 'custom',
                    units: {
                        'Celsius (°C)': 'C',
                        'Fahrenheit (°F)': 'F',
                        'Kelvin (K)': 'K'
                    }
                },
                Time: {
                    base: 'Second (s)',
                    units: {
                        'Year (365 days)': 31536000,
                        'Month (30 days)': 2592000,
                        'Week': 604800,
                        'Day': 86400,
                        'Hour (h)': 3600,
                        'Minute (min)': 60,
                        'Second (s)': 1,
                        'Millisecond (ms)': 0.001
                    }
                },
                Speed: {
                    base: 'Meter per second (m/s)',
                    units: {
                        'Meter per second (m/s)': 1,
                        'Kilometer per hour (km/h)': 0.277777778,
                        'Mile per hour (mph)': 0.44704,
                        'Foot per second (ft/s)': 0.3048,
                        'Knot (kn)': 0.514444444
                    }
                }
            };
            const categories = Object.keys(UnitDict);
            const category = v.category || categories[0];
            const units = Object.keys(UnitDict[category].units);
            return [
                {
                    id: 'category',
                    label: 'Category',
                    type: 'select',
                    value: category,
                    options: categories.map(c => [c, c])
                },
                {
                    id: 'fromUnit',
                    label: 'From Unit',
                    type: 'select',
                    value: units[0],
                    options: units.map(u => [u, u])
                },
                {
                    id: 'toUnit',
                    label: 'To Unit',
                    type: 'select',
                    value: units[1] || units[0],
                    options: units.map(u => [u, u])
                },
                { id: 'value', label: 'Value to Convert', type: 'number', value: 1, step: 0.01 }
            ];
        },
        compute: (v) => {
            const UnitDict = {
                Length: { units: { 'Kilometer (km)': 1000, 'Meter (m)': 1, 'Centimeter (cm)': 0.01, 'Millimeter (mm)': 0.001, 'Micrometer (μm)': 0.000001, 'Nanometer (nm)': 0.000000001, 'Mile (mi)': 1609.344, 'Yard (yd)': 0.9144, 'Foot (ft)': 0.3048, 'Inch (in)': 0.0254, 'Nautical Mile (NM)': 1852 } },
                Area: { units: { 'Square Kilometer (sq km)': 1000000, 'Square Meter (sq m)': 1, 'Square Centimeter (sq cm)': 0.0001, 'Hectare (ha)': 10000, 'Acre (ac)': 4046.85642, 'Square Mile (sq mi)': 2589988.11, 'Square Yard (sq yd)': 0.83612736, 'Square Foot (sq ft)': 0.09290304, 'Square Inch (sq in)': 0.00064516 } },
                Weight: { units: { 'Metric Ton (mt)': 1000, 'Kilogram (kg)': 1, 'Gram (g)': 0.001, 'Milligram (mg)': 0.000001, 'Pound (lb)': 0.45359237, 'Ounce (oz)': 0.02834952, 'Ton (US/Short)': 907.18474, 'Ton (UK/Long)': 1016.04691 } },
                Volume: { units: { 'Cubic Meter (m³)': 1000, 'Liter (L)': 1, 'Milliliter (mL)': 0.001, 'Gallon (US)': 3.78541178, 'Gallon (UK)': 4.54609, 'Quart (US)': 0.946352946, 'Pint (US)': 0.473176473, 'Fluid Ounce (US)': 0.0295735296, 'Cubic Foot (ft³)': 28.3168466, 'Cubic Inch (in³)': 0.016387064 } },
                Temperature: { units: { 'Celsius (°C)': 'C', 'Fahrenheit (°F)': 'F', 'Kelvin (K)': 'K' } },
                Time: { units: { 'Year (365 days)': 31536000, 'Month (30 days)': 2592000, 'Week': 604800, 'Day': 86400, 'Hour (h)': 3600, 'Minute (min)': 60, 'Second (s)': 1, 'Millisecond (ms)': 0.001 } },
                Speed: { units: { 'Meter per second (m/s)': 1, 'Kilometer per hour (km/h)': 0.277777778, 'Mile per hour (mph)': 0.44704, 'Foot per second (ft/s)': 0.3048, 'Knot (kn)': 0.514444444 } }
            };
            const cat = v.category || 'Length';
            const from = v.fromUnit;
            const to = v.toUnit;
            const val = Number(v.value) || 0;
            let result = 0;
            if (cat === 'Temperature') {
                let celsius = val;
                if (from === 'Fahrenheit (°F)')
                    celsius = (val - 32) * 5 / 9;
                else if (from === 'Kelvin (K)')
                    celsius = val - 273.15;
                if (to === 'Celsius (°C)')
                    result = celsius;
                else if (to === 'Fahrenheit (°F)')
                    result = (celsius * 9 / 5) + 32;
                else if (to === 'Kelvin (K)')
                    result = celsius + 273.15;
            }
            else {
                const catData = UnitDict[cat];
                if (!catData || !catData.units[from] || !catData.units[to])
                    return { summary: [['Result', 'Invalid Input']] };
                const baseValue = val * catData.units[from];
                result = baseValue / catData.units[to];
            }
            const resStr = Math.abs(result) < 0.0001 || Math.abs(result) > 1000000
                ? result.toExponential(4)
                : Number.isInteger(result) ? String(result) : result.toFixed(4);
            return { summary: [['Converted Result', resStr + ' ' + to.split('(')[0].trim()]] };
        }
    }
};

  const NAV = {};
  Object.keys(CATALOG).forEach(key => {
    const cat = CATALOG[key].category || 'other';
    if (!NAV[cat]) NAV[cat] = [];
    NAV[cat].push([key, CATALOG[key].title]);
  });

  function hrefFor(key) {
    if (key === 'emi') return '/finance/emi.html';
    if (key === 'fire') return '/finance/fire.html';
    const cat = (CATALOG[key] && CATALOG[key].category) || 'other';
    let folder = 'other';
    if (['finance', 'loan', 'investment', 'tax'].includes(cat)) folder = 'finance';
    else if (['health', 'fitness', 'pregnancy', 'lifestyle'].includes(cat)) folder = 'health';
    else if (['math', 'geometry', 'statistics'].includes(cat)) folder = 'math';
    return '/' + folder + '/' + key + '.html';
  }

  // Bind KB dynamically if it exists in the web context
  if (typeof KB !== 'undefined') {
    Object.keys(CATALOG).forEach(key => { if (KB[key]) CATALOG[key].kb = KB[key]; });
  }

  global.BTB_CALCS = { CATALOG: CATALOG, NAV: NAV, hrefFor: hrefFor, fmt: fmt };
})(window);
