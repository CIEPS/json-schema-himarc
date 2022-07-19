/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
'use strict';

const { expect } = require('chai');
const schemaProxies = require('../main.js');

describe('es6 proxies', () => {
  it('should access to nested data', () => {
    expect(schemaProxies.register.fields['008'].definitions['All Materials'].positions.properties['06'].title).to.equal('Type of date/Publication status');
  });
});
