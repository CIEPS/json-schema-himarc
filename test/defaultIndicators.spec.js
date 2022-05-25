/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
'use strict';

const { expect } = require('chai');
const schemaHelper = require('../src/schema');

function indicatorDefaultValue(field, ind) {
    const schema = schemaHelper[`field_${field}`]
    if (schema.type == "array") {
        return schema.items.properties[`indicator${ind}`].defaultValue
    } else {
        return schema.properties[`indicator${ind}`].defaultValue
    }
}

const indicators1 = [
    ["024", "8"],
    ["080_work", "0"],
    ["080_register", "0"],
    ["210_work", "1"],
    ["210_register", "1"],
    ["245", "1"],
    ["246", "3"],
    ["700", "0"],
    ["710_register", "0"],
    ["710_work", "0"],
    ["711_register", "0"],
    ["711_work", "0"],
    ["720_register", "0"],
    ["720_work", "0"],
    ["730", "0"],
    ["740", "0"],
    ["751", "0"],
    ["752", "0"],
    ["753", "0"],
    ["754", "0"],
    ["755", "0"],
    ["758", "0"],
    ["760_register", "0"],
    ["760_work", "0"],
    ["762_register", "0"],
    ["762_work", "0"],
    ["765_register", "0"],
    ["765_work", "0"],
    ["767_register", "0"],
    ["767_work", "0"],
    ["770_register", "0"],
    ["770_work", "0"],
    ["772_register", "0"],
    ["772_work", "0"],
    ["773", "0"],
    ["774", "0"],
    ["775_register", "0"],
    ["775_work", "0"],
    ["776_register", "0"],
    ["776_work", "0"],
    ["777_register", "0"],
    ["777_work", "0"],
    ["780_register", "0"],
    ["780_work", "0"],
    ["785_register", "0"],
    ["785_work", "0"],
    ["786", "0"],
    ["787_register", "0"],
    ["787_work", "0"],
    ["856", "4"],
];

const indicators2 = [
    ["246", "3"],
    ["264", "1"],
    ["650", "4"],
    ["780_register", "0"],
    ["780_work", "0"],
    ["785_register", "0"],
    ["785_work", "0"],
    ["856", "0"],
];

describe('Default indicators values', () => {
    indicators1.forEach(([field, expected]) => {
        it(`Field ${field} indicator 1`, function () {
            expect(indicatorDefaultValue(field, 1)).to.equal(expected);
        });
    })
    indicators2.forEach(([field, expected]) => {
        it(`Field ${field} indicator 2`, function () {
            expect(indicatorDefaultValue(field, 2)).to.equal(expected);
        });
    })
});