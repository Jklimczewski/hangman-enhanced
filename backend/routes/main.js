const express = require("express");
const fs = require("fs");
const keycloak = require("../keycloak-config");
const router = express.Router();
const wordList = require("../../wordList.json");

router.get("/words", keycloak.protect(), (req, res) => {
  res.send(wordList.map((word) => `${word} `).join(""));
});

router.post("/words", keycloak.protect(), (req, res) => {
  const pattern = req.body.pattern;
  const result = wordList.reduce((acc, curr) => {
    if (curr.includes(pattern)) acc.push(curr);
    return acc;
  }, []);
  res.send(result.map((word) => `${word} `).join(""));
});

router.post("/result", keycloak.protect(), (req, res) => {
  const word = req.body.word;
  const result = req.body.result;
  fs.writeFile(
    "logs.txt",
    word + " -> " + result + "\n",
    { flag: "a" },
    (err) => {
      if (err) throw err;
    }
  );
  res.sendStatus(200);
});

module.exports = router;
