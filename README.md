# remote-logging
Remote logging
Help to save all console.log in a distant server, to help to debug inapp webview or any other context

# Instalation
`npm i`

# Start
`node index.js`

# Usage
- Localhost
  Add `<script src='http://localhost:3337/client.js'></script>` to you webpage
  then go to http://localhost:3337/log/ to display your log file.
  Log are send every 5 seconids to server if have any log

- YOUR SERVER
  Add `<script src='{YOUR_SERVER}/client.js'></script>` to you webpage
  then go to `{YOUR_SERVER}/log/ ` to display your log file.
  Log are send every 5 seconids to server if have any log
