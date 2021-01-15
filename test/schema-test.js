/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
'use strict';

const { expect } = require('chai');
const Ajv = require('ajv').default;
const refParser = require('@apidevtools/json-schema-ref-parser');
const schemaHelper = require('../src');
const fullSchema = require('../dist/himarc.schema.json');
const schemaProxies = require('../main.js');

const ajv = new Ajv({
  allErrors: true,
  strict: false
});

describe('es6 proxies', function () {
  it('should access to nested data', function () {
    expect(schemaProxies.fields['008'].definitions['All Materials'].positions.properties['06'].title).to.equal('Type of date/Publication status');
  });
});

describe('Leader (LDR) schema', function () {
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
    const validate = ajv.compile(schemaHelper.leader);
    const valid = validate(data);
    if (validate.errors) console.dir(validate.errors, { depth: 8 });
    expect(valid).to.be.true;
  });

  it('shouldn\'t validate with additional and missing properties', function () {
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
    const validate = ajv.compile(schemaHelper.leader);
    const valid = validate(data);
    if (validate.errors) {
      expect(validate.errors.some(error => error.message === 'should NOT have additional properties')).to.be.true;
      expect(validate.errors.some(error => error.message === "should have required property '10'")).to.be.true;
      expect(validate.errors.some(error => error.message === "should have required property '11'")).to.be.true;
      expect(validate.errors.some(error => error.message === "should have required property '17'")).to.be.true;
    }
    expect(valid).to.be.false;
  });
});

describe('Physical Description (007) schema', function () {
  it('should validate', function () {
    const data = [{
      positions: {
        '00': 't',
        '01': 'a'
      }
    }];
    const validate = ajv.compile(schemaHelper.field_007);
    const valid = validate(data);
    if (validate.errors) console.dir(validate.errors, { depth: 8 });
    expect(valid).to.be.true;
  });

  it('shouldn\'t validate with an unauthorized values', function () {
    const data = [{
      positions: {
        '00': 'x',
        '01': 'a'
      }
    }];
    const validate = ajv.compile(schemaHelper.field_007);
    const valid = validate(data);
    if (validate.errors) {
      expect(validate.errors.some(error => error.message === 'should be equal to one of the allowed values')).to.be.true;
    }
    expect(valid).to.be.false;
  });
});

describe('Data Elements (008) schema', function () {
  it('should validate', function (done) {
    const data = {
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
    };
    refParser.dereference(schemaHelper.field_008, (error, schema) => {
      if (error) return done(error);
      const validate = ajv.compile(schema);
      const valid = validate(data);
      if (validate.errors) console.dir(validate.errors, { depth: 8 });
      expect(valid).to.be.true;
      done();
    });
  });

  it('shouldn\'t validate with an unauthorized values', function (done) {
    const data = {
      positions: {
        '00-05': '190816',
        '06': 'c',
        '07-10': '1869',
        '11-14': '9999',
        '15-17': 'enk',
        18: 'x',
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
    };
    refParser.dereference(schemaHelper.field_008, (error, schema) => {
      if (error) return done(error);
      const validate = ajv.compile(schema);
      const valid = validate(data);
      expect(valid).to.be.false;
      done();
    });
  });
});

describe('International Standard Serial Number (022) schema', function () {
  it('should validate', function () {
    const data = {
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
    };
    const validate = ajv.compile(schemaHelper.field_022);
    const valid = validate(data);
    if (validate.errors) console.dir(validate.errors, { depth: 8 });
    expect(valid).to.be.true;
  });

  it('shouldn\'t validate with a missing required property and additional property', function () {
    const data = {
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
    };
    const validate = ajv.compile(schemaHelper.field_022);
    const valid = validate(data);
    if (validate.errors) {
      expect(validate.errors.some(error => error.message === 'should NOT have additional properties')).to.be.true;
      expect(validate.errors.some(error => error.message === "should have required property 'a'")).to.be.true;
      expect(validate.errors.some(error => error.message === 'should contain at least 1 valid item(s)')).to.be.true;
    }
    expect(valid).to.be.false;
  });
});

describe('Country of Publishing/Producing Entity Code (044) schema', function () {
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
    const validate = ajv.compile(schemaHelper.field_044);
    const valid = validate(data);
    if (validate.errors) console.dir(validate.errors, { depth: 8 });
    expect(valid).to.be.true;
  });

  it('shouldn\'t validate with a missing required property', function () {
    const data = {
      indicator1: '\\',
      indicator2: '\\',
      subFields: [
        {
          a: 'GBR'
        }
      ]
    };
    const validate = ajv.compile(schemaHelper.field_044);
    const valid = validate(data);
    if (validate.errors) {
      expect(validate.errors.some(error => error.message === "should have required property 'c'")).to.be.true;
      expect(validate.errors.some(error => error.message === 'should contain at least 1 valid item(s)')).to.be.true;
    }
    expect(valid).to.be.false;
  });
});

describe('Key Title (222) schema', function () {
  it('should validate', function () {
    const data = {
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
    };
    const validate = ajv.compile(schemaHelper.field_222);
    const valid = validate(data);
    if (validate.errors) console.dir(validate.errors, { depth: 8 });
    expect(valid).to.be.true;
  });

  it('shouldn\'t validate with an additional property', function () {
    const data = {
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
    };
    const validate = ajv.compile(schemaHelper.field_222);
    const valid = validate(data);
    if (validate.errors) {
      expect(validate.errors.some(error => error.message === 'should NOT have additional properties')).to.be.true;
    }
    expect(valid).to.be.false;
  });
});

describe('Varying Form of Title (246) schema', function () {
  it('should validate', function () {
    const data = [{
      indicator1: '0',
      indicator2: '0',
      subFields: [
        {
          a: 'Variant title'
        },
        {
          b: '(something)'
        }
      ]
    }];
    const validate = ajv.compile(schemaHelper.field_246);
    const valid = validate(data);
    if (validate.errors) console.dir(validate.errors, { depth: 8 });
    expect(valid).to.be.true;
  });

  it('shouldn\'t validate with an additional property', function () {
    const data = [{
      indicator1: '0',
      indicator2: '0',
      subFields: [
        {
          a: 'Variant title'
        },
        {
          x: '(something)'
        }
      ]
    }];
    const validate = ajv.compile(schemaHelper.field_246);
    const valid = validate(data);
    if (validate.errors) {
      expect(validate.errors.some(error => error.message === 'should NOT have additional properties')).to.be.true;
    }
    expect(valid).to.be.false;
  });
});

describe('Publication, Distribution, etc. (Imprint) (260) schema', function () {
  it('should validate', function () {
    const data = [{
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
    }];
    const validate = ajv.compile(schemaHelper.field_260);
    const valid = validate(data);
    if (validate.errors) console.dir(validate.errors, { depth: 8 });
    expect(valid).to.be.true;
  });

  it('shouldn\'t validate with a missing required property and additional property', function () {
    const data = [{
      indicator1: '\\',
      indicator2: '\\',
      subFields: [
        {
          a: 'Paris'
        },
        {
          w: 'something'
        }
      ]
    }];
    const validate = ajv.compile(schemaHelper.field_260);
    const valid = validate(data);
    if (validate.errors) {
      if (validate.errors) {
        expect(validate.errors.some(error => error.message === 'should NOT have additional properties')).to.be.true;
        expect(validate.errors.some(error => error.message === "should have required property 'b'")).to.be.true;
        expect(validate.errors.some(error => error.message === 'should contain at least 1 valid item(s)')).to.be.true;
      }
    }
    expect(valid).to.be.false;
  });
});

describe('Production, Publication, Distribution, Manufacture, and Copyright Notice (264) schema', function () {
  it('should validate', function () {
    const data = [{
      indicator1: '2',
      indicator2: '0',
      subFields: [
        {
          a: 'Paris'
        },
        {
          b: 'My Publisher'
        }
      ]
    }];
    const validate = ajv.compile(schemaHelper.field_264);
    const valid = validate(data);
    if (validate.errors) console.dir(validate.errors, { depth: 8 });
    expect(valid).to.be.true;
  });

  it('shouldn\'t validate with a missing required property and additional property', function () {
    const data = [{
      indicator1: '2',
      indicator2: '0',
      subFields: [
        {
          a: 'Paris'
        },
        {
          w: 'something'
        }
      ]
    }];
    const validate = ajv.compile(schemaHelper.field_264);
    const valid = validate(data);
    if (validate.errors) {
      if (validate.errors) {
        expect(validate.errors.some(error => error.message === 'should NOT have additional properties')).to.be.true;
        expect(validate.errors.some(error => error.message === "should have required property 'b'")).to.be.true;
        expect(validate.errors.some(error => error.message === 'should contain at least 1 valid item(s)')).to.be.true;
      }
    }
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
