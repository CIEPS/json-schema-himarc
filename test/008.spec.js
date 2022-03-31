/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
'use strict';

const { expect } = require('chai');
const Ajv = require('ajv').default;
const refParser = require('@apidevtools/json-schema-ref-parser');
const schemaHelper = require('../src/schema');

const ajv = new Ajv({
  allErrors: true,
  strict: false
});


describe('Data Elements (008) schema', function () {
  it('should validate', function (done) {
    const data = {
      positions: {
        '00-05': '190816',
        '06': 'c',
        '07-10': '1869',
        '11-14': '9999',
        '15-17': 'enk',
        18: 'w',
        19: 'r',
        20: ' ',
        21: 'p',
        22: ' ',
        23: ' ',
        24: ' ',
        25: ' ',
        26: ' ',
        27: ' ',
        28: ' ',
        29: '0',
        '30-32': '   ',
        33: 'a',
        34: '0',
        '35-37': 'eng',
        38: ' ',
        39: ' '
      }
    };
    refParser.dereference(schemaHelper.field_008, (error, schema) => {
      if (error) return done(error);
      const validate = ajv.compile(schema);
      const valid = validate(data);
      if (validate.errors) console.dir(validate.errors, { depth: 8 });
      expect(valid).to.be.true;
      done();
    });
  });

  it('shouldn\'t validate with an unauthorized values', function (done) {
    const data = {
      positions: {
        '00-05': '190816',
        '06': 'c',
        '07-10': '1869',
        '11-14': '9999',
        '15-17': 'enk',
        18: 'x',
        19: 'r',
        20: ' ',
        21: 'p',
        22: ' ',
        23: ' ',
        24: ' ',
        25: ' ',
        26: ' ',
        27: ' ',
        28: ' ',
        29: '0',
        '30-32': '   ',
        33: 'a',
        34: '0',
        '35-37': 'eng',
        38: ' ',
        39: ' '
      }
    };
    refParser.dereference(schemaHelper.field_008, (error, schema) => {
      if (error) return done(error);
      const validate = ajv.compile(schema);
      const valid = validate(data);
      expect(valid).to.be.false;
      done();
    });
  });
});
