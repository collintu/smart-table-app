<template>
  <div>
    <v-table
      :data="rows"
      :currentPage.sync="currentPage"
      :pageSize="rowsPerPage"
      @totalPagesChanged="totalPages = $event"
    >
      <thead slot="head">
        <v-th v-for="col in columns" :key="col" :sortKey="col">
          {{ col }}
        </v-th>
      </thead>
      <tbody slot="body" slot-scope="{ displayData }">
        <tr v-for="row in displayData" :key="row">
          <td v-for="col in columns" :key="col">{{ row[col] }}</td>
        </tr>
      </tbody>
    </v-table>

    <smart-pagination
      :currentPage.sync="currentPage"
      :totalPages="totalPages"
    />
  </div>
</template>

<script>
export default {
  name: "DataTable",
  data() {
    return {
      currentPage: 1
    };
  },
  props: {
    rows: {
      type: Array,
      required: true
    },
    rowsPerPage: {
      type: Number,
      default: 3
    }
  },
  computed: {
    columns() {
      if (this.rows.length == 0) {
        return [];
      }

      return Object.keys(this.rows[0]);
    }
  },
  methods: {
    sortTable(col) {
      this.rows.sort((a, b) => {
        return a[col] > b[col];
      });
    },
    totalPages() {
      return Math.ceil(this.rows.length / this.rowsPerPage);
    }
  }
};
</script>

<style>
table {
  font-family: "Open Sans", sans-serif;
  width: 80%;
  border-collapse: collapse;
  border: 3px solid #44475c;
  margin: 10px 10px 0 10px;
}
table th {
  text-transform: uppercase;
  text-align: center;
  background: #44475c;
  color: #fff;
  padding: 8px;
  min-width: 30px;
}
table th:hover {
  background: #717699;
}
table td {
  text-align: left;
  padding: 8px;
  border-right: 2px solid #7d82a8;
}
table td:last-child {
  border-right: none;
}
table tbody tr:nth-child(2n) td {
  background: #d4d8f9;
}

.smart-pagination {
  font-family: "Open Sans", sans-serif;
  text-align: left;
  width: 100%;
}
.page-item {
  display: inline;
  padding: 10px 10px 10px;
  border: 1px solid #d9dbe9;
  text-align: center;
}
.page-item + .page-item {
  border-left: 0px;
}
.page-item.active {
  background: #6b7ce6;
}
.page-item:hover {
  background: #d9dbe9;
}
</style>
