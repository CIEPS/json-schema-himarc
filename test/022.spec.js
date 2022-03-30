/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
'use strict';

const {
    expect
} = require('chai');
const Ajv = require('ajv').default;
const schemaHelper = require('../src/schema');

const ajv = new Ajv({
    allErrors: true,
    strict: false
});

describe('International Standard Serial Number (022) schema', function () {
    const indicator1 = '0';
    const indicator2 = '\\';
    const requiredSubfields = [
        {
            a: '0028-0836'
        },
        {
            2: '_2'
        },
        {
            l: '0028-0836'
        }
    ];
    const defaultData = {
        indicator1: indicator1,
        indicator2: indicator2,
        subFields: requiredSubfields
    }

    it('must be valid when all required fields are set', function () {
        const data = defaultData;
        const validate = ajv.compile(schemaHelper.field_022_register);
        const valid = validate(data);
        if (validate.errors) console.dir(validate.errors, {
            depth: 8
        });
        expect(valid).to.be.true;
    });

    it('must not allow a whitespace-only subfield value', function () {
        let data = defaultData;
        data.subFields.push({v: " "})
        const validate = ajv.compile(schemaHelper.field_022_register);
        const valid = validate(data);
        expect(valid).to.be.false;
        expect(validate.errors.some(error => error.message === 'should match pattern "^(?!\\s*$).+"')).to.be.true;
    });

    it('shouldn\'t validate with a missing required property and additional property', function () {
        const data = {
            indicator1: '0',
            indicator2: '\\',
            subFields: [{
                x: '0028-0836'
            },
            {
                z: '0302-2889'
            },
            {
                2: '_2'
            },
            {
                l: '0028-0836'
            }
            ]
        };
        const validate = ajv.compile(schemaHelper.field_022_register);
        const valid = validate(data);
        if (validate.errors) {
            expect(validate.errors.some(error => error.message === 'should NOT have additional properties')).to.be.true;
            expect(validate.errors.some(error => error.message === "should have required property 'a'")).to.be.true;
            expect(validate.errors.some(error => error.message === 'should contain at least 1 valid item(s)')).to.be.true;
        }
        expect(valid).to.be.false;
    });
});