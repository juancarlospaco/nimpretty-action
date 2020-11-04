'use strict';
const fs = require('fs');
const path = require('path');
const core = require('@actions/core');
const { exec } = require('child_process');


const cfg = (key) => {
  console.assert(key.length > 0);
  var result = core.getInput(key).trim();
  console.assert(result.length > 0);
  return result;
};


const walk = (startPath, callback) => {
  console.log(startPath);
  if (!fs.existsSync(startPath)) {
    return;
  }

  var files = fs.readdirSync(startPath);
  for (var i = 0; i < files.length; i++) {
    var filename = path.join(startPath, files[i]);
    var stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
        walk(filename, callback);
    } else {
      if (filename.indexOf(".nim") >= 0) {
        callback(filename);
      }
    }
  };
};


try {
  const cmd = `nimpretty --maxLineLen:{cfg('maxLineLen')} --indent:{cfg('indent')} `;
  console.log(cmd);
  walk(cfg('folder'), function (filename) {
    console.log("walk()");
    exec(cmd + filename, (err, stdout, stderr) => {
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
