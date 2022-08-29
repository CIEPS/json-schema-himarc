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

describe('Physical Description (007) schema', () => {
  it('should validate', () => {
    const data = [{
      positions: {
        '00': 't',
        '01': 'a'
      }
    }];
    const validate = ajv.compile(schemaHelper.field_007);
    const valid = validate(data);
    if (validate.errors) console.dir(validate.errors, { depth: 8 });
    expect(valid).to.be.true;
  });

  it('shouldn\'t validate with an unauthorized values', () => {
    const data = [{
      positions: {
        '00': 'x',
        '01': 'a'
      }
    }];
    const validate = ajv.compile(schemaHelper.field_007);
    const valid = validate(data);
    if (validate.errors) {
      expect(validate.errors.some(error => error.message === 'should be equal to one of the allowed values')).to.be.true;
    }
    expect(valid).to.be.false;
  });
});