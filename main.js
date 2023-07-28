const express = require('express');
const { runAceMetrics } = require('./ace');

const app = express();
const port = 8080;

app.get((req, res) => {
    res.send();
});

app.post('/*', (req, res) => {
    let data = null;

    req.on("error", (e) => {
        console.log(`requested on err`)
        throw e;
    }).on("data", (chunk) => {
        console.log(`requested on data`)
        data = new TextDecoder().decode(chunk);
    }).on("end", () => {
        try {
            console.log(`requested on end`)

            if (!data) {
                res.status(404).send();
            }

            const json = JSON.parse(data);
            const tsv = runAceMetrics(json.content, json.extension);

            res.set("Content-Type", "text/tab-separated-values");
            res.send(tsv);
        } catch (e) {
            console.log(e);
            res.status(500).send();
        }
    });

});

app.listen(port, () => {
    console.log(`treesitter-api: listening on port ${port}`);
});

