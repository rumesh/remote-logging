const express = require('express');
const cors = require('cors')
const util = require('util');
const fs = require('fs');
const bodyParser = require('body-parser');
const serveIndex = require('serve-index');
const ejs = require('ejs');

const parseLog = require('./parseLog');

const readdir = util.promisify(fs.readdir);
const mkdir = util.promisify(fs.mkdir);
const writeFile = util.promisify(fs.writeFile);
const PORT=3337

const getFileName = (session) => {
    let date = new Date();
    return `log/${session}-${date.toISOString().replace(/:|\./g, '-')}.txt`;
};

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(
    "/log",
    serveIndex("log", {
        icons: true,
        view: "details"
    })
);
app.use(express.static('public'));
// health check url
app.get('/', function (req, res) {
    res.send('OK');
});

app.post('/logger', function(req, res) {
    let data = req.body.data;
    if (!data || data.length === 0) {
        res.send('NODATA');
        return;
    }
    writeFile(getFileName(req.body.session), data.join('\n'))
    .then(() => {
        res.send('LOGGED');
    })
    .catch(() => {
        res.send('ERR');
    });
});


// custom display for log files
const displayLogsTemplate = fs.readFileSync("./display_logs.ejs", "utf8");
app.get("/log/:logFile", function(req, res) {
    parseLog(req.params.logFile).then(data => {
        res.send(ejs.render(displayLogsTemplate, data, {}));
    });
});

readdir('log')
.catch((err) => {
    return mkdir('log');
})
.then(() => {
    // start app after log directory created
    app.listen(PORT, function () {
        console.log(`Remote logging app on port ${PORT} !`);
    });
});
