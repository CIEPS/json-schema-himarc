/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
'use strict';

const { expect } = require('chai');
const Ajv = require('ajv');
const refParser = require('@apidevtools/json-schema-ref-parser');
const leaderSchema = require('../src/leader.schema.json');
const field007Schema = require('../src/field-007.schema.json');
const field008Schema = require('../src/field-008.schema.json');
const field022Schema = require('../src/field-022.schema.json');
const field044Schema = require('../src/field-044.schema.json');
const field222Schema = require('../src/field-222.schema.json');
const fullSchema = require('../dist/himarc.schema.json');
const schemaProxies = require('../main.js');

describe('json schema himarc', function () {
  describe('es6 proxies', function () {
    it('should access to nested data', function () {
      expect(schemaProxies.fields['008'].definitions['All Materials'].positions.properties['06'].title).to.equal('Type of date/Publication status');
    });
  });

  describe('LDR', function () {
    it('should validate', function () {
      const data = {
        positions: {
          10: '2',
          11: '2',
          17: ' ',
          18: 'a',
          19: ' ',
          20: '4',
          21: '5',
          22: '0',
          '00-04': '02105',
          '05': 'c',
          '06': 'a',
          '07': 's',
          '08': ' ',
          '09': 'a',
          '12-16': '00541'
        }
      };
      const ajv = new Ajv({ allErrors: true });
      const validate = ajv.compile(leaderSchema);
      const valid = validate(data);
      expect(valid).to.be.true;
    });

    it('shouldn\'t validate', function () {
      const data = {
        positions: {
          100: '2',
          110: '2',
          170: ' ',
          18: 'a',
          19: ' ',
          20: '4',
          21: '5',
          22: '0',
          '00-04': '02105',
          '05': 'c',
          '06': 'a',
          '07': 's',
          '08': ' ',
          '09': 'a',
          '12-16': '00541'
        }
      };
      const ajv = new Ajv({ allErrors: true });
      const validate = ajv.compile(leaderSchema);
      const valid = validate(data);
      expect(valid).to.be.false;
    });
  });

  describe('007', function () {
    it('should validate', function () {
      const data = [{
        positions: {
          '00': 't',
          '01': 'a'
        }
      }];
      const ajv = new Ajv({ allErrors: true });
      const validate = ajv.compile(field007Schema);
      const valid = validate(data);
      expect(valid).to.be.true;
    });

    it('shouldn\'t validate', function () {
      const data = [{
        positions: {
          '00': 'x',
          '01': 'a'
        }
      }];
      const ajv = new Ajv({ allErrors: true });
      const validate = ajv.compile(field007Schema);
      const valid = validate(data);
      expect(valid).to.be.false;
    });
  });

  describe('008', function () {
    it('should validate', function (done) {
      const data = {
        positions: {
          18: 'w',
          19: 'r',
          21: 'p',
          22: ' ',
          23: ' ',
          24: ' ',
          28: ' ',
          29: '0',
          33: 'a',
          34: '0',
          38: ' ',
          39: ' ',
          '00-05': '190816',
          '06': 'c',
          '07-10': '1869',
          '11-14': '9999',
          '15-17': 'enk',
          '25-27': '   ',
          '35-37': 'eng'
        }
      };
      refParser.dereference(field008Schema, (error, schema) => {
        if (error) return done(error);
        const ajv = new Ajv({ allErrors: true });
        const validate = ajv.compile(schema);
        const valid = validate(data);
        if (validate.errors) console.dir(validate.errors, { depth: 8 });
        expect(valid).to.be.true;
        done();
      });
    });

    it('shouldn\'t validate', function (done) {
      const data = {
        positions: {
          18: 'a',
          19: 'r',
          20: '|',
          21: 'p',
          22: ' ',
          23: ' ',
          24: ' ',
          25: ' ',
          26: ' ',
          27: ' ',
          28: '12987',
          29: '0',
          30: ' ',
          31: ' ',
          32: ' ',
          33: 'a',
          34: '0',
          38: ' ',
          39: ' ',
          '00-05': '190816',
          '06': 'c',
          '07-10': '1869',
          '11-14': '9999',
          '15-17': 'enkore',
          '35-37': 'eng'
        }
      };
      refParser.dereference(field008Schema, (error, schema) => {
        if (error) return done(error);
        const ajv = new Ajv({ allErrors: true });
        const validate = ajv.compile(schema);
        const valid = validate(data);
        expect(valid).to.be.false;
        done();
      });
    });
  });

  describe('022', function () {
    it('should validate', function () {
      const data = [{
        indicator1: '0',
        indicator2: '\\',
        subFields: [
          {
            a: '0028-0836'
          },
          {
            z: '0302-2889'
          },
          {
            2: '_2'
          },
          {
            l: '0028-0836'
          }
        ]
      }];
      const ajv = new Ajv({ allErrors: true });
      const validate = ajv.compile(field022Schema);
      const valid = validate(data);
      if (validate.errors) console.dir(validate.errors, { depth: 8 });
      expect(valid).to.be.true;
    });

    it('shouldn\'t validate', function () {
      const data = [{
        indicator1: '0',
        indicator2: '\\',
        subFields: [
          {
            x: '0028-0836'
          },
          {
            z: '0302-2889'
          },
          {
            2: '_2'
          },
          {
            l: '0028-0836'
          }
        ]
      }];
      const ajv = new Ajv({ allErrors: true });
      const validate = ajv.compile(field022Schema);
      const valid = validate(data);
      expect(valid).to.be.false;
    });
  });

  describe('044', function () {
    it('should validate', function () {
      const data = {
        indicator1: '\\',
        indicator2: '\\',
        subFields: [
          {
            c: 'GBR'
          }
        ]
      };
      const ajv = new Ajv({ allErrors: true });
      const validate = ajv.compile(field044Schema);
      const valid = validate(data);
      expect(valid).to.be.true;
    });

    it('shouldn\'t validate', function () {
      const data = {
        indicator1: '\\',
        indicator2: '\\',
        subFields: [
          {
            c: 'GBRA'
          }
        ]
      };
      const ajv = new Ajv({ allErrors: true });
      const validate = ajv.compile(field044Schema);
      const valid = validate(data);
      expect(valid).to.be.false;
    });
  });

  describe('222', function () {
    it('should validate', function () {
      const data = [{
        indicator1: '\\',
        indicator2: '0',
        subFields: [
          {
            a: 'Nature'
          },
          {
            b: '(London)'
          }
        ]
      }];
      const ajv = new Ajv({ allErrors: true });
      const validate = ajv.compile(field222Schema);
      const valid = validate(data);
      expect(valid).to.be.true;
    });

    it('shouldn\'t validate', function () {
      const data = [{
        indicator1: '\\',
        indicator2: '0',
        subFields: [
          {
            a: 'Nature'
          },
          {
            x: '(London)'
          }
        ]
      }];
      const ajv = new Ajv({ allErrors: true });
      const validate = ajv.compile(field222Schema);
      const valid = validate(data);
      expect(valid).to.be.false;
    });
  });

  describe('full schema', function () {
    it('should validate', function () {
      const data = {
        fields: {
          LDR: {
            positions: {
              10: '2',
              11: '2',
              17: ' ',
              18: 'a',
              19: ' ',
              20: '4',
              21: '5',
              22: '0',
              '00-04': '02105',
              '05': 'c',
              '06': 'a',
              '07': 's',
              '08': ' ',
              '09': 'a',
              '12-16': '00541'
            }
          },
          '008': {
            positions: {
              18: 'w',
              19: 'r',
              21: 'p',
              22: ' ',
              23: ' ',
              24: ' ',
              28: ' ',
              29: '0',
              33: 'a',
              34: '0',
              38: ' ',
              39: ' ',
              '00-05': '190816',
              '06': 'c',
              '07-10': '1869',
              '11-14': '9999',
              '15-17': 'enk',
              '25-27': '   ',
              '35-37': 'eng'
            }
          },
          '022': [{
            indicator1: '0',
            indicator2: '\\',
            subFields: [
              {
                a: '0028-0836'
              },
              {
                z: '0302-2889'
              },
              {
                2: '_2'
              },
              {
                l: '0028-0836'
              }
            ]
          }],
          '044': {
            indicator1: '\\',
            indicator2: '\\',
            subFields: [
              {
                c: 'GBR'
              }
            ]
          },
          '080': [{
            indicator1: '0',
            indicator2: '\\',
            subFields: [
              {
                a: '539.120.222'
              }
            ]
          }]
        }
      };
      const ajv = new Ajv({ allErrors: true });
      const validate = ajv.compile(fullSchema);
      const valid = validate(data);
      if (validate.errors) console.dir(validate.errors, { depth: 8 });
      expect(valid).to.be.true;
    });
  });
});
