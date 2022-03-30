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


describe('Varying Form of Title (246) schema', function () {
  it('should validate', function () {
    const data = [{
      indicator1: '0',
      indicator2: '0',
      subFields: [
        {
          a: 'Variant title'
        },
        {
          b: '(something)'
        }
      ]
    }];
    const validate = ajv.compile(schemaHelper.field_246);
    const valid = validate(data);
    if (validate.errors) console.dir(validate.errors, { depth: 8 });
    expect(valid).to.be.true;
  });

  it('shouldn\'t validate with an additional property', function () {
    const data = [{
      indicator1: '0',
      indicator2: '0',
      subFields: [
        {
          a: 'Variant title'
        },
        {
          x: '(something)'
        }
      ]
    }];
    const validate = ajv.compile(schemaHelper.field_246);
    const valid = validate(data);
    if (validate.errors) {
      expect(validate.errors.some(error => error.message === 'should NOT have additional properties')).to.be.true;
    }
    expect(valid).to.be.false;
  });
});
