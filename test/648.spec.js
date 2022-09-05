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


describe('Subject Added Entry-Chronological Term (648) schema', () => {
  let validate;

  beforeEach(() => {
    validate = ajv.compile(schemaHelper.field_648)
  });

  it('should validate (4 is a valid indicator2)', () => {
    const data = [{
      indicator1: '\\',
      indicator2: '4',
      subFields: [
        {
          a: '1900-1999'
        }
      ]
    }];
    const valid = validate(data);
    if (validate.errors) console.dir(validate.errors, { depth: 8 });
    expect(valid).to.be.true;
  });

  it('should validate (2 is a mandatory if indicator2 equals 7)', () => {
    const data = [{
      indicator1: '\\',
      indicator2: '7',
      subFields: [
        {
          a: '1900-1999',
          2: 'fast'
        }
      ]
    }];
    const valid = validate(data);
    if (validate.errors) console.dir(validate.errors, { depth: 8 });
    expect(valid).to.be.true;
  });

  it('should not validate (2 is a mandatory if indicator2 equals 7)', () => {
    const data = [{
      indicator1: '\\',
      indicator2: '7',
      subFields: [
        {
          a: '1900-1999'
        }
      ]
    }];
    const valid = validate(data);
    expect(valid).to.be.false;
  });
});
