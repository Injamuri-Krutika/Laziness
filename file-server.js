// server.js
// Server app to display the webpage

// init project
const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const storage = multer.diskStorage({
  destination: './dsp',
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  fileFilter: (req, file, cb) => {
    if (path.extname(file.originalname) !== '.zip') {
      return cb(new Error('Only ZIPs are allowed'));
    }
    return cb(null, true);
  },
});

const upload = multer({ storage });

app.post('/submit', upload.single('zip'), (request, response) => {
  console.log(request.file);
  console.log(request.body);

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
