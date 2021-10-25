import express from "express";
import fs from "fs";
import https from "https";
import { WebSocket } from "ws";
import auth_check from "./extra/auth-check";
import * as chain from "./blockchain";

export class App {
    public express: express;
    constructor() {
        this.startServer();
    }

    public startServer(): void {
        this.express = express();

        const options:any = {
            key: fs.readFileSync(__dirname + "/agent2-key.pem"), 
            cert: fs.readFileSync(__dirname + "/agent2-cert.pem"),
        };

        const router = express.Router();
        router.all('/api/v1/', (req:any, res:any) => {
            res.send(`Test confirmed`);
        });
        this.express.use('/api/v1/', router);
        
        const server = https.createServer(options, this.express);
        server.listen(8080);

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