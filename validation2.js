const fs = require('fs');
const vm = require('vm');
// Read and parse the JSON file
const jsonData = JSON.parse(fs.readFileSync('generated_test_cases.json', 'utf8'));
// Extract data
for(let i=0;i<jsonData.length;i++){
    const problem = jsonData[i];
    const problemStatement = problem.problemStatement;
    const code = problem.code;
    const testCases = problem.testCases;
    const validationScript = problem.validationScript;
    console.log('Problem statement:', problemStatement);
    // console.log('Code:', code);
    console.log('Test cases:', testCases);
    // Create a context for the VM to execute the code safely
    const context = {
    console: console,
    require: require,
    testCases: testCases
    };
    // Create a script with the code and validation script
    const scriptContent = `
    ${code}
    ${validationScript}
    `;
    // Run the script in the VM context
    vm.createContext(context);
    const script = new vm.Script(scriptContent);
    try {
    script.runInContext(context);
    console.log('All test cases validated successfully.');
    } catch (error) {
    console.error('Error validating test cases:', error);
    }
    console.log("-------------------------------------------------");
}
