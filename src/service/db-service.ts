import { Config, JsonDB } from "node-json-db";

const config = new Config("./db/db.json", true, true, "/");
const dbService = new JsonDB(config);

export default dbService;
