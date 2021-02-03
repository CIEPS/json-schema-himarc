#!/usr/bin/env node

const refParser = require('@apidevtools/json-schema-ref-parser');
const path = require('path');
const fs = require('fs');
const Promise = require('bluebird');
const writeFileAsync = Promise.promisify(fs.writeFile);

const schemas = ['himarc-register.schema.json', 'himarc-work.schema.json'];
Promise.map(schemas, schema => {
  return refParser.bundle(path.join(__dirname, '../src/schema/' + schema))
    .then(result => {
      const data = JSON.stringify(result, null, 2);
      return writeFileAsync(path.join(__dirname, '../dist/' + schema), data);
    });
}).then(() => process.exit())
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
