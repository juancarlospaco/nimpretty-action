'use strict';
const fs = require('fs');
const path = require('path');
const core = require('@actions/core');
const { exec } = require('child_process');


const cfg = (key) => {
  console.assert(key.length > 0);
  const result = core.getInput(key).trim();
  console.assert(result.length > 0);
  return result;
};


const walk = (startPath, cmd, callback) => {
  console.assert(startPath.length > 0);
  var counter = 0;
  if (!fs.existsSync(startPath)) {
    return;
  }
  var files = fs.readdirSync(startPath);
  for (var i = 0; i < files.length; i++) {
    var filename = path.join(startPath, files[i]);
    var stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      walk(filename, cmd, callback);
    } else {
      if (filename.length > 0 && filename[0] != "." && filename.substr(filename.length - 4, filename.length) == ".nim") {
        console.log(counter + "\t" + cmd + filename);
        counter++;
        callback(filename);
      }
    }
  };
};


const walks = (currentValue, index) => {
  console.log("\nfolder\t'" + currentValue + "'");
  const cmd = `nimpretty --indent:${ cfg('indent') } --maxLineLen:${ cfg('maxLineLen') } `;
  walk(currentValue, cmd, function (filename) {
    exec(cmd + filename, (err, stdout, stderr) => {
      if (err) {
        core.setFailed(`${stderr} ${stdout} ${err}`);
        return;
      };
    });
  });
};


try {
  cfg('folders').split(',').forEach(walks);
} catch (error) {
  core.setFailed(error.message);
}
