import assert from 'assert';

export class AkvarioTest{
    suites = [];

    // Called when the user creates a new test.
    constructor() {

    }

    addSuite(suite){
        this.suites.push(suite);
    }

    test(){
        for (const suite of this.suites) {
            suite.run()
        }
    }
}

export class TestSuite{
    // How many decimals of precision is needed?
    precision = 4;
    suiteName;
    tests = [];
    fails = [];
    warnings = [];

    constructor(name) {
        this.suiteName = name;
    }


    addFunctionTest(func, inputs, outputs){
        assert(inputs.length === outputs.length);
        this.tests.push(() => {
            for (let i = 0; i < inputs.length; i++) {
                // The input and output for this test.
                const input  = inputs[i];
                const output = outputs[i];

                let result;
                if (typeof input === 'string')
                    result = func(input);
                else
                    result = func(...input);

                try{
                    if (typeof result === 'object'){
                        if (!isEqual(result, output))
                            throw new assert.AssertionError({
                                actual: result,
                                expected: output,
                                operator: 'strictEqual'
                            });
                    }
                    else assert.strictEqual(result, output);
                }
                catch (err){
                    this.fails.push(
                        `${func.name} has failed in ${this.suiteName}!\n
                        Received input : ${JSON.stringify(input)}\n
                        Got output     : ${JSON.stringify(err.actual)}\n
                        Expected output: ${JSON.stringify(output)}\n`
                    );
                }

            }
        });
    }

    run(){
        this.fails = [];
        this.tests.forEach(test => test())
        this.showResults();
    }

    showResults() {
        const fails = this.fails.length;
        const warnings = this.warnings.length;
        const status = `Test of ${this.suiteName} completed with ${fails} error${fails===1? '' : 's'} and ${warnings} warning${warnings===1? '' : 's'}${fails + warnings? '!' : '.'}`

        console.log(status);

        if (fails) console.log('**** Fails ****')
        for (const fail of this.fails) {
            console.error(fail);
        }
        for (const warning of this.warnings) {
            console.warn(warning)
        }
    }
}

function isEqual(obj1, obj2){
    const keys = Object.keys(obj1);
    if(keys.length === Object.keys(obj2).length){
        for (const key of keys) {
            if(obj1[key] !== obj2[key]) {
                return false;
            }
        }
        return true;
    }
    else return false;
}