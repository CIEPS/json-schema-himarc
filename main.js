const jsonSchema = require('./dist/himarc.schema.json');

module.exports = buildJsonSchemaProxy(jsonSchema);

function buildJsonSchemaProxy (obj) {
  return new Proxy(obj, {
    get (target, name) {
      const isObject = obj => obj === Object(obj);
      const value = (name in target) ? target[name] : target.properties[name];
      return isObject(value) ? buildJsonSchemaProxy(value) : value;
    }
  });
}
