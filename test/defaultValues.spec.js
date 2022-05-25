/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
'use strict';

const { expect } = require('chai');
const schemaHelper = require('../src/schema');

function defaultSubfields(field) {
    const schema = schemaHelper[`field_${field}`]
    if (schema.type == "array") {
        return schema.items.properties.subFields.items.defaultProperties
    } else {
        return schema.properties.subFields.items.defaultProperties
    }
}


const subFields = [
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
    ["700", ["t", "x"]],
    ["710_register", ["t", "x"]],
    ["710_work", ["t", "x"]],
    ["711_register", ["t", "x"]],
    ["711_work", ["t", "x"]],
    ["720_register", ["t", "x"]],
    ["720_work", ["t", "x"]],
    ["730", ["t", "x"]],
    ["740", ["t", "x"]],
    ["751", ["t", "x"]],
    ["752", ["t", "x"]],
    ["753", ["t", "x"]],
    ["754", ["t", "x"]],
    ["755", ["t", "x"]],
    ["758", ["t", "x"]],
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


describe('Default subfields', () => {
    subFields.forEach(([field, expected]) => {
        it(`Field ${field} default subfields`, function () {
            expect(defaultSubfields(field)).to.eql(expected);
        });
    });
});