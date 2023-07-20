const http = require('http');
const { runAceMetrics } = require('./ace');

const port = 8080;

const server = http.createServer(function (req, res) {
    let data = null;

    try {
        req.on("error", (e) => {
            console.log(`requested on err`)
            throw e;
        }).on("data", (chunk) => {
            console.log(`requested on data`)
            data = new TextDecoder().decode(chunk);
        }).on("end", () => {
            console.log(`requested on end`)

            if (!data) {
                res.writeHead(400);
                res.end();
                return;
            }

            const json = JSON.parse(data);
            const tsv = runAceMetrics(json.content, json.extension);

            res.writeHead(200, { "Content-Type": "text/tab-separated-values" });
            res.end(tsv);
        });
    } catch (e) {
        console.log(e);
        res.writeHead(500);
        res.end();
    }
});

server.listen(port);
console.log(`listening: ${port}`)

