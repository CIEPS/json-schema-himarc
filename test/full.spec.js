/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
'use strict';

const { expect } = require('chai');
const Ajv = require('ajv').default;
const registerSchema = require('../dist/himarc-register.schema.json');

const ajv = new Ajv({
  allErrors: true,
  strict: false
});

describe('full schema', function () {
  it('should validate', function () {
    const data = {
      fields: {
        LDR: {
          positions: {
            10: '2',
            11: '2',
            17: ' ',
            18: 'a',
            19: ' ',
            20: '4',
            21: '5',
            22: '0',
            23: '0',
            '00-04': '02105',
            '05': 'c',
            '06': 'a',
            '07': 's',
            '08': ' ',
            '09': 'a',
            '12-16': '00541'
          }
        },
        '008': {
          positions: {
            '00-05': '190816',
            '06': 'c',
            '07-10': '1869',
            '11-14': '9999',
            '15-17': 'enk',
            18: 'w',
            19: 'r',
            20: ' ',
            21: 'p',
            22: ' ',
            23: ' ',
            24: ' ',
            25: ' ',
            26: ' ',
            27: ' ',
            28: ' ',
            29: '0',
            '30-32': '   ',
            33: 'a',
            34: '0',
            '35-37': 'eng',
            38: ' ',
            39: ' '
          }
        },
        '022': {
          indicator1: '0',
          indicator2: '\\',
          subFields: [
            {
              a: '0028-0836'
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
        },
        '044': {
          indicator1: '\\',
          indicator2: '\\',
          subFields: [
            {
              c: 'GBR'
            }
          ]
        },
        '080': [{
          indicator1: '0',
          indicator2: '\\',
          subFields: [
            {
              a: '539.120.222'
            }
          ]
        }],
        222: {
          indicator1: '\\',
          indicator2: '0',
          subFields: [
            {
              a: 'Nature'
            },
            {
              b: '(London)'
            }
          ]
        },
        245: {
          indicator1: '1',
          indicator2: '0',
          subFields: [
            {
              a: 'Another Nature'
            }
          ]
        },
        260: [{
          indicator1: '\\',
          indicator2: '\\',
          subFields: [
            {
              a: 'Paris'
            },
            {
              b: 'My Publisher'
            }
          ]
        }]
      }
    };
    const validate = ajv.compile(registerSchema);
    const valid = validate(data);
    if (validate.errors) console.dir(validate.errors, { depth: 8 });
    expect(valid).to.be.true;
  });

  it('shouldn\'t validate with an empty subfield', function () {
    const data = {
      fields: {
        LDR: {
          positions: {
            10: '2',
            11: '2',
            17: ' ',
            18: 'a',
            19: ' ',
            20: '4',
            21: '5',
            22: '0',
            '00-04': '02105',
            '05': 'c',
            '06': 'a',
            '07': 's',
            '08': ' ',
            '09': 'a',
            '12-16': '00541'
          }
        },
        '008': {
          positions: {
            '00-05': '190816',
            '06': 'c',
            '07-10': '1869',
            '11-14': '9999',
            '15-17': 'enk',
            18: 'w',
            19: 'r',
            20: ' ',
            21: 'p',
            22: ' ',
            23: ' ',
            24: ' ',
            25: ' ',
            26: ' ',
            27: ' ',
            28: ' ',
            29: '0',
            '30-32': '   ',
            33: 'a',
            34: '0',
            '35-37': 'eng',
            38: ' ',
            39: ' '
          }
        },
        '022': {
          indicator1: '0',
          indicator2: '\\',
          subFields: [
            {
              a: '0028-0836'
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
        },
        '044': {
          indicator1: '\\',
          indicator2: '\\',
          subFields: []
        },
        '080': [{
          indicator1: '0',
          indicator2: '\\',
          subFields: [
            {
              a: '539.120.222'
            }
          ]
        }],
        222: {
          indicator1: '\\',
          indicator2: '0',
          subFields: [
            {
              a: 'Nature'
            },
            {
              b: '(London)'
            }
          ]
        },
        245: {
          indicator1: '1',
          indicator2: '0',
          subFields: [
            {
              a: 'Another Nature'
            }
          ]
        },
        260: [{
          indicator1: '\\',
          indicator2: '\\',
          subFields: [
            {
              a: 'Paris'
            },
            {
              b: 'My Publisher'
            }
          ]
        }]
      }
    };
    const validate = ajv.compile(registerSchema);
    const valid = validate(data);
    if (validate.errors) {
      expect(validate.errors.some(error => error.message === 'should NOT have fewer than 1 items')).to.be.true;
    }
    expect(valid).to.be.false;
  });

  it('shouldn\'t validate whith an empty tag', function () {
    const data = {
      fields: {
        LDR: {
          positions: {
            10: '2',
            11: '2',
            17: ' ',
            18: 'a',
            19: ' ',
            20: '4',
            21: '5',
            22: '0',
            '00-04': '02105',
            '05': 'c',
            '06': 'a',
            '07': 's',
            '08': ' ',
            '09': 'a',
            '12-16': '00541'
          }
        },
        '008': {
          positions: {
            '00-05': '190816',
            '06': 'c',
            '07-10': '1869',
            '11-14': '9999',
            '15-17': 'enk',
            18: 'w',
            19: 'r',
            20: ' ',
            21: 'p',
            22: ' ',
            23: ' ',
            24: ' ',
            25: ' ',
            26: ' ',
            27: ' ',
            28: ' ',
            29: '0',
            '30-32': '   ',
            33: 'a',
            34: '0',
            '35-37': 'eng',
            38: ' ',
            39: ' '
          }
        },
        '022': {
          indicator1: '0',
          indicator2: '\\',
          subFields: [
            {
              a: '0028-0836'
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
        },
        '044': {},
        '080': [],
        222: {
          indicator1: '\\',
          indicator2: '0',
          subFields: [
            {
              a: 'Nature'
            },
            {
              b: '(London)'
            }
          ]
        },
        245: {
          indicator1: '1',
          indicator2: '0',
          subFields: [
            {
              a: 'Another Nature'
            }
          ]
        },
        260: [{
          indicator1: '\\',
          indicator2: '\\',
          subFields: [
            {
              a: 'Paris'
            },
            {
              b: 'My Publisher'
            }
          ]
        }]
      }
    };
    const validate = ajv.compile(registerSchema);
    const valid = validate(data);
    if (validate.errors) {
      expect(validate.errors.some(error => error.message === "should have required property 'indicator1'")).to.be.true;
      expect(validate.errors.some(error => error.message === "should have required property 'indicator2'")).to.be.true;
      expect(validate.errors.some(error => error.message === "should have required property 'subFields'")).to.be.true;
      expect(validate.errors.some(error => error.message === 'should NOT have fewer than 1 items')).to.be.true;
    }
    expect(valid).to.be.false;
  });
});
