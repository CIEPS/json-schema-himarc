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
// Object.entries(schema)
//   .filter(([key, value]) => value.type === 'array')
//   .map(([key, value]) => {
//     if ('isRepeatable' in value.items) delete value.items.isRepeatable;
//     if ('isRepeatable' in value === false) value.isRepeatable = true;
//     fs.writeFileSync(path.join(__dirname, `../src/${key.replace('_', '-')}.schema.json`), JSON.stringify(value, null, 2));
//     return ([key, value]);
//   });

// Profil ISSN for 76X
Object.entries(schema)
  .filter(([key]) => ['760', '762', '765', '767', '770', '772', '775', '776', '777', '780', '785', '787'].includes(key.slice(6)))
  .map(([key, value]) => {
    console.log(key);
    value.profilISSN = 'mandatory if applicable';
    value.items.properties.subFields.items.properties.t.profilISSN = 'mandatory if applicable';
    value.items.properties.subFields.items.properties.x.profilISSN = 'mandatory if applicable';
    value.items.properties.subFields.items.properties['6'].profilISSN = 'optional';
    fs.writeFileSync(path.join(__dirname, `../src/${key.replace(/_/g, '-')}-register.schema.json`), JSON.stringify(value, null, 2));
    value.profilISSN = 'optional';
    fs.writeFileSync(path.join(__dirname, `../src/${key.replace(/_/g, '-')}-work.schema.json`), JSON.stringify(value, null, 2));
    return ([key, value]);
  });
