const register = require('./dist/himarc-register.schema.json');
const work = require('./dist/himarc-work.schema.json');

module.exports = {
  register: buildJsonSchemaProxy(register),
  work: buildJsonSchemaProxy(work)
};

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
