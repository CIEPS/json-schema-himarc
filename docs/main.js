/* global fetch Handlebars */

fetch('https://raw.githubusercontent.com/CIEPS/json-schema-himarc/add-profil-issn/dist/himarc-register.schema.json')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    const controlfields = Object.entries(data.properties.fields.properties)
      .filter(([tag]) => ['001', '003', '005'].includes(tag))
      .sort((a, b) => a[0] - b[0])
      .map(([tag, value]) => {
        const output = (value.type === 'array')
          ? { tag, value: { ...value, ...value.items } }
          : { tag, value };
        return output;
      });
    const datafields = Object.entries(data.properties.fields.properties)
      .filter(([tag]) => !tag.startsWith('00') && tag !== 'LDR')
      .sort((a, b) => a[0] - b[0])
      .map(([tag, value]) => {
        const output = (value.type === 'array')
          ? { tag, value: { ...value, ...value.items } }
          : { tag, value };
        return output;
      });
    const source = document.getElementById('app-template').innerHTML;
    const template = Handlebars.compile(source);
    const context = { datafields, controlfields };
    const html = template(context);
    document.getElementById('app').innerHTML = html;
  });
