#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { get } = require('lodash');
const fieldList = require('./bibliographic-field-list.json');
const himarcSchema = require('../src/himarc.schema.json');

const refs = fieldList.children
  .map(child => {
    const regex = /(?<tag>\w+)\s-\s(?<title>[\w\s-,\\/.\\(\\)'"]+)\s+\((?<repeatable>[\w\s]+)\)(?:\s*\[(?<obsolete>OBSOLETE)\])?/;
    const result = child.data.match(regex);
    return Object.assign(child, result.groups);
  }
  ).map(item => {
    const result = {
      tag: item.tag
    };
    let isRepeatable;
    if (['NR', 'R'].includes(item.repeatable)) {
      isRepeatable = item.repeatable === 'R';
    } else {
      isRepeatable = null;
    }
    result.isRepeatable = isRepeatable;
    const title = item.title.toLowerCase().split(' ').map(token => {
      const chars = token.split('');
      chars.splice(0, 1, token.charAt(0).toUpperCase());
      return chars.join('');
    }).join(' ');
    result.title = title;
    result.isObsolete = Boolean(item.obsolete);
    const indicators = get(item, 'children[0]');
    if (indicators && indicators.data === 'Indicators') {
      result.indicator1 = {
        title: indicators.children[0].data.split('-')[1].trim(),
        code: indicators.children[0].children.map(code => ({
          name: code.data.split('-')[0].trim(),
          title: code.data.split('-')[1].trim()
        }))
      };
      result.indicator2 = {
        title: indicators.children[1].data.split('-')[1].trim(),
        code: indicators.children[1].children.map(code => ({
          name: code.data.split('-')[0].trim(),
          title: code.data.split('-')[1].trim()
        }))
      };
    }
    const subFields = get(item, 'children[1]');
    if (subFields && subFields.data === 'Subfield Codes') {
      result.subFields = subFields.children.map(subField => {
        const regex = /\$(?<code>[\w+-]+)[\s-]+(?<title>[\w\s-,\\/.\\(\\)'"]+)(?:\s+\((?<repeatable>[\w\s]+)\))+(?:\s*\[(?<obsolete>OBSOLETE)\])?/;
        const groups = subField.data.match(regex).groups;
        const output = {
          code: groups.code,
          title: groups.title,
          isObsolete: Boolean(item.obsolete)
        };
        if (['NR', 'R'].includes(groups.repeatable)) {
          output.isRepeatable = groups.repeatable === 'R';
        }
        return output;
      });
    }
    return result;
  })
  .filter(item => !item.obsolete && item.isRepeatable !== null)
  .map(field => {
    const result = {
      title: field.title,
      url: `https://www.loc.gov/marc/bibliographic/bd${field.tag}.html`
    };

    const objField = {
      type: 'object',
      isRepeatable: field.isRepeatable,
      properties: {
        indicator1: {
          title: field.indicator1 ? field.indicator1.title : 'Undefined',
          type: 'string'
        },
        indicator2: {
          title: field.indicator2 ? field.indicator2.title : 'Undefined',
          type: 'string'
        }
      },
      required: [
        'indicator1',
        'indicator2',
        'subFields'
      ]
    };
    if ('indicator1' in field && 'code' in field.indicator1) {
      const codes = field.indicator1.code.map(item => item.name === '#' ? '\\' : item.name);
      if (codes.length > 1) {
        objField.properties.indicator1.enum = codes;
      }
      if (codes.length === 1) {
        objField.properties.indicator1.const = codes[0];
      }
      objField.properties.indicator1.code = field.indicator1.code.reduce((accumulator, current) => {
        accumulator[current.name === '#' ? '\\' : current.name] = { title: current.title };
        return accumulator;
      }, {});
    }
    if ('indicator2' in field && 'code' in field.indicator2) {
      const codes = field.indicator2.code.map(item => item.name === '#' ? '\\' : item.name);
      if (codes.length > 1) {
        objField.properties.indicator2.enum = codes;
      }
      if (codes.length === 1) {
        objField.properties.indicator2.const = codes[0];
      }
      objField.properties.indicator2.code = field.indicator2.code.reduce((accumulator, current) => {
        accumulator[current.name === '#' ? '\\' : current.name] = { title: current.title };
        return accumulator;
      }, {});
    }
    if ('subFields' in field) {
      objField.subFields = {
        type: 'array',
        items: {
          type: 'object',
          properties: field.subFields.reduce((accumulator, current) => {
            accumulator[current.code] = {
              title: current.title,
              type: 'string',
              isRepeatable: current.isRepeatable
            };
            if (current.isObsolete) accumulator[current.code].isObsolete = true;
            return accumulator;
          }, {}),
          additionalProperties: false
        }
      };
    }
    if (field.isRepeatable) {
      result.type = 'array';
      result.items = objField;
    } else {
      Object.assign(result, objField);
    }
    return { field, result };
  })
  .map(({ field, result }) => {
    const tmpPath = path.join(__dirname, '../tmp');
    if (!fs.existsSync(tmpPath)) {
      fs.mkdirSync(path.join(tmpPath));
    }
    fs.writeFileSync(path.join(__dirname, `../tmp/field-${field.tag}.schema.json`), JSON.stringify(result, null, 2));
    return field;
  })
  .reduce((accumulator, current) => {
    accumulator[current.tag] = {
      $ref: `field-${current.tag}.schema.json`
    };
    return accumulator;
  }, {});

Object.assign(himarcSchema.properties.fields.properties, refs);
fs.writeFileSync(path.join(__dirname, '../src/himarc.schema.json'), JSON.stringify(himarcSchema, null, 2));
