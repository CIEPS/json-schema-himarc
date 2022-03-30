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


describe('Publication, Distribution, etc. (Imprint) (260) schema', function () {
  it('should validate', function () {
    const data = [{
      indicator1: '\\',
      indicator2: '\\',
      subFields: [
        {
          a: 'Paris'
        },
        {
          b: 'My Publisher'
        }
      ]
    }];
    const validate = ajv.compile(schemaHelper.field_260);
    const valid = validate(data);
    if (validate.errors) console.dir(validate.errors, { depth: 8 });
    expect(valid).to.be.true;
  });

  it('shouldn\'t validate with a missing required property and additional property', function () {
    const data = [{
      indicator1: '\\',
      indicator2: '\\',
      subFields: [
        {
          a: 'Paris'
        },
        {
          w: 'something'
        }
      ]
    }];
    const validate = ajv.compile(schemaHelper.field_260);
    const valid = validate(data);
    if (validate.errors) {
      if (validate.errors) {
        expect(validate.errors.some(error => error.message === 'should NOT have additional properties')).to.be.true;
        expect(validate.errors.some(error => error.message === "should have required property 'b'")).to.be.true;
        expect(validate.errors.some(error => error.message === 'should contain at least 1 valid item(s)')).to.be.true;
      }
    }
    expect(valid).to.be.false;
  });
});
