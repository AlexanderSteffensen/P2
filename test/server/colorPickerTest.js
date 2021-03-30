import {addTestSuite} from "../AkvarioTest.js";
import {TestSuite} from "../testClasses.js";
import {ColorPicker} from "../../public/js/ColorPicker.js";

const testSuite = new TestSuite("colorPicker.js");
const colorPicker = new ColorPicker();
function previewShade (color){
    return colorPicker.previewShade(color);
}

testSuite.addFunctionTest(previewShade,
    ["red", "orange", "yellow", "green", "cyan", "blue", "purple", "pink"],
    ["hsl(0, 100%, 74%)", "hsl(32, 100%, 74%)","hsl(60, 100%, 74%)","hsl(119, 100%, 74%)","hsl(179, 100%, 74%)","hsl(212, 100%, 74%)","hsl(275, 100%, 74%)","hsl(316, 100%, 74%)",])

export function colorPickerTest (){
    addTestSuite(testSuite);
}

//["red"], ["orange"], ["yellow"], ["green"], ["cyan"], ["blue"], ["purple"], ["pink"]