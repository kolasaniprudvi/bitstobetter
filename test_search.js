const fs = require('fs');
const jsCode = fs.readFileSync('c:/Users/kolas/MyDirectory/Source Control/bitstobetter/assets/site.js', 'utf8');

// Extract the executeSearch function and the searchIndex array
const match = jsCode.match(/const searchIndex = \[[\s\S]*?\];/);
const searchIndexCode = match[0];

const execMatch = jsCode.match(/function executeSearch\(query\) \{[\s\S]*?\}/);
const execCode = execMatch[0];

// Evaluate them in global scope
eval(searchIndexCode);

// Mock classList for searchResults
const searchResults = { classList: { add: () => {}, remove: () => {} } };

eval(execCode);

const results = executeSearch('loan');
console.log('Results for "loan":', results.length);
console.log(results);

const results2 = executeSearch('mort');
console.log('Results for "mort":', results2.length);
console.log(results2);
