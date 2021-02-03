<template>
  <div id="app">
    <section class="section">
      <div class="container">
        <h1 class="title">
          PROFILE OF ISSN - MARC 21 / JSON SCHEMA HIMARC (under construction)
        </h1>
        <div class="card mb-3">
          <header class="card-header">
            <p class="card-header-title">
              <span class="tag is-primary is-medium mr-2">LDR</span>
              {{ leader.title }}
              <span class="tag is-light mx-2">
                {{ leader.isRepeatable? 'repeatable' : 'non repeatable' }}
              </span>
              <span class="tag is-warning is-light mx-2" v-if="leader.profilISSN">
                {{ leader.profilISSN }}
              </span>
            </p>
          </header>
            <div class="card-content">
              <div class="content">
                <table
                  class="table is-narrow is-striped is-hoverable is-bordered"
                >
                  <thead class="has-background-info-light">
                    <tr>
                      <th class="has-text-right">Position</th>
                      <th class="has-text-left">Title</th>
                      <th>Mandatory field</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="[position, value] in leaderPositions" :key="position">
                      <td class="has-text-right">{{ position }}</td>
                      <td class="has-text-left">{{ value.title }}</td>
                      <td>
                        <span class="tag is-warning is-light mx-2" v-if="value.profilISSN">
                          {{ value.profilISSN }}
                        </span>
                      </td>
                      <td>
                        <table
                          class="table is-narrow is-striped is-hoverable is-bordered"
                          v-if="'codes' in value"
                        >
                          <thead class="has-background-info-light">
                            <tr>
                              <th class="has-text-right">Code</th>
                              <th class="has-text-left">Title</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(value, code) in value.codes" :key="value.title">
                              <td class="has-text-right">{{ code }}</td>
                              <td class="has-text-left">{{ value.title }}</td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
        </div>

        <div class="card mb-3" v-for="controlfield in controlfields" :key="controlfield.tag">
          <header class="card-header">
            <p class="card-header-title">
              <span class="tag is-primary is-medium mr-2">{{ controlfield.tag }}</span>
              {{ controlfield.value.title }}
              <span class="tag is-light mx-2">
                {{ controlfield.value.isRepeatable? 'repeatable' : 'non repeatable' }}
              </span>
              <span class="tag is-warning is-light mx-2" v-if="controlfield.value.profilISSN">
                {{ controlfield.value.profilISSN }}
              </span>
            </p>
          </header>
        </div>

        <div class="card mb-3">
          <header class="card-header">
            <p class="card-header-title">
              <span class="tag is-primary is-medium mr-2">007</span>
              {{ field007.title }}
              <span class="tag is-light mx-2">
                {{ field007.isRepeatable? 'repeatable' : 'non repeatable' }}
              </span>
              <span class="tag is-warning is-light mx-2" v-if="field007.profilISSN">
                {{ field007.profilISSN }}
              </span>
            </p>
          </header>
        </div>

        <div class="card mb-3" v-for="datafield in datafields" :key="datafield.tag">
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
                        <th class="has-text-right">Indicator 1</th>
                        <th class="has-text-left">Title</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(value, key) in datafield.value.properties.indicator1.code" :key="key">
                        <td class="has-text-right">{{ key }}</td>
                        <td class="has-text-left">{{ value.title }}</td>
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
                        <th class="has-text-right">Indicator 2</th>
                        <th class="has-text-left">Title</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(value, key) in datafield.value.properties.indicator2.code" :key="key">
                        <td class="has-text-right">{{ key }}</td>
                        <td class="has-text-left">{{ value.title }}</td>
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
                    <th class="has-text-right">Subfield zone</th>
                    <th class="has-text-left">Title</th>
                    <th>Mandatory field</th>
                    <th>Is Repeatable ?</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(value, key) in datafield.value.properties.subFields.items.properties" :key="key">
                    <td class="has-text-right">${{ key }}</td>
                    <td class="has-text-left">{{ value.title }}</td>
                    <td>
                      <span class="tag is-warning is-light mx-2" v-if="value.profilISSN">
                        {{ value.profilISSN }}
                      </span>
                    </td>
                    <td>
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
      isProfilISSN: true
    };
  },
  computed: {
    leader: function () {
      return schemaRegister.properties.fields.properties.LDR;
    },
    leaderPositions: function () {
      return Object.entries(schemaRegister.properties.fields.properties.LDR.properties.positions.properties)
        .sort(([a], [b]) =>{
          if (a.length > 2) a = a.slice(0, 2);
          if (b.length > 2) b = b.slice(0, 2);
          return a - b;
        });
    },
    field007: function () {
      return schemaRegister.properties.fields.properties['007'];
    },
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
