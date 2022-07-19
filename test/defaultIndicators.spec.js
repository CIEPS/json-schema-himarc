/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
'use strict';

const { expect, should } = require('chai');
const schemaHelper = require('../src/schema');

function indicatorDefaultValue(field, ind) {
    const schema = schemaHelper[`field_${field}`]
    if (schema.type == "array") {
        return schema.items.properties[`indicator${ind}`].defaultValue
    } else {
        return schema.properties[`indicator${ind}`].defaultValue
    }
}

function regularCases() {
    let specialTags = indicators1.map(case_ => case_[0]).concat(indicators2.map(case_ => case_[0]));
    specialTags = wipCases.concat(specialTags)
    const allTags = Object.getOwnPropertyNames(schemaHelper).filter(tag => tag.startsWith("field_") && tag > "field_009").map(tag => tag.replace("field_", ""))
    return allTags.filter(tag => !specialTags.includes(tag));
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
    ["710_register", "2"],
    ["710_work", "2"],
    ["711_register", "0"],
    ["711_work", "0"],
    ["730", "0"],
    ["740", "0"],
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

// These fields are not properly defined in the schema yet
const wipCases = [
    "841", "842", "843", "844", "845", "853", "854", "855", "863", "864", "865", "866", "867", "868", "876", "877", "878", "880"
]

describe('Default indicators values', () => {
    indicators1.forEach(([field, expected]) => {
        it(`Special field ${field} indicator 1 is ${expected}`, () => {
            expect(indicatorDefaultValue(field, 1)).to.equal(expected);
        });
    })
    indicators2.forEach(([field, expected]) => {
        it(`Special field ${field} indicator 2 is ${expected}`, () => {
            expect(indicatorDefaultValue(field, 2)).to.equal(expected);
        });
    })
    regularCases().forEach((field) => {
        it(`Regular field ${field} indicator 1 is empty`, () => {
            expect(indicatorDefaultValue(field, 1)).to.equal("\\");
        });
    })
    regularCases().forEach((field) => {
        it(`Regular field ${field} indicator 2 is empty`, () => {
            expect(indicatorDefaultValue(field, 2)).to.equal("\\");
        });
    })
    wipCases.forEach((field) => {
        it(`WIP field ${field} indicator 1 is undefined`, () => {
            expect(indicatorDefaultValue(field, 1)).to.be.undefined;
        });
    })
    wipCases.forEach((field) => {
        it(`WIP field ${field} indicator 2 is undefined`, () => {
            expect(indicatorDefaultValue(field, 2)).to.be.undefined;
        });
    })
});