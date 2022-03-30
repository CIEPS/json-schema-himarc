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

    let indicator1, indicator2, subfields, data;

    beforeEach(() => {
        indicator1 = '0';
        indicator2 = '\\';
        subfields = [
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
        data = {
            indicator1: indicator1,
            indicator2: indicator2,
            subFields: subfields
        }
    });
    it('must be valid when all required fields are set', function () {
        const validate = ajv.compile(schemaHelper.field_022_register);
        const valid = validate(data);
        if (validate.errors) console.dir(validate.errors, {
            depth: 8
        });
        expect(valid).to.be.true;
    });
    it('must not allow a whitespace-only subfield value', function () {
        data.subFields.push({ v: " " })
        const validate = ajv.compile(schemaHelper.field_022_register);
        const valid = validate(data);
        expect(valid).to.be.false;
        expect(validate.errors[0].message).to.equal('should match pattern "^(?!\\s*$).+"');
    });
    it('must not allow a missing required property', function () {
        data.subFields.pop()
        const validate = ajv.compile(schemaHelper.field_022_register);
        const valid = validate(data);
        expect(valid).to.be.false;
        expect(validate.errors[0].message).to.equal("should have required property 'l'");
    });
    it('must not allow an extra property', function () {
        data.subFields.push({ x: "X" })
        const validate = ajv.compile(schemaHelper.field_022_register);
        const valid = validate(data);
        expect(valid).to.be.false;
        expect(validate.errors[0].message).to.equal("should NOT have additional properties");
    });
    it('test i', function () {
        const validate = ajv.compile(schemaHelper.field_022_register.subFields);
        const valid = validate(data.subFields);
        expect(valid).to.be.false;
        expect(validate.errors[0].message).to.equal("should NOT have additional properties");
    });
});