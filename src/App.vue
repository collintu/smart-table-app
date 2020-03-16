<template>
  <div id="app">
    <data-table :rows="contacts" :rowsPerPage="3"/>
  </div>
</template>

<script>
import DataTable from "./components/DataTable.vue";
import dataSource from "./assets/data.json";

export default {
  name: "App",
  components: {
    DataTable
  },
  computed: {
    contacts() {
      return dataSource.contacts.map(item => {
        return item;
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
