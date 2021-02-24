<template>
  <div id="LDR" class="card mb-3">
    <header class="card-header">
      <p class="card-header-title">
        <span class="tag is-primary is-medium mr-2">LDR</span>
        {{ leader.title }}
        <span class="tag is-light mx-2">
          {{ leader.isRepeatable ? "repeatable" : "non repeatable" }}
        </span>
        <span class="tag is-warning is-light mx-2" v-if="leader.ISSNProfile">
          {{ leader.ISSNProfile }}
        </span>
      </p>
    </header>
    <div class="card-content">
      <div class="content">
        <table class="table is-narrow is-striped is-hoverable is-bordered">
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
                <span
                  class="tag is-warning is-light mx-2"
                  v-if="value.ISSNProfile"
                >
                  {{ value.ISSNProfile }}
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
</template>

<script>
import schemaRegister from "../../../dist/himarc-register.schema.json";

export default {
  name: "leader",
  computed: {
    filteredDataArray() {
      return this.tags.filter((option) => {
        return option
          .toString()
          .toLowerCase()
          .indexOf(this.name.toLowerCase()) >= 0
      })
    },
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
    }
  }
};
</script>