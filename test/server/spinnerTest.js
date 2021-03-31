import {addTestSuite} from "../AkvarioTest.js";
import {TestSuite} from "../testClasses.js";
import {spin} from "../../scripts/backend-spinner.js";


const userPos = {
    'User1' : {
        top : 594,
        left : 601
    },
    'User2' : {
        top : 338,
        left : 562
    },
    'User3' : {
        top : 322,
        left : 794
    },
    'User4' : {
        top : 499,
        left : 906
    },
    'User5' : {
        top : 613,
        left : 777
    }
}

const spinnerPos = {
    top : 500, left : 750
}

const expectedOutput = {
    winner : 'User1',
    rot: isFinite(),
    userAngles: {
        'User1' : 147.7533002545757,
        'User2' : 220.7515454706387,
        'User3' : 283.8846676852582,
        'User4' : 359.6327263926619,
        'User5' : 76.5618118416494
    }
}

const testSuite = new TestSuite('backend-spinner.js');

testSuite.addFunctionTest(spin,[[userPos, spinnerPoints]], [expectedOutput]);

export function backendSpinnerTest(){
    addTestSuite(testSuite);
}