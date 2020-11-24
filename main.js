const jsonSchema = require('./dist/himarc.schema.json');

module.exports = buildJsonSchemaProxy(jsonSchema);

function buildJsonSchemaProxy (obj) {
  return new Proxy(obj, {
    get (target, name) {
      const isObject = obj => obj === Object(obj);
      if (name in target) {
        return target[name];
      } else {
        const value = target.properties[name];
        return isObject(value) ? buildJsonSchemaProxy(value) : value;
      }
    }
  });
}
