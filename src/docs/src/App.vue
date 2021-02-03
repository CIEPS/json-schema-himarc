<template>
  <div id="app">
    <section class="section">
      <div class="container">
        <h1 class="title">
          PROFILE OF ISSN - MARC 21 / JSON SCHEMA HIMARC (under construction)
        </h1>
        <div class="card mb-3" v-for="(datafield, index) in datafields" :key="index">
          <header class="card-header">
            <p class="card-header-title">
              <span class="tag is-primary is-medium mr-2">{{ datafield.tag }}</span>
              {{ datafield.value.title }}
              <span class="tag is-light mx-2">
                {{ datafield.value.isRepeatable? 'repeatable' : 'non repeatable' }}
              </span>
              <span class="tag is-warning is-light mx-2" v-if="datafield.value.profilISSN">
                {{ datafield.value.profilISSN }}
              </span>
            </p>
          </header>
          <div class="card-content">
            <div class="content">
              <div class="columns">
                <div class="column">
                  <table
                    class="table is-narrow is-striped is-hoverable is-bordered"
                  >
                    <thead class="has-background-info-light">
                      <tr>
                        <th class="has-text-centered">Indicator 1</th>
                        <th>Title</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(value, key) in datafield.value.properties.indicator1.code" :key="key">
                        <td class="has-text-centered">{{ key }}</td>
                        <td>{{ value.title }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="column">
                  <table
                    class="table is-narrow is-striped is-hoverable is-bordered"
                  >
                    <thead class="has-background-info-light">
                      <tr>
                        <th class="has-text-centered">Indicator 2</th>
                        <th>Title</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(value, key) in datafield.value.properties.indicator2.code" :key="key">
                        <td class="has-text-centered">{{ key }}</td>
                        <td>{{ value.title }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <table
                class="table is-narrow is-striped is-hoverable is-bordered"
                v-if="'subFields' in datafield.value.properties"
              >
                <thead class="has-background-info-light">
                  <tr>
                    <th class="has-text-centered">Subfield zone</th>
                    <th>Title</th>
                    <th class="has-text-centered">Mandatory field</th>
                    <th class="has-text-centered">Is Repeatable ?</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(value, key) in datafield.value.properties.subFields.items.properties" :key="key">
                    <td class="has-text-centered">${{ key }}</td>
                    <td>{{ value.title }}</td>
                    <td class="has-text-centered">{{ value.profilISSN }}</td>
                    <td class="has-text-centered">
                      <b-checkbox v-model="value.isRepeatable"></b-checkbox>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import schemaRegister from "../../../dist/himarc-register.schema.json";

export default {
  name: "App",
  components: {
    HelloWorld,
  },
  data: function () {
    return {
      schemaRegister,
    };
  },
  computed: {
    controlfields: function() {
      return Object.entries(schemaRegister.properties.fields.properties)
      .filter(([tag]) => ['001', '003', '005'].includes(tag))
      .sort((a, b) => a[0] - b[0])
      .map(([tag, value]) => {
        const output = (value.type === 'array')
          ? { tag, value: { ...value, ...value.items } }
          : { tag, value };
        return output;
      });
    },
    datafields: function() {
      return Object.entries(schemaRegister.properties.fields.properties)
        .filter(([tag]) => !tag.startsWith('00') && tag !== 'LDR')
        .sort((a, b) => a[0] - b[0])
        .map(([tag, value]) => {
          const output = (value.type === 'array')
            ? { tag, value: { ...value, ...value.items } }
            : { tag, value };
          return output;
        });
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
