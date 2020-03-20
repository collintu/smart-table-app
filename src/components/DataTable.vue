<template>
  <div class="container">
    <div class="filter">
      <nb-dropdown
        text="Filter"
        simple-button
        single-button
        v-on:command="onFilterChange"
        trigger="click"
      >
        <nb-dropdown-menu slot="dropdown">
          <nb-dropdown-item
            :command="col"
            v-for="(col, idx) in columns"
            :key="idx"
          >
            {{ col }}
          </nb-dropdown-item>
        </nb-dropdown-menu>
      </nb-dropdown>
      <input class="form-control" v-model="filters.name.value" />
      <label class="filterName">by {{ filterName }}</label>
    </div>

    <div class="dataTable">
      <v-table
        :data="rows"
        :filters="filters"
        :currentPage.sync="currentPage"
        :pageSize="rowsPerPage"
        @totalPagesChanged="totalPages = $event"
        selectionMode="multiple"
        selectedClass="table-info"
        @selectionChanged="selectedRows = $event"
      >
        <thead slot="head">
          <v-th v-for="(col, idx) in columns" :key="idx" :sortKey="col">
            {{ col }}
          </v-th>
        </thead>
        <tbody slot="body" slot-scope="{ displayData }">
          <v-tr v-for="(row, idx) in displayData" :key="idx" :row="row">
            <td v-for="(col, idx) in columns" :key="idx">{{ row[col] }}</td>
          </v-tr>
        </tbody>
      </v-table>
    </div>

    <div class="pagination">
      <smart-pagination
        :currentPage.sync="currentPage"
        :totalPages="totalPages"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "DataTable",
  data() {
    return {
      currentPage: 1,
      selectedRows: [],
      filterName: "",
      filters: {
        name: {
          value: "",
          keys: ["id", "name", "phone", "profession", "address"]
        }
      }
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
    },
    totalPages: {
      get() {
        return Math.ceil(this.rows.length / this.rowsPerPage);
      },
      set() {}
    }
  },
  methods: {
    sortTable(col) {
      this.rows.sort((a, b) => {
        return a[col] > b[col];
      });
    },
    onFilterChange(command) {
      debugger;
      this.filterName = command;
    }
  }
};
</script>

<style>
div {
  text-align: left;
}
.filter,
.filterName {
  padding: 5px 5px 0px 12px;
}
.pagination {
  padding: 0px;
}
table {
  font-family: "Open Sans", sans-serif;
  width: 65%;
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
.table-info {
  background: #c2c5d8;
}
table tr:hover {
  background: #aabd7d;
}
.smart-pagination {
  font-family: "Open Sans", sans-serif;
  text-align: left;
  width: 100%;
  position: relative;
  left: 10px;
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
