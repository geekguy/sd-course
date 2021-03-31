require("dd-trace").init();
const express = require("express");
const app = express();
const fs = require("fs");
const port = 3000;
const maxIterations = 1000;
let currentRequestId = 1;
// const MongoClient = require("mongodb").MongoClient;
// const url = "mongodb://139.59.24.154:27017/";
// const Redis = require("ioredis");
// const redisClient = new Redis(
//   "rediss://default:iqh4dpoq463wxy9e@db-redis-blr1-12653-do-user-8704168-0.b.db.ondigitalocean.com:25061"
// );

// redisClient.auth("iqh4dpoq463wxy9e");

let mongoConnection;

app.get("/", (req, res) => {
  console.log(`processing request - ${currentRequestId}`);
  currentRequestId += 1;
  for (let i = 0; i < maxIterations; i++) {
    fs.writeFileSync("/tmp/dummy.log", `#{${i}}`);
  }
  res.send("Hello World!");
});

// app.get("/test", async (req, res) => {
//   console.log(`processing request - ${currentRequestId}`);
//   currentRequestId += 1;
//   // random redis call
//   await redisClient.set("foo", new Date());

//   // Random mongo call
//   const dbo = mongoConnection.db("mydb");
//   const query = { address: "Park Lane 38" };

//   const result = dbo.collection("customers").find(query);
//   console.log(await result.toArray());
//   // mongo call end

//   // another random redis call
//   const foo = await redisClient.get("foo");

//   console.log(foo);
//   res.send(`Hello test!, ${foo}`);
// });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// MongoClient.connect(url, function (err, db) {
//   console.log(err);
//   if (err) throw err;
//   mongoConnection = db;
// });
