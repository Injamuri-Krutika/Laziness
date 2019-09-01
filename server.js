// server.js
// Server app to display the webpage

// init project
const express = require('express');

const app = express();

app.use(express.static('material'));

app.get('/', (request, response) => {
  response.sendFile(`${__dirname}/index.html`);
});

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, () => {
  // eslint-disable-next-line no-console
  console.log(`Your app is listening on port ${listener.address().port}`);
});
