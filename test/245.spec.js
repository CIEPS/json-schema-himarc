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


describe('Title Statement (245) schema', () => {
    it('should validate', () => {
        const data = {
            indicator1: '0',
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
        const validate = ajv.compile(schemaHelper.field_245);
        const valid = validate(data);
        if (validate.errors) console.dir(validate.errors, { depth: 8 });
        expect(valid).to.be.true;
    });

    it('shouldn\'t validate with an additional property', () => {
        const data = {
            indicator1: '0',
            indicator2: '\\',
            subFields: [
                {
                    a: 'Nature'
                },
                {
                    x: '(London)'
                }
            ]
        };
        const validate = ajv.compile(schemaHelper.field_245);
        const valid = validate(data);
        if (validate.errors) {
            expect(validate.errors.some(error => error.message === 'must NOT have additional properties')).to.be.true;
        }
        expect(valid).to.be.false;
    });
});
