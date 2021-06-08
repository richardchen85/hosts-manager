const { exec } = require('child_process');
const fs = require('fs-extra');
const webpack = require('webpack');
const config = require('../webpack.config');
const pkg = require('../package');
const distPkg = {
  name: pkg.name,
  version: pkg.version,
  main: pkg.main,
  description: pkg.description,
  dependencies: {
    'md5-file': '^4.0.0',
  },
};

console.log('webpack...');
webpack(config, (err, stats) => {
  if (err) {
    return console.error(err);
  }

  console.log(
    stats.toString({
      chunks: false,
      colors: true,
    }),
  );

  console.log('copy client/electron to dist...');
  fs.copySync('./client/electron', './dist/electron');

  console.log('write package.json...');
  fs.writeFileSync('./dist/package.json', JSON.stringify(distPkg, null, 2));

  console.log('npm install...');
  exec('cd ./dist && npm i', (err, stdout) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
  });
});
