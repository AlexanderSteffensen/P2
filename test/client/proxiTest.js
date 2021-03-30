import {TestSuite} from '../testClasses.js';
import {addTestSuite} from '../AkvarioTest.js';
import {distance} from '../../public/js/proxi.js';


const point = {
        top : -7.96,
        left: 1.78
    }
const points = {
    B: {
        top : 3.66,
        left: -2.1
    },
    C: {
        top : 4.76,
        left: 2.78
    },
    D:{
        top : -3.7,
        left: -3.16
    },
    E:{
        top : -3.06,
        left: 3.72
    },
    F:{
        top : 0.84,
        left: -1.82
    },
    G:{
        top : 1,
        left: 3
    }
}

const expectedOutput = {
        // AB
        B: '12.2507',
        // AC
        C: '12.7592',
        // AD
        D: '6.5231',
        // AE
        E: '5.2701',
        // AF
        F: '9.5079',
        // AG
        G: '9.0427'
}

const testSuite = new TestSuite('proxi.js');

testSuite.addFunctionTest(distance,[[point, points]], [expectedOutput]);

export function proxiTest(){
    addTestSuite(testSuite);
}
