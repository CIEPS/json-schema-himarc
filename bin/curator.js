const fs = require('fs');
const path = require('path');
const schema = require('../src');

// add minItems to one for array field
// Object.entries(schema)
//   .filter(([key]) => key.startsWith('field') && !key.startsWith('field_00'))
//   .filter(([key, value]) => value.type === 'array')
//   .map(([key, value]) => {
//     // console.log(key, value);
//     value.minItems = 1;
//     fs.writeFileSync(path.join(__dirname, `../src/${key.replace('_', '-')}.schema.json`), JSON.stringify(value, null, 2));
//     return ([key, value]);
//   });

// add minItems to subfields array
// Object.entries(schema)
//   .filter(([key]) => key.startsWith('field') && !key.startsWith('field_00'))
//   .map(([key, value]) => {
//     if (value.type === 'object') {
//       if ('subFields' in value.properties) {
//         value.properties.subFields.minItems = 1;
//       }
//     }

//     if (value.type === 'array') {
//       if ('subFields' in value.items.properties) {
//         value.items.properties.subFields.minItems = 1;
//       }
//     }
//     fs.writeFileSync(path.join(__dirname, `../src/${key.replace('_', '-')}.schema.json`), JSON.stringify(value, null, 2));
//     return ([key, value]);
//   });

// fix isRepeatable
Object.entries(schema)
  .filter(([key, value]) => value.type === 'array')
  .map(([key, value]) => {
    if ('isRepeatable' in value.items) delete value.items.isRepeatable;
    if ('isRepeatable' in value === false) value.isRepeatable = true;
    fs.writeFileSync(path.join(__dirname, `../src/${key.replace('_', '-')}.schema.json`), JSON.stringify(value, null, 2));
    return ([key, value]);
  });
