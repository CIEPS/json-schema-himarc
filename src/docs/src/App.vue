<template>
  <div id="app">
    <section class="section">
      <div class="container">
        <h1 class="title">PROFILE OF ISSN - MARC 21 / JSON SCHEMA HIMARC</h1>
        <h3 class="subtitle">(under construction)</h3>

         <b-tabs type="is-toggle" v-model="activeTab" @input="changeTab" :multiline="true">
           <template v-for="tab in tabs">
              <b-tab-item
                :key="tab.label"
                :label="tab.label">
              </b-tab-item>
            </template>
        </b-tabs>
        
        <div v-for="field in fields" :key="field.tag">
          <div :id="field.tag" class="card mb-3" v-if="field.tag === 'LDR'">
            <header class="card-header">
              <p class="card-header-title">
                <span class="tag is-primary is-medium mr-2">LDR</span>
                {{ field.value.title }}
                <span class="tag is-light mx-2">
                  {{ field.value.isRepeatable? 'repeatable' : 'non repeatable' }}
                </span>
                <span class="tag is-warning is-light mx-2" v-if="field.value.profilISSN">
                  {{ field.value.profilISSN }}
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
                      <th class="has-text-right is-narrow">Position</th>
                      <th>Title</th>
                      <th class="has-text-centered">Mandatory field</th>
                      <th class="has-text-centered">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="[position, value] in leaderPositions" :key="position">
                      <td>{{ position }}</td>
                      <td class="has-text-left">{{ value.title }}</td>
                      <td class="has-text-centered">
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
                              <th class="has-text-right is-narrow">Code</th>
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

          <div :id="field.tag" class="card mb-3" v-if="['001', '003', '005'].includes(field.tag)">
            <header class="card-header">
              <p class="card-header-title">
                <span class="tag is-primary is-medium mr-2">{{ field.tag }}</span>
                {{ field.value.title }}
                <span class="tag is-light mx-2">
                  {{ field.value.isRepeatable? 'repeatable' : 'non repeatable' }}
                </span>
                <span class="tag is-warning is-light mx-2" v-if="field.value.profilISSN">
                  {{ field.value.profilISSN }}
                </span>
              </p>
            </header>
          </div>

          <div :id="field.tag" class="card mb-3"  v-if="field.tag === '007'">
            <header class="card-header">
              <p class="card-header-title">
                <span class="tag is-primary is-medium mr-2">007</span>
                {{ field.value.title }}
                <span class="tag is-light mx-2">
                  {{ field.value.isRepeatable? 'repeatable' : 'non repeatable' }}
                </span>
                <span class="tag is-warning is-light mx-2" v-if="field.value.profilISSN">
                  {{ field.value.profilISSN }}
                </span>
              </p>
            </header>
            <div class="card-content">
              <div class="content">
                <table
                  class="table is-narrow is-striped is-hoverable is-bordered"
                  v-for="(field007Category, index) in field007Categories"
                  :key="index"
                >
                  <thead class="has-background-info-light">
                    <tr>
                      <th class="has-text-right is-narrow">Position</th>
                      <th class="has-text-left">Title</th>
                      <th>Mandatory field</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(value, position) in field007Category" :key="position">
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
                              <th class="has-text-right is-narrow">Code</th>
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

          <div :id="field.tag" class="card mb-3"  v-if="field.tag === '008'">
            <header class="card-header">
              <p class="card-header-title">
                <span class="tag is-primary is-medium mr-2">008</span>
                {{ field.value.title }}
                <span class="tag is-light mx-2">
                  {{ field.value.isRepeatable? 'repeatable' : 'non repeatable' }}
                </span>
                <span class="tag is-warning is-light mx-2" v-if="field.value.profilISSN">
                  {{ field.value.profilISSN }}
                </span>
              </p>
            </header>
            <div class="card-content">
              <div class="content">
                <table
                  class="table is-narrow is-striped is-hoverable is-bordered"
                  v-for="(field008Type, name) in field008Types"
                  :key="name"
                >
                  <thead class="has-background-info-light">
                    <tr>
                      <th colspan="4">
                        {{ name }}
                      </th>
                    </tr>
                  </thead>
                  <thead class="has-background-info-light">
                    <tr>
                      <th class="has-text-right is-narrow">Position</th>
                      <th class="has-text-left">Title</th>
                      <th class="has-text-centered">Mandatory field</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="[position, value] in getPositionFromField008Type(field008Type)" :key="position">
                      <td class="has-text-right">{{ position }}</td>
                      <td class="has-text-left">{{ value.title }}</td>
                      <td class="has-text-centered">
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
                              <th class="has-text-right is-narrow">Code</th>
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

          <div :id="field.tag" class="card mb-3" v-if="!field.tag.startsWith('00') && field.tag !== 'LDR'">
            <header class="card-header">
              <p class="card-header-title">
                <span class="tag is-primary is-medium mr-2">{{ field.tag }}</span>
                {{ field.value.title }}
                <span class="tag is-light mx-2">
                  {{ field.value.isRepeatable? 'repeatable' : 'non repeatable' }}
                </span>
                <span class="tag is-warning is-light mx-2" v-if="field.value.profilISSN">
                  {{ field.value.profilISSN }}
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
                          <th class="has-text-right is-narrow">Indicator 1</th>
                          <th class="has-text-left">Title</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(value, key) in field.value.properties.indicator1.code" :key="key">
                          <td class="has-text-right is-narrow">{{ key }}</td>
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
                          <th class="has-text-right is-narrow">Indicator 2</th>
                          <th class="has-text-left">Title</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(value, key) in field.value.properties.indicator2.code" :key="key">
                          <td class="has-text-right">{{ key }}</td>
                          <td class="has-text-left">{{ value.title }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <table
                  class="table is-narrow is-striped is-hoverable is-bordered"
                  v-if="'subFields' in field.value.properties"
                >
                  <thead class="has-background-info-light">
                    <tr>
                      <th class="has-text-right is-narrow">Subfield zone</th>
                      <th>Title</th>
                      <th class="has-text-centered is-narrow">Mandatory field</th>
                      <th class="has-text-centered is-narrow">Is Repeatable ?</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(value, key) in field.value.properties.subFields.items.properties" :key="key">
                      <td class="has-text-right">${{ key }}</td>
                      <td>{{ value.title }}</td>
                      <td class="has-text-centered">
                        <span class="tag is-warning is-light mx-2" v-if="value.profilISSN">
                          {{ value.profilISSN }}
                        </span>
                      </td>
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
      </div>
    </section>
  </div>
</template>

<script>
import schemaRegister from "../../../dist/himarc-register.schema.json";

const initFields = () => Object.keys(schemaRegister.properties.fields.properties)
  .sort((a, b) => (a === "LDR" ? -Infinity : b === "LDR" ? Infinity : a - b))
  .map(tag => {
    return {
        tag,
        value: schemaRegister.properties.fields.properties[tag]
      }
  })
  .map(({ tag, value }) => {
    const output = (value.type === 'array')
      ? { tag, value: { ...value, ...value.items } }
      : { tag, value };
    return output;
  });
const fields = initFields().filter(field => field.tag === 'LDR');

const tabs = [
  {
    label: 'Leader',
    filter: () => initFields().filter(field => field.tag === 'LDR')
  },
  {
    label: '00X: Control Fields',
    filter: () => initFields().filter(field => /00[1-9]/.test(field.tag))
  },
  {
    label: '01X-09X: Numbers and Code Fields',
    filter: () => initFields().filter(field => /0[1-9][0-9]/.test(field.tag))
  },
  {
    label: '1XX: Main Entry Fields',
    filter: () => initFields().filter(field => /1[0-9][0-9]/.test(field.tag))
  },
  {
    label: '20X-24X - Title and Title-Related Fields - General Information',
    filter: () => initFields().filter(field => /2[0-4][0-9]/.test(field.tag))
  },
  {
    label: '25X-28X: Edition, Imprint, Etc. Fields',
    filter: () => initFields().filter(field => /2[5-8][0-9]/.test(field.tag))
  },
  {
    label: '3XX: Physical Description, Etc. Fields',
    filter: () => initFields().filter(field => /3[0-9][0-9]/.test(field.tag))
  },
  {
    label: '4XX: Series Statement Fields',
    filter: () => initFields().filter(field => /4[0-9][0-9]/.test(field.tag))
  },
  {
    label: '5XX: Note Fields',
    filter: () => initFields().filter(field => /5[0-9][0-9]/.test(field.tag))
  },
  {
    label: '6XX: Subject Access Fields',
    filter: () => initFields().filter(field => /6[0-9][0-9]/.test(field.tag))
  },
  {
    label: '70X-75X: Added Entry Fields',
    filter: () => initFields().filter(field => /7[5-9][0-9]/.test(field.tag))
  },
  {
    label: '76X-78X: Linking Entry Fields',
    filter: () => initFields().filter(field => /7[6-8][0-9]/.test(field.tag))
  },
  {
    label: '80X-83X: Series Added Entry Fields',
    filter: () => initFields().filter(field => /8[0-3][0-9]/.test(field.tag))
  },
  {
    label: '841-88X: Holdings, Location, Alternate Graphics, Etc. Fields',
    filter: () => initFields().filter(field => /8[4-8][1-9]/.test(field.tag))
  },
]

export default {
  name: "App",
  data: function () {
    return {
      tabs,
      fields,
      activeTab: 0
    };
  },
  computed: {
    leaderPositions: function () {
      return Object.entries(schemaRegister.properties.fields.properties.LDR.properties.positions.properties)
        .sort(([a], [b]) =>{
          if (a.length > 2) a = a.slice(0, 2);
          if (b.length > 2) b = b.slice(0, 2);
          return a - b;
        });
    },
    field007Categories: function () {
      return Object.values(schemaRegister.properties.fields.properties['007'].definitions)
        .map(item => item.properties);
    },
    field008Types: function () {
      return schemaRegister.properties.fields.properties['008'].definitions;
    }
  },
  methods: {
    getPositionFromField008Type: function (field008Type) {
      return Object.entries(field008Type.properties.positions.properties)
        .sort(([a], [b]) =>{
            if (a.length > 2) a = a.slice(0, 2);
            if (b.length > 2) b = b.slice(0, 2);
            return a - b;
          });
    },
    changeTab: function (activeTab) {
      this.fields = this.tabs[activeTab].filter();
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
