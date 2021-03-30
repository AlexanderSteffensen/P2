import express from 'express';
import {router} from "./scripts/routes.js";
import {createServer} from 'http';
import bodyParser from 'body-parser'
import {AkvarioServer} from "./scripts/AkvarioServer.js";
import {port, peerJSOptions} from './scripts/serverConfig.js'

const server = express();
const HTTPServer = createServer(server);

startServer();

export function startServer(akvarioServer){

    if (!akvarioServer)
        new AkvarioServer(HTTPServer, peerJSOptions);


    server.use(bodyParser.json())
    server.use(express.static('public'));
    server.use(router);
}

//listens to PORT set on top.
HTTPServer.listen(port, () => {
    console.log(`Server started @ *:${port}`);
});
