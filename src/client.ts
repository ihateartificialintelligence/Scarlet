const express = require("express");
const fs = require("fs");
const https = require("https");
const http = require("http");
import { WebSocket } from "ws";
import auth_check from "./extra/auth-check";
import * as chain from "./blockchain";
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

export class App {
    static connectDatabase(url: string, options?: JSON) {
        mongoose.connect(url, (options || {
            useFindandModify: false,
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        }));
    }

    static runServer(port: any, host?: string){
        const app = express();
        const server = http.createServer(app);
        app.use(bodyParser.urlencoded({ extended: true }));

        app.get('/', (req:any, res:any) => {
            res.send({status: 200, message: 'OK'});
        })
        app.get('/api/v1/', (req:any, res: any) => {
            res.send({status: 200, message: "OK"});
        });

        server.listen(port, () => {
            console.log(`Server listening on ${server.address().address}:${server.address().port}`);
        });
    }

    static fullStart(port:any, url?:string, host?:string, options?:JSON) {
        console.time("Server Start Up");
        try {
            //this.connectDatabase(url);
            this.runServer(port);
            console.timeEnd("Server Start Up");
        } catch (e) {
            console.log(`Unexpected Error: \n${e.message}\n\n`)
        }
    }
}
