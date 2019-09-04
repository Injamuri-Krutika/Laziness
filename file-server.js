/* eslint-disable consistent-return */
// server.js
// Server app to display the webpage

// init project
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs-extra');
const taList = require('./constants.js');
require('dotenv').config();

const app = express();
const filePaths = {};
// eslint-disable-next-line require-jsdoc
function getTA(_roll, exam) {
  // Function to get the correct TA
  let roll = _roll;
  const pattern = /19[Mm][Cc][mM][Tt][0-5][0-9]/;
  if (!roll.match(pattern)) return 'others';
  roll = +roll.substring(roll.length - 2);
  // eslint-disable-next-line no-restricted-syntax
  for (const key in taList.ta[exam]) {
    if (taList.ta[exam][key][0] <= roll && roll <= taList.ta[exam][key][1]) {
      console.log(key);
      return key;
    }
  }
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(req.body);
    const dest = `./uploads/${req.body.exam}/${getTA(
      req.body.roll,
      req.body.exam,
    )}/${req.body.set}`;
    if (filePaths[req.body.roll]) {
      fs.removeSync(filePaths[req.body.roll]);
    }
    filePaths[req.body.roll] = dest;
    fs.mkdirsSync(dest);
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    console.log(path.extname(file.originalname));
    if (path.extname(file.originalname) !== '.zip') {
      return cb(new Error('Only ZIPs are allowed. Please upload again.'));
    }
    return cb(null, true);
  },
});

app.post('/submit', upload.single('zip'), (request, response) => {
  // console.log(request.file);
  // console.log(request.body);

  const meta = {
    name: request.file.originalname,
    mime: request.file.mimetype,
  };
  return response.redirect(`http://${process.env.HOST}:${process.env.PORT}/thankyou`);
});

// listen for requests :)
const listener = app.listen(process.env.FILE_PORT || 8080, () => {
  // eslint-disable-next-line no-console
  console.log(`Your app is listening on port ${listener.address().port}`);
});
