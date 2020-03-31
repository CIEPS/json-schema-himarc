/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
'use strict';

const { expect } = require('chai');
const Ajv = require('ajv');
const schema = require('../dist/himarc.schema.json');
const ajv = new Ajv({ allErrors: true });
const validate = ajv.compile(schema);

describe('json schema himarc', function () {
  describe('LDR', function () {
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
          }
        }
      };
      const valid = validate(data);
      expect(valid).to.be.true;
    });

    it('shouldn\'t validate', function () {
      const data = {
        fields: {
          LDR: {
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
          }
        }
      };
      const valid = validate(data);
      expect(valid).to.be.false;
    });
  });

  describe('007', function () {
    it('should validate', function () {
      const data = {
        fields: {
          '007': [{
            positions: {
              '00': 't',
              '01': 'a'
            }
          }]
        }
      };
      const valid = validate(data);
      expect(valid).to.be.true;
    });

    it('shouldn\'t validate', function () {
      const data = {
        fields: {
          '007': [{
            positions: {
              '00': 'x',
              '01': 'a'
            }
          }]
        }
      };
      const valid = validate(data);
      expect(valid).to.be.false;
    });
  });

  describe('022', function () {
    it('should validate', function () {
      const data = {
        fields: {
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
          }]
        }
      };
      const valid = validate(data);
      expect(valid).to.be.true;
    });

    it('shouldn\'t validate', function () {
      const data = {
        fields: {
          '022': [{
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
          }]
        }
      };
      const valid = validate(data);
      expect(valid).to.be.false;
    });
  });

  describe('044', function () {
    it('should validate', function () {
      const data = {
        fields: {
          '044': {
            indicator1: '\\',
            indicator2: '\\',
            subFields: [
              {
                c: 'GBR'
              }
            ]
          }
        }
      };
      const valid = validate(data);
      expect(valid).to.be.true;
    });

    it('shouldn\'t validate', function () {
      const data = {
        fields: {
          '044': {
            indicator1: '\\',
            indicator2: '\\',
            subFields: [
              {
                c: 'GBRA'
              }
            ]
          }
        }
      };
      const valid = validate(data);
      expect(valid).to.be.false;
    });
  });

  describe('222', function () {
    it('should validate', function () {
      const data = {
        fields: {
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
      const valid = validate(data);
      expect(valid).to.be.true;
    });

    it('shouldn\'t validate', function () {
      const data = {
        fields: {
          222: [{
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
          }]
        }
      };
      const valid = validate(data);
      expect(valid).to.be.false;
    });
  });
});
