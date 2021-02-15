const express = require("express");
const app = express();
const fs = require("fs");
const port = 3000;
const maxIterations = 1000;
let currentRequestId = 1;

app.get("/", (req, res) => {
  console.log(`processing request - ${currentRequestId}`);
  currentRequestId += 1;
  for (let i = 0; i < maxIterations; i++) {
    fs.writeFileSync("/tmp/dummy.log", `#{${i}}`);
  }
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
