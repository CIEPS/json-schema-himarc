/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
'use strict';

const { expect, assert } = require('chai');
const schemaHelper = require('../src/schema');

function defaultSubfields(field) {
    const schema = schemaHelper[`field_${field}`]
    if (schema.type == "array") {
        return schema.items.properties.subFields.items.defaultProperties
    } else {
        return schema.properties.subFields.items.defaultProperties
    }
}

function regularCases() {
    const specialTags = wipCases.concat(specialCases.map(case_ => case_[0]));
    const allTags = Object.getOwnPropertyNames(schemaHelper).filter(tag => tag.startsWith("field_") && tag > "field_009").map(tag => tag.replace("field_", ""))
    return allTags.filter(tag => !specialTags.includes(tag));
}


const specialCases = [
    ["080_work", ["a", "2"]],
    ["080_register", ["a", "2"]],
    ["082_work", ["a", "2"]],
    ["082_register", ["a", "2"]],
    ["210_work", ["a", "b"]],
    ["210_register", ["a", "b"]],
    ["222", ["a", "b"]],
    ["260", ["a", "b", "c"]],
    ["264", ["a", "b", "c"]],
    ["336", ["a", "2"]],
    ["337", ["a", "2"]],
    ["338", ["a", "2"]],
    ["760_register", ["t", "x"]],
    ["760_work", ["t", "x"]],
    ["762_register", ["t", "x"]],
    ["762_work", ["t", "x"]],
    ["765_register", ["t", "x"]],
    ["765_work", ["t", "x"]],
    ["767_register", ["t", "x"]],
    ["767_work", ["t", "x"]],
    ["770_register", ["t", "x"]],
    ["770_work", ["t", "x"]],
    ["772_register", ["t", "x"]],
    ["772_work", ["t", "x"]],
    ["773", ["t", "x"]],
    ["774", ["t", "x"]],
    ["775_register", ["t", "x"]],
    ["775_work", ["t", "x"]],
    ["776_register", ["t", "x"]],
    ["776_work", ["t", "x"]],
    ["777_register", ["t", "x"]],
    ["777_work", ["t", "x"]],
    ["780_register", ["t", "x"]],
    ["780_work", ["t", "x"]],
    ["785_register", ["t", "x"]],
    ["785_work", ["t", "x"]],
    ["786", ["t", "x"]],
    ["787_register", ["t", "x"]],
    ["787_work", ["t", "x"]],
    ["856", ["u"]],
];

// These fields are not properly defined in the schema yet
const wipCases = [
    "357", "542", "841", "842", "843", "844", "845", "853", "854", "855", "863", "864", "865", "866", "867", "868", "876", "877", "878"
]


describe('Default subfields', () => {
    specialCases.forEach(([field, expected]) => {
        it(`Special field ${field} default subfields are ${expected}`, () => {
            expect(defaultSubfields(field)).to.eql(expected);
        });
    });
    regularCases().forEach((field) => {
        it(`Regular field ${field} default subfield is a`, () => {
            expect(defaultSubfields(field)).to.eql(["a"]);
        });
    });
    wipCases.forEach((field) => {
        it(`WIP field ${field} raises an error`, () => {
            assert.throws(() => defaultSubfields(field), TypeError);
        });
    });
});