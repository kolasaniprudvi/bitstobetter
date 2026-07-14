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
  Currency: {
    base: 'USD',
    units: {
      'US Dollar (USD)': 1,
      'Euro (EUR)': 0.92,
      'British Pound (GBP)': 0.79,
      'Indian Rupee (INR)': 83.50,
      'Canadian Dollar (CAD)': 1.37,
      'Australian Dollar (AUD)': 1.53,
      'Japanese Yen (JPY)': 155.00,
      'Swiss Franc (CHF)': 0.91,
      'Chinese Yuan (CNY)': 7.24,
      'Singapore Dollar (SGD)': 1.35
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
      'Knot (kn)': 0.514444444,
      'Foot per second (ft/s)': 0.3048
    }
  },
  Pressure: {
    base: 'Pascal (Pa)',
    units: {
      'Pascal (Pa)': 1,
      'Kilopascal (kPa)': 1000,
      'Bar (bar)': 100000,
      'Pound per square inch (psi)': 6894.75729,
      'Standard atmosphere (atm)': 101325,
      'Torr (mmHg)': 133.322368
    }
  },
  Force: {
    base: 'Newton (N)',
    units: {
      'Newton (N)': 1,
      'Kilonewton (kN)': 1000,
      'Pound-force (lbf)': 4.44822162,
      'Kilogram-force (kgf)': 9.80665
    }
  },
  'Work & Energy': {
    base: 'Joule (J)',
    units: {
      'Joule (J)': 1,
      'Kilojoule (kJ)': 1000,
      'Calorie (cal)': 4.184,
      'Kilocalorie (kcal / food cal)': 4184,
      'Watt-hour (Wh)': 3600,
      'Kilowatt-hour (kWh)': 3600000,
      'British Thermal Unit (BTU)': 1055.05585
    }
  },
  Power: {
    base: 'Watt (W)',
    units: {
      'Watt (W)': 1,
      'Kilowatt (kW)': 1000,
      'Megawatt (MW)': 1000000,
      'Horsepower (HP, mechanical)': 745.699872,
      'Horsepower (HP, metric)': 735.49875,
      'BTU per hour (BTU/hr)': 0.293071
    }
  },
  Cooking: {
    base: 'Milliliter (mL)',
    units: {
      'Teaspoon (tsp)': 4.92892,
      'Tablespoon (tbsp)': 14.7868,
      'Cup (US)': 240,
      'Fluid Ounce (fl oz)': 29.5735,
      'Pint (US pt)': 473.176,
      'Quart (US qt)': 946.353,
      'Gallon (US gal)': 3785.41,
      'Milliliter (mL)': 1,
      'Liter (L)': 1000
    }
  },
  Data: {
    base: 'Byte (B)',
    units: {
      'Bit (b)': 0.125,
      'Byte (B)': 1,
      'Kilobyte (KB - 1000 bytes)': 1000,
      'Megabyte (MB)': 1000000,
      'Gigabyte (GB)': 1000000000,
      'Terabyte (TB)': 1000000000000,
      'Kibibyte (KiB - 1024 bytes)': 1024,
      'Mebibyte (MiB)': 1048576,
      'Gibibyte (GiB)': 1073741824,
      'Tebibyte (TiB)': 1099511627776
    }
  },
  'Fuel Economy': {
    base: 'custom',
    units: {
      'Miles per gallon (US)': 'mpg_us',
      'Miles per gallon (UK)': 'mpg_uk',
      'Kilometers per liter (km/L)': 'kml',
      'Liters per 100 km (L/100km)': 'l100km'
    }
  },
  Torque: {
    base: 'Newton meter (N·m)',
    units: {
      'Newton meter (N·m)': 1,
      'Pound-foot (lbf·ft)': 1.35581795,
      'Pound-inch (lbf·in)': 0.112984829,
      'Kilogram-meter (kgf·m)': 9.80665
    }
  }
};

document.addEventListener('DOMContentLoaded', function() {
  const root = document.getElementById('calc-root');
  if (!root) return;

  root.innerHTML = `
    <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
      <div class="mb-6">
        <label class="block text-sm font-semibold text-slate-700 mb-2">Category</label>
        <select id="uc-category" class="w-full sm:w-1/2 bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition-shadow font-medium text-lg"></select>
      </div>

      <div class="grid md:grid-cols-2 gap-8 items-center">
        <!-- From -->
        <div class="space-y-4">
          <label class="block text-sm font-semibold text-slate-700">From</label>
          <input type="number" id="uc-from-val" value="1" class="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 text-2xl font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner">
          <select id="uc-from-unit" class="w-full bg-white border border-slate-300 rounded-lg px-4 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"></select>
        </div>

        <!-- To -->
        <div class="space-y-4">
          <label class="block text-sm font-semibold text-slate-700">To</label>
          <input type="number" id="uc-to-val" class="w-full bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3 text-2xl font-bold text-emerald-700 focus:bg-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-inner">
          <select id="uc-to-unit" class="w-full bg-white border border-slate-300 rounded-lg px-4 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"></select>
        </div>
      </div>

      <div class="mt-8 pt-6 border-t border-slate-200">
        <div class="bg-indigo-50 border border-indigo-100 rounded-xl p-4 flex items-center gap-3">
          <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <p class="text-indigo-900 font-mono text-sm m-0 font-medium" id="uc-formula"></p>
        </div>
      </div>
    </div>
  `;

  const catSel = document.getElementById('uc-category');
  const fromVal = document.getElementById('uc-from-val');
  const toVal = document.getElementById('uc-to-val');
  const fromUnit = document.getElementById('uc-from-unit');
  const toUnit = document.getElementById('uc-to-unit');
  const formula = document.getElementById('uc-formula');

  let activeCat = 'Length';
  
  // Populate Categories
  Object.keys(UnitDict).forEach(k => {
    const opt = document.createElement('option');
    opt.value = k;
    opt.textContent = k;
    catSel.appendChild(opt);
  });

  function populateUnits() {
    activeCat = catSel.value;
    const catData = UnitDict[activeCat];
    
    fromUnit.innerHTML = '';
    toUnit.innerHTML = '';
    
    let i = 0;
    Object.keys(catData.units).forEach(u => {
      const o1 = document.createElement('option');
      o1.value = u;
      o1.textContent = u;
      fromUnit.appendChild(o1);

      const o2 = document.createElement('option');
      o2.value = u;
      o2.textContent = u;
      toUnit.appendChild(o2);

      if (i === 1) toUnit.value = u; // Select second option for 'to' if available
      i++;
    });
    
    // Auto-select sensible defaults if available
    if (activeCat === 'Currency' && catData.units['US Dollar (USD)']) {
      fromUnit.value = 'US Dollar (USD)';
      toUnit.value = 'Euro (EUR)';
    }
  }

  function handleTemp(val, from, to) {
    let c;
    if (from === 'C') c = val;
    else if (from === 'F') c = (val - 32) * 5/9;
    else if (from === 'K') c = val - 273.15;

    if (to === 'C') return c;
    if (to === 'F') return (c * 9/5) + 32;
    if (to === 'K') return c + 273.15;
  }

  function handleFuel(val, from, to) {
    // Convert everything to L/100km first
    let l100;
    if (from === 'l100km') l100 = val;
    else if (from === 'kml') l100 = 100 / val;
    else if (from === 'mpg_us') l100 = 235.215 / val;
    else if (from === 'mpg_uk') l100 = 282.481 / val;

    if (to === 'l100km') return l100;
    if (to === 'kml') return 100 / l100;
    if (to === 'mpg_us') return 235.215 / l100;
    if (to === 'mpg_uk') return 282.481 / l100;
  }

  function formatFormula(baseMultiplier, fromStr, toStr) {
    if (activeCat === 'Temperature') {
      formula.textContent = 'Non-linear conversion using algebraic formulas.';
      return;
    }
    if (activeCat === 'Fuel Economy') {
      formula.textContent = 'Inverse non-linear conversion (distance/volume vs volume/distance).';
      return;
    }
    
    const factor = baseMultiplier;
    // Format factor nicely
    let prettyFactor = factor.toLocaleString('en-US', {maximumFractionDigits: 6, minimumFractionDigits: 0});
    if (factor < 0.000001) prettyFactor = factor.toExponential(4);
    
    formula.textContent = `1 ${fromStr.split(' (')[0]} = ${prettyFactor} ${toStr.split(' (')[0]}`;
  }

  function convert(reverse = false) {
    const fU = fromUnit.value;
    const tU = toUnit.value;
    const catData = UnitDict[activeCat];

    let sourceVal = parseFloat(reverse ? toVal.value : fromVal.value);
    if (isNaN(sourceVal)) {
        if (reverse) fromVal.value = '';
        else toVal.value = '';
        return;
    }

    let result;

    if (catData.base === 'custom') {
        const cFrom = catData.units[reverse ? tU : fU];
        const cTo = catData.units[reverse ? fU : tU];
        
        if (activeCat === 'Temperature') {
            result = handleTemp(sourceVal, cFrom, cTo);
        } else if (activeCat === 'Fuel Economy') {
            result = handleFuel(sourceVal, cFrom, cTo);
        }
    } else {
        const factorFrom = catData.units[reverse ? tU : fU];
        const factorTo = catData.units[reverse ? fU : tU];
        
        // Convert to base, then to target
        const inBase = sourceVal * factorFrom;
        result = inBase / factorTo;

        if (!reverse) formatFormula(factorFrom / factorTo, fU, tU);
        else formatFormula(factorTo / factorFrom, tU, fU); // If typing in reverse, still show normal formula orientation
    }

    // Format output
    let finalStr;
    if (Math.abs(result) > 1e9 || (Math.abs(result) < 1e-6 && result !== 0)) {
        finalStr = result.toExponential(4);
    } else {
        // limit to 6 decimals, strip trailing zeroes
        finalStr = parseFloat(result.toFixed(6)).toString();
    }

    if (reverse) fromVal.value = finalStr;
    else toVal.value = finalStr;
  }

  catSel.addEventListener('change', () => {
    populateUnits();
    convert();
  });

  fromUnit.addEventListener('change', () => convert(false));
  toUnit.addEventListener('change', () => convert(false));
  
  fromVal.addEventListener('input', () => convert(false));
  toVal.addEventListener('input', () => convert(true));

  // Init
  populateUnits();
  convert();
});
