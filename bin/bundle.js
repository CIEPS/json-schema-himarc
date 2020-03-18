#!/usr/bin/env node

const refParser = require('@apidevtools/json-schema-ref-parser');
const path = require('path');
const fs = require('fs');
const util = require('util');
const writeFileAsync = util.promisify(fs.writeFile);

refParser.bundle(path.join(__dirname, '../src/himarc.schema.json')).then(result => {
  const data = JSON.stringify(result, null, 2);
  return writeFileAsync(path.join(__dirname, '../dist/himarc.schema.json'), data);
}).catch(error => {
  console.error(error);
  process.exit(1);
});
