require("dotenv").config();
var bcrypt = require("bcryptjs");
const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    const inputText = "";
    const mySecret = "";
    res.render('hash', { inputText, mySecret });
})
app.get("/compare", (req, res) => {
    const inputText = "";
    const inputHash = "";
    const output = "";
    res.render('compare', { inputText, inputHash, output });
})

app.post("/hashing", async (req, res) => {
    const { inputText } = req.body;
    const mySecret = await bcrypt.hash(inputText, 10);
    res.render('hash', { inputText, mySecret });
})

app.post("/comparing", async (req, res) => {
    const { inputText, inputHash } = req.body;
    let output = "incorrect";
    if (await bcrypt.compare(inputText, inputHash)) {
        output = "correct";
    };
    res.render('compare', { inputText, inputHash, output });
})

module.exports = app;