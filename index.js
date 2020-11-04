'use strict';
const fs = require('fs');
const path = require('path');
const core = require('@actions/core');
const { exec } = require('child_process');


const cfg = (key) => {
  core.getInput(key).trim();
};


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


try {
  walk(cfg('folder'), cfg('extension'), function (filename) {
    console.log("walk()");
    exec(`nimpretty --maxLineLen:{ cfg('maxLineLen') } '{ filename }'`, (err, stdout, stderr) => {
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
