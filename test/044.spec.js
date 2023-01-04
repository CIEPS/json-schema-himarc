/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
'use strict';

const { expect } = require('chai');
const Ajv2019 = require('ajv/dist/2019');
const schemaHelper = require('../src/schema');
const ajv = new Ajv2019({
  allErrors: true,
  strict: false
});


describe('Country of Publishing/Producing Entity Code (044) schema', () => {
  it('should validate', () => {
    const data = {
      indicator1: '\\',
      indicator2: '\\',
      subFields: [
        {
          c: 'GBR'
        }
      ]
    };
    const validate = ajv.compile(schemaHelper.field_044);
    const valid = validate(data);
    if (validate.errors) console.dir(validate.errors, { depth: 8 });
    expect(valid).to.be.true;
  });

  it('shouldn\'t validate with a missing required property', () => {
    const data = {
      indicator1: '\\',
      indicator2: '\\',
      subFields: [
        {
          a: 'GBR'
        }
      ]
    };
    const validate = ajv.compile(schemaHelper.field_044);
    const valid = validate(data);
    if (validate.errors) {
      expect(validate.errors.some(error => error.message === "must have required property 'c'")).to.be.true;
      expect(validate.errors.some(error => error.message === 'must contain at least 1 and no more than 1 valid item(s)')).to.be.true;
    }
    expect(valid).to.be.false;
  });
});
