/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
'use strict';

const { expect } = require('chai');
const Ajv = require('ajv').default;
const schemaHelper = require('../src/schema');

const ajv = new Ajv({
  allErrors: true,
  strict: false
});

describe('Leader (LDR) schema', function () {
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
        23: '0',
        '00-04': '02105',
        '05': 'c',
        '06': 'a',
        '07': 's',
        '08': ' ',
        '09': 'a',
        '12-16': '00541'
      }
    };
    const validate = ajv.compile(schemaHelper.leader);
    const valid = validate(data);
    if (validate.errors) console.dir(validate.errors, { depth: 8 });
    expect(valid).to.be.true;
  });

  it('shouldn\'t validate with additional and missing properties', function () {
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
    const validate = ajv.compile(schemaHelper.leader);
    const valid = validate(data);
    if (validate.errors) {
      expect(validate.errors.some(error => error.message === 'should NOT have additional properties')).to.be.true;
      expect(validate.errors.some(error => error.message === "should have required property '10'")).to.be.true;
      expect(validate.errors.some(error => error.message === "should have required property '11'")).to.be.true;
      expect(validate.errors.some(error => error.message === "should have required property '17'")).to.be.true;
    }
    expect(valid).to.be.false;
  });
});