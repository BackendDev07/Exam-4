"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_json_db_1 = require("node-json-db");
const config = new node_json_db_1.Config("./db/db.json", true, true, "/");
const dbService = new node_json_db_1.JsonDB(config);
exports.default = dbService;
