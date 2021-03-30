import {AkvarioServer} from '../../scripts/AkvarioServer.js';
import {startServer} from '../../server.js';
import {TestSuite} from '../testClasses.js';

const testServer = new AkvarioServer()

startServer(testServer);

const testSuite = new TestSuite('akvarioServer.js')

export function akvarioServerTest(){

}