'use strict';
const fs = require('fs');
const path = require('path');

const schema = {};
fs.readdirSync(__dirname)
  .filter(file => {
    const basename = path.basename(__filename);
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-12) === '.schema.json');
  })
  .forEach(file => {
    const name = file.split('.')[0].replace('-', '_');
    schema[name] = require(path.join(__dirname, file));
  });

module.exports = schema;
