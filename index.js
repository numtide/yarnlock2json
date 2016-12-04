'use strict';

const program = require("commander");
const wrapper = require("./node_modules/yarn/lib/lockfile/wrapper");

program 
  .version('0.0.1')
  .description('Transforms yarn.lock files to JSON')
  .option('-d, --dir <path>', 'directory path where the yarn.lock file is located (default to current directory)')
  .option('-o, --output <path>', 'file path to write the JSON to (default to stdout)')
  .option('-p, --pretty', 'indent the output')
  .parse(process.argv);

var toJSON = JSON.stringify;
if (program.pretty) {
  toJSON = function(data) {
    return JSON.stringify(data, null, '  ');
  };
}

var dir = process.cwd();
if (program.dir) {
  dir = program.dir;
}

if (program.output) {
  fs.open(program.output, 'w', (err, fd) => {
    if (err) {
      throw err;
    }

    yarn2json(dir, fd, toJSON);
  });
} else {
  yarn2json(dir, process.stdout, toJSON);
}

function yarn2json(dir, output, toJSON) {
  wrapper.default.fromDirectory(dir).then((lockfile) => {
    if (!lockfile.cache) {
      throw "yarn.lock could not be found or loaded";
    }
    output.write(toJSON(lockfile.cache));
  }).catch((err) => {
    throw err;
  });
}
