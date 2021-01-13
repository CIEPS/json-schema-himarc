/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
'use strict';

const { expect } = require('chai');
const Ajv = require('ajv');
const refParser = require('@apidevtools/json-schema-ref-parser');
const schemaHelper = require('../src');
const fullSchema = require('../dist/himarc.schema.json');
const schemaProxies = require('../main.js');

describe('es6 proxies', function () {
  it('should access to nested data', function () {
    expect(schemaProxies.fields['008'].definitions['All Materials'].positions.properties['06'].title).to.equal('Type of date/Publication status');
  });
});

describe('LDR schema', function () {
  it('should validate', function () {
    const data = {
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
    };
    const ajv = new Ajv({ allErrors: true });
    const validate = ajv.compile(schemaHelper.leader);
    const valid = validate(data);
    expect(valid).to.be.true;
  });

  it('shouldn\'t validate', function () {
    const data = {
      positions: {
        100: '2',
        110: '2',
        170: ' ',
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
    };
    const ajv = new Ajv({ allErrors: true });
    const validate = ajv.compile(schemaHelper.leader);
    const valid = validate(data);
    expect(valid).to.be.false;
  });
});

describe('007 schema', function () {
  it('should validate', function () {
    const data = [{
      positions: {
        '00': 't',
        '01': 'a'
      }
    }];
    const ajv = new Ajv({ allErrors: true });
    const validate = ajv.compile(schemaHelper.field_007);
    const valid = validate(data);
    expect(valid).to.be.true;
  });

  it('shouldn\'t validate', function () {
    const data = [{
      positions: {
        '00': 'x',
        '01': 'a'
      }
    }];
    const ajv = new Ajv({ allErrors: true });
    const validate = ajv.compile(schemaHelper.field_007);
    const valid = validate(data);
    expect(valid).to.be.false;
  });
});

describe('008 schema', function () {
  it('should validate', function (done) {
    const data = {
      positions: {
        18: 'w',
        19: 'r',
        21: 'p',
        22: ' ',
        23: ' ',
        24: ' ',
        28: ' ',
        29: '0',
        33: 'a',
        34: '0',
        38: ' ',
        39: ' ',
        '00-05': '190816',
        '06': 'c',
        '07-10': '1869',
        '11-14': '9999',
        '15-17': 'enk',
        '25-27': '   ',
        '35-37': 'eng'
      }
    };
    refParser.dereference(schemaHelper.field_008, (error, schema) => {
      if (error) return done(error);
      const ajv = new Ajv({ allErrors: true });
      const validate = ajv.compile(schema);
      const valid = validate(data);
      if (validate.errors) console.dir(validate.errors, { depth: 8 });
      expect(valid).to.be.true;
      done();
    });
  });

  it('shouldn\'t validate', function (done) {
    const data = {
      positions: {
        18: 'a',
        19: 'r',
        20: '|',
        21: 'p',
        22: ' ',
        23: ' ',
        24: ' ',
        25: ' ',
        26: ' ',
        27: ' ',
        28: '12987',
        29: '0',
        30: ' ',
        31: ' ',
        32: ' ',
        33: 'a',
        34: '0',
        38: ' ',
        39: ' ',
        '00-05': '190816',
        '06': 'c',
        '07-10': '1869',
        '11-14': '9999',
        '15-17': 'enkore',
        '35-37': 'eng'
      }
    };
    refParser.dereference(schemaHelper.field_008, (error, schema) => {
      if (error) return done(error);
      const ajv = new Ajv({ allErrors: true });
      const validate = ajv.compile(schema);
      const valid = validate(data);
      expect(valid).to.be.false;
      done();
    });
  });
});

describe('022 schema', function () {
  it('should validate', function () {
    const data = [{
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
    }];
    const ajv = new Ajv({ allErrors: true });
    const validate = ajv.compile(schemaHelper.field_022);
    const valid = validate(data);
    if (validate.errors) console.dir(validate.errors, { depth: 8 });
    expect(valid).to.be.true;
  });

  it('shouldn\'t validate', function () {
    const data = [{
      indicator1: '0',
      indicator2: '\\',
      subFields: [
        {
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
    }];
    const ajv = new Ajv({ allErrors: true });
    const validate = ajv.compile(schemaHelper.field_022);
    const valid = validate(data);
    expect(valid).to.be.false;
  });
});

describe('044 schema', function () {
  it('should validate', function () {
    const data = {
      indicator1: '\\',
      indicator2: '\\',
      subFields: [
        {
          c: 'GBR'
        }
      ]
    };
    const ajv = new Ajv({ allErrors: true });
    const validate = ajv.compile(schemaHelper.field_044);
    const valid = validate(data);
    if (validate.errors) console.dir(validate.errors, { depth: 8 });
    expect(valid).to.be.true;
  });

  it('shouldn\'t validate', function () {
    const data = {
      indicator1: '\\',
      indicator2: '\\',
      subFields: [
        {
          a: 'GBR'
        }
      ]
    };
    const ajv = new Ajv({ allErrors: true });
    const validate = ajv.compile(schemaHelper.field_044);
    const valid = validate(data);
    expect(valid).to.be.false;
  });
});

describe('222 schema', function () {
  it('should validate', function () {
    const data = [{
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
    }];
    const ajv = new Ajv({ allErrors: true });
    const validate = ajv.compile(schemaHelper.field_222);
    const valid = validate(data);
    expect(valid).to.be.true;
  });

  it('shouldn\'t validate', function () {
    const data = [{
      indicator1: '\\',
      indicator2: '0',
      subFields: [
        {
          a: 'Nature'
        },
        {
          x: '(London)'
        }
      ]
    }];
    const ajv = new Ajv({ allErrors: true });
    const validate = ajv.compile(schemaHelper.field_222);
    const valid = validate(data);
    expect(valid).to.be.false;
  });
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
            18: 'w',
            19: 'r',
            21: 'p',
            22: ' ',
            23: ' ',
            24: ' ',
            28: ' ',
            29: '0',
            33: 'a',
            34: '0',
            38: ' ',
            39: ' ',
            '00-05': '190816',
            '06': 'c',
            '07-10': '1869',
            '11-14': '9999',
            '15-17': 'enk',
            '25-27': '   ',
            '35-37': 'eng'
          }
        },
        '022': [{
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
        }],
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
        222: [{
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
        }]
      }
    };
    const ajv = new Ajv({ allErrors: true });
    const validate = ajv.compile(fullSchema);
    const valid = validate(data);
    if (validate.errors) console.dir(validate.errors, { depth: 8 });
    expect(valid).to.be.true;
  });

  it('shouldn\'t validate whith an empty subfield', function () {
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
            18: 'w',
            19: 'r',
            21: 'p',
            22: ' ',
            23: ' ',
            24: ' ',
            28: ' ',
            29: '0',
            33: 'a',
            34: '0',
            38: ' ',
            39: ' ',
            '00-05': '190816',
            '06': 'c',
            '07-10': '1869',
            '11-14': '9999',
            '15-17': 'enk',
            '25-27': '   ',
            '35-37': 'eng'
          }
        },
        '022': [{
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
        }],
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
        222: [{
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
        }]
      }
    };
    const ajv = new Ajv({ allErrors: true });
    const validate = ajv.compile(fullSchema);
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
            18: 'w',
            19: 'r',
            21: 'p',
            22: ' ',
            23: ' ',
            24: ' ',
            28: ' ',
            29: '0',
            33: 'a',
            34: '0',
            38: ' ',
            39: ' ',
            '00-05': '190816',
            '06': 'c',
            '07-10': '1869',
            '11-14': '9999',
            '15-17': 'enk',
            '25-27': '   ',
            '35-37': 'eng'
          }
        },
        '022': [{
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
        }],
        '044': {},
        '080': [],
        222: [{
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
        }]
      }
    };
    const ajv = new Ajv({ allErrors: true });
    const validate = ajv.compile(fullSchema);
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
