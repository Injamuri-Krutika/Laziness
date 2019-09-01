// server.js
// Server app to display the webpage

// init project
const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const upload = multer({
  dest: './dsp',
  fileFilter: (req, file, cb) => {
    if (path.extension(file.originalname) !== '.zip') {
      return cb(new Error('Only ZIPs are allowed'));
    }
    return cb(null, true);
  },
});

app.post('/submit', upload.single('zip'), (request, response) => {
  const meta = {
    name: request.file.originalname,
    mime: request.file.mimetype,
  };
  return response.send(meta);
});

// listen for requests :)
const listener = app.listen(process.env.FILE_PORT || 7777, () => {
  // eslint-disable-next-line no-console
  console.log(`Your app is listening on port ${listener.address().port}`);
});
