const jsonSchema = require('./dist/himarc.schema.json');

module.exports = buildJsonSchemaProxy(jsonSchema);

function buildJsonSchemaProxy (obj) {
  return new Proxy(obj, {
    get (target, name) {
      let value;
      if (name in target) {
        value = target[name];
      } else if ('properties' in target && name in target.properties) {
        value = target.properties[name];
      }
      const isObject = obj => obj === Object(obj);
      return isObject(value) ? buildJsonSchemaProxy(value) : value;
    }
  });
}
