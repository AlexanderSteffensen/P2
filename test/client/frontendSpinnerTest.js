import {addTestSuite} from "../AkvarioTest.js";
import {TestSuite} from "../testClasses.js";
import {spinnerSession, rotate, highlightUser} from "../../public/js/frontend-spinner.js";
import {AkvarioServer} from '../../scripts/AkvarioServer.js';


const testServer = new AkvarioServer();

const rotationAngle = 746; // 746 mod 360 = 26
const angle = 0;
const v = 1;
const part = 0.1;
const userAngles = {

    'user1' : 147.7533002545757,
    'user2' : 220.7515454706387,
    'user3' : 283.8846676852582,
    'user4' : 359.6327263926619,
    'user5' : 76.5618118416494

}
const testUsers = {

    'user1' : {
        color : "hsl(32, 100%, 62%)",
        position : {top : 594, left : 601},
        id : 1
    },
    'user2' : {
        color : "hsl(32, 100%, 56%)",
        position : {top : 338, left : 562},
        id : 2
    },
    'user3' : {
        color : "hsl(212, 100%, 56%)",
        position : {top : 322, left : 794},
        id : 3
    },
    'user4' : {
        color : "hsl(316, 100%, 56%)",
        position : {top : 499, left : 906},
        id : 4
    },
    'user5' : {
        color : "hsl(0, 100%, 44%)",
        position : { top : 613, left : 777},
        id : 5
    }

}





const testSuite = new TestSuite('backend-spinner.js');

testSuite.addFunctionTest(spinnerSession,[[userPos, spinnerPoints]], [expectedOutput]);

export function spinnerSessionTest(){
    return addTestSuite(testSuite);
}




