const express = require("express");
const path = require("path");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const dbPath = path.join(__dirname, "seats.db");
let db = null;

const initializeAndConnect = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(5000, () => {
      console.log("Server Running at port 5000");
      console.log("Database Sqlite Connected");
    });
  } catch (err) {
    console.log(`Db Error ${err.message}`);
    process.exit(1);
  }
};

initializeAndConnect();

app.get("/seats", async (request, response) => {
    const dbQuery = `select * from layout`;
    const queryResult = await db.all(dbQuery);
    try {
        response.status(200).json({seats: queryResult});
    } catch(err) {
        response.status(500).json({errMsg: err.message});
    }
});