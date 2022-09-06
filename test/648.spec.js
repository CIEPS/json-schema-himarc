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

  [
    { ind1: "\\", ind2: "0", subfieldA: '1900-1999'},
    { ind1: "\\", ind2: "1", subfieldA: '1900-1999'},
    { ind1: "\\", ind2: "2", subfieldA: '1900-1999'},
    { ind1: "\\", ind2: "3", subfieldA: '1900-1999'},
    { ind1: "\\", ind2: "4", subfieldA: '1900-1999'},
    { ind1: "\\", ind2: "5", subfieldA: '1900-1999'},
    { ind1: "\\", ind2: "7", subfieldA: '1900-1999'},
  ].forEach((params) => {
    it(`should validate (${params.ind2} is a valid indicator2)`, () => {
      const data = [{
        indicator1: params.ind1,
        indicator2: params.ind2,
        subFields: [
          {
            a: params.subfieldA
          }
        ]
      }];
      const valid = validate(data);
      if (validate.errors) console.dir(validate.errors, { depth: 8 });
      expect(valid).to.be.true;
    });
  });
});
