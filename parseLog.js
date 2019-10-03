
const util = require("util");
const fs = require("fs");

const readFile = util.promisify(fs.readFile);
function parseLog(logFile) {
    return readFile(`./log/${logFile}`, { encoding: 'utf8' }).then(data => {
        let logLines = data.split('\n');
        let returnData = logLines.map((line) => {
            let lineLogs = line.split(' - ');
            if (lineLogs.length === 1) {
                return lineLogs;
            }
            let tags = lineLogs[0].split("%c");
            // log start with '%c so have to remove this first empy element
            tags.shift();
            const tagsLength = tags.length;
            // have custom label
            if (tagsLength > 0 && lineLogs.length > 2) {
                let newLineLogs = [];
                for (let i = 0; i < tagsLength; i++) {
                    const tag = tags[i];
                    newLineLogs.push({
                        label: tag,
                        style: lineLogs[tagsLength - 1 + i]
                    });
                }
                return newLineLogs.concat(lineLogs.slice(tagsLength + 1));
            } else {
                return lineLogs;
            }
        })
        return { logFile, logs: returnData };
    });
};

module.exports = parseLog;