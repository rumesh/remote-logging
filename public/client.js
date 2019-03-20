class ClientLogger {
    constructor() {
        this.data = [];
        // get current script url
        let url = new URL(document.currentScript.src);
        this.loggerURL = `${url.origin}/logger`;
        this._originalConsoleLog = console.log;
        this._sessionID = this._getSessionID();
        console.log = this.customLogger.bind(this);
        setInterval(() => {
            this.log();
        }, 5000);
    }

    _getSessionID() {
        // Code from https://gist.github.com/gordonbrander/2230317
        // Math.random should be unique because of its seeding algorithm.
        // Convert it to base 36 (numbers + letters), and grab the first 9 characters
        // after the decimal.
        return Math.random().toString(36).substr(2, 9);
    }

    customLogger() {
        this.addData(arguments);
        return this._originalConsoleLog(...arguments);
    };

    addData(log) {
        let data = [];
        for (let i = 0; i < log.length; i++) {
            data.push(log[i]);
        }
        if (data.length > 0) {
            this.data.push(data.join(' - '));
        }
    }

    log() {
        if (this.data.length === 0) {
            return;
        }
        let data = {
            data: [].concat(this.data),
            session: this._sessionID
        };
        this.data = [];
        let postData = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify(data)
        };
        fetch(this.loggerURL, postData)
        .then(function (response) {
            return response.text();
        })
        .then((data) => {
            this._originalConsoleLog(data);
        })
        .catch(() => {})
    }
}
// init
new ClientLogger();
