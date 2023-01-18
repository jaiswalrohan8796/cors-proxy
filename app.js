const express = require("express");
const request = require("request");

const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
    const userAgent = req.get('user-agent');
    res.header("User-Agent", userAgent)
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.get("/", (req, res, next) => {
    const url =
        "http://newsapi.org/v2/top-headlines?country=in&apiKey=8a23bbf32e024b5b98c24ebfd1cfb188";
    request(url).pipe(res);
});
app.get("/sources", (req, res, next) => {
    const url =
        "http://newsapi.org/v2/sources?language=en&apiKey=8a23bbf32e024b5b98c24ebfd1cfb188";
    request(url).pipe(res);
});

app.get("/search/:query", (req, res, next) => {
    const query = req.params.query;
    const url = `http://newsapi.org/v2/everything?q=${query}&apiKey=8a23bbf32e024b5b98c24ebfd1cfb188`;
    request(url).pipe(res);
});

app.listen(PORT, () => {
    console.log("listening on port: " + PORT);
});
