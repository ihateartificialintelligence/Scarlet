const express = require("express");
const fs = require("fs");
const https = require("https");
const http = require("http");
import { WebSocket } from "ws";
import auth_check from "./extra/auth-check";
import * as chain from "./blockchain";

export class App {
    static startServer(): void {
        let app = express();

        const options:any = {
            key: fs.readFileSync(__dirname + "\\SSL\\agent2-key.pem"), 
            cert: fs.readFileSync(__dirname + "\\SSL\\agent2-cert.pem"),
        };

        app.get('/api/v1/', (req:any, res:any) => {
            res.send({ status: 200, message: 'Test confirmed' });
        });
        
        const server = http.createServer(/**options, */ app);
        server.listen(8080, () => {
            console.log(`listening on: ${server.address().address}:${server.address().port}`);
        });

        const wss = new WebSocket.Server({ server });

        wss.on("connection", (ws:any) => {
            console.log("Client has connected to the server");
            ws.send({ status: 200, body: {
                message: "Connection established",
            }});
            ws.on("chain_info", (ws:any) => {
                let check = auth_check.user(ws.data.token);
                switch (check) {
                    case true: 
                        return ws.send({ status: 200, body: {
                            message: "Authentication successful",
                            /**
                             * Query the database to get the user information
                             * containing the account information and balance
                             */
                            data: null,
                        }});
                    case false: 
                        return ws.send({ status: 401, body: {
                            message: "Authentication failed",
                            data: null,
                        }});
                    }
            })
        })
    }
}
