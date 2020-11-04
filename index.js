'use strict';
const fs = require('fs');
const path = require('path');
const core = require('@actions/core');
const { exec } = require('child_process');


const walk = (startPath, filter, callback) => {
  if (!fs.existsSync(startPath)) {
    return;
  }

  var files = fs.readdirSync(startPath);
  for (var i = 0; i < files.length; i++) {
    var filename = path.join(startPath, files[i]);
    var stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
        walk(filename, filter, callback);
    } else {
      if (filename.indexOf(filter) >= 0) callback(filename);
    }
  };
};


const getFilter = () => {
  try {
    return new RegExp(core.getInput('extension').trim());
  } catch (err) {
    return ".nim";
  };
};


const getFolder = () => {
  try {
    return core.getInput('folder').trim();
  } catch (err) {
    return '.';
  };
};

console.log(getFolder());
console.log(getFilter());
try {
  walk(getFolder(), getFilter(), function (filename) {
    console.log("walk()");
    exec(`nimpretty --maxLineLen:999 {filename}`, (err, stdout, stderr) => {
      if (err) {
        console.log(stderr);
        console.warning(err);
        return;
      } else {
        console.log(stdout);
      }
    });
  });
} catch (error) {
  core.setFailed(error.message);
}
