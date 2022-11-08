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


describe('Former Publication Frequency (321) schema', () => {
    it('should validate (b is not mandatory anymore)', () => {
        const data = [{
            indicator1: '\\',
            indicator2: '\\',
            subFields: [
                {
                    a: 'Monthly'
                }
            ]
        }];
        const validate = ajv.compile(schemaHelper.field_321);
        const valid = validate(data);
        if (validate.errors) console.dir(validate.errors, { depth: 8 });
        expect(valid).to.be.true;
    });
});
