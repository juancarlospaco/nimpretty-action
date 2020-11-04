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
      if (filter.test(filename)) callback(filename);
    }
  };
};


const nimprettyfy = (filename) => {
  exec('nimpretty --maxLineLen:999 ' + filename, (err, stdout, stderr) => {
    if (err) {
      console.warning(err);
      return;
    } else {
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    }
  });
};


const getRegexFilter = () => {
  try {
    return core.getInput('filter');
  } catch (err) {
    return /\.nim$/;
  };
};


const getFolder = () => {
  try {
    return core.getInput('folder');
  } catch (err) {
    return '.';
  };
};


try {
  walk(getFolder(), getRegexFilter(), nimprettyfy(filename));
} catch (error) {
  core.setFailed(error.message);
}