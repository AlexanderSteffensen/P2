import {proxiTest} from './client/proxiTest.js';
import {AkvarioTest} from './testClasses.js';
//import {akvarioServerTest} from './server/akvarioServerTest.js';
import {colorPickerTest} from "./server/colorPickerTest.js";

const test = new AkvarioTest();

export function addTestSuite(testSuite){
    test.addSuite(testSuite);
}

//akvarioServerTest();
proxiTest();
colorPickerTest();



test.test();

