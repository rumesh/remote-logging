const express = require('express');
const cors = require('cors')
const util = require('util');
const fs = require('fs');
const bodyParser = require('body-parser')
const serveIndex = require('serve-index')

const readdir = util.promisify(fs.readdir);
const mkdir = util.promisify(fs.mkdir);
const writeFile = util.promisify(fs.writeFile);
const PORT=3337


const getFileName = () => {
    let date = new Date();
    return `log/${date.toISOString().replace(/:|\./g, '-')}.txt`;
};

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use('/log', express.static('log'), serveIndex('log', {
    'icons': true
}));
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
    writeFile(getFileName(), data.join('\n'))
    .then(() => {
        res.send('LOGGED');
    })
    .catch(() => {
        res.send('ERR');
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
