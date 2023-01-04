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


describe('Key Title (222) schema', () => {
  it('should validate', () => {
    const data = {
      indicator1: '\\',
      indicator2: '\\',
      subFields: [
        {
          a: 'Nature'
        },
        {
          b: '(London)'
        }
      ]
    };
    const validate = ajv.compile(schemaHelper.field_222);
    const valid = validate(data);
    if (validate.errors) console.dir(validate.errors, { depth: 8 });
    expect(valid).to.be.true;
  });

  it('shouldn\'t validate with an additional property', () => {
    const data = {
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
    };
    const validate = ajv.compile(schemaHelper.field_222);
    const valid = validate(data);
    if (validate.errors) {
      expect(validate.errors.some(error => error.message === 'must NOT have additional properties')).to.be.true;
    }
    expect(valid).to.be.false;
  });

  it('shouldn\'t validate with repeated subfield a', () => {
    const data = {
      indicator1: '\\',
      indicator2: '0',
      subFields: [
        {
          a: 'Nature'
        },
        {
          a: 'The Times'
        },
      ]
    };
    const validate = ajv.compile(schemaHelper.field_222);
    const valid = validate(data);
    if (validate.errors) {
      expect(validate.errors.some(error => error.message === 'must contain at least 1 and no more than 1 valid item(s)')).to.be.true;
    }
    expect(valid).to.be.false;
  })
});
