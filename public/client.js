class ClientLogger {
    constructor() {
        this.data = [];
        // get current script url
        let url = new URL(document.currentScript.src);
        this.loggerURL = `${url.origin}/logger`;
        this._originalConsoleLog = console.log;
        console.log = this.customLogger.bind(this);
        setInterval(() => {
            this.log();
        }, 5000);
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
        let data = {data: [].concat(this.data)};
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
