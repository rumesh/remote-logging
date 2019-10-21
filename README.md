# remote-logging
Remote logging helps to save all console.log in a distant server, to help to debug inapp webview or any other context.

# Instalation
`npm i`

# Start
`npm start`

# Build
If any change on `Client.js` generate the minified version with

`npm run minify`

# Usage
- Localhost
  Add `<script src='http://localhost:3337/client.js'></script>` to you webpage
  then go to http://localhost:3337/log/ to display your log file.
  Log are send every 5 seconds to server if have any log

- YOUR SERVER
  Add `<script src='{YOUR_SERVER}/client.js'></script>` to you webpage
  then go to `{YOUR_SERVER}/log/ ` to display your log file.
  Log are send every 5 seconds to server if have any log
