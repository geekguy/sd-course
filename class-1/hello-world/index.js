require("dd-trace").init();
const express = require("express");
const app = express();
const fs = require("fs");
const port = 3000;
const maxIterations = 1000;
let currentRequestId = 1;
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://139.59.24.154:27017/";
let mongoConnection;

app.get("/", (req, res) => {
  console.log(`processing request - ${currentRequestId}`);
  currentRequestId += 1;
  for (let i = 0; i < maxIterations; i++) {
    fs.writeFileSync("/tmp/dummy.log", `#{${i}}`);
  }
  res.send("Hello World!");
});

app.get("/test", async (req, res) => {
  console.log(`processing request - ${currentRequestId}`);
  currentRequestId += 1;

  // Random mongo call
  const dbo = mongoConnection.db("mydb");
  const query = { address: "Park Lane 38" };

  const result = dbo.collection("customers").find(query);
  console.log(await result.toArray());
  // mongo call end
  res.send("Hello test!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

MongoClient.connect(url, function (err, db) {
  console.log(err);
  if (err) throw err;
  mongoConnection = db;
});
