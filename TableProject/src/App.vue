<template>
  <div class="container" id="app">
    <!-- 过滤模块 -->
    <div class="filter-module">
      <div class="singlefilter">
        Name:
        <select v-model="$store.state.filterName" placeholder="请选择过滤">
          <option value="ALL">ALL</option>
          <option v-for="item in $store.state.TableData">
            {{ item.name }}
          </option>
        </select>
      </div>
      <div class="singlefilter">
        Sex:
        <select v-model="$store.state.filterSex" placeholder="请选择过滤">
          <option value="ALL">ALL</option>
          <option v-for="item in $store.state.Sexset">
            {{ item }}
          </option>
        </select>
      </div>
      <div class="singlefilter">
        Birthday:
        <select v-model="$store.state.filterBirthday" placeholder="请选择过滤">
          <option value="ALL">ALL</option>
          <option v-for="item in $store.state.TableData">
            {{ item.birthday }}
          </option>
        </select>
      </div>
      <div class="singlefilter">
        Address:
        <select v-model="$store.state.filterAddress" placeholder="请选择过滤">
          <option value="ALL">ALL</option>
          <option v-for="item in $store.state.TableData">
            {{ item.addr }}
          </option>
        </select>
      </div>
      <div class="singlefilter">
        Student-ID:
        <select v-model="$store.state.filterStudentID" placeholder="请选择过滤">
          <option value="ALL">ALL</option>
          <option v-for="item in $store.state.TableData">
            {{ item.stuid }}
          </option>
        </select>
      </div>
    </div>
    <!-- 表格模块 -->

    <div class="table-module">
      <table class="table-css">
        <thead>
          <tr>
            <th v-for="item in $store.state.HeadData">
              {{ item.name }}
              <!-- name排序 -->
              <button
                class="sortbutton"
                v-on:click="sortByNameAsc"
                v-if="item.name == 'Name'"
              >
                👆
              </button>
              <button
                class="sortbutton"
                v-on:click="sortByNameDsc"
                v-if="item.name == 'Name'"
              >
                👇
              </button>
              <!-- sex排序 -->
              <button
                class="sortbutton"
                v-on:click="sortBySexAsc"
                v-if="item.name == 'Sex'"
              >
                👆
              </button>
              <button
                class="sortbutton"
                v-on:click="sortBySexDsc"
                v-if="item.name == 'Sex'"
              >
                👇
              </button>
              <!-- Birthday排序 -->
              <button
                class="sortbutton"
                v-on:click="sortByBirthdayAsc"
                v-if="item.name == 'Birthday'"
              >
                👆
              </button>
              <button
                class="sortbutton"
                v-on:click="sortByBirthdayDsc"
                v-if="item.name == 'Birthday'"
              >
                👇
              </button>
              <!-- Address排序 -->
              <button
                class="sortbutton"
                v-on:click="sortByAddressAsc"
                v-if="item.name == 'Address'"
              >
                👆
              </button>
              <button
                class="sortbutton"
                v-on:click="sortByAddressDsc"
                v-if="item.name == 'Address'"
              >
                👇
              </button>
              <!-- stu-id排序 -->
              <button
                class="sortbutton"
                v-on:click="sortByStuidAsc"
                v-if="item.name == 'Student-ID'"
              >
                👆
              </button>
              <button
                class="sortbutton"
                v-on:click="sortByStuidDsc"
                v-if="item.name == 'Student-ID'"
              >
                👇
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in $store.state.TableData"
            v-if="
              ($store.state.filterName == 'ALL' ||
                item.name == $store.state.filterName) &&
              ($store.state.filterSex == 'ALL' ||
                item.sex == $store.state.filterSex) &&
              ($store.state.filterAddress == 'ALL' ||
                item.addr == $store.state.filterAddress) &&
              ($store.state.filterBirthday == 'ALL' ||
                item.birthday == $store.state.filterBirthday) &&
              ($store.state.filterStudentID == 'ALL' ||
                item.stuid == $store.state.filterStudentID)
            "
          >
            <td v-for="field in $store.state.HeadData">
              {{ item[field.fieldname] }}
            </td>
            <td>
              <button
                class="removebutton"
                v-on:click="remove(index)"
                v-if="
                  ($store.state.filterName == 'ALL' ||
                    item.name == $store.state.filterName) &&
                  ($store.state.filterSex == 'ALL' ||
                    item.sex == $store.state.filterSex) &&
                  ($store.state.filterAddress == 'ALL' ||
                    item.addr == $store.state.filterAddress) &&
                  ($store.state.filterBirthday == 'ALL' ||
                    item.birthday == filterBirthday) &&
                  ($store.state.filterStudentID == 'ALL' ||
                    item.stuid == $store.state.filterStudentID)
                "
              >
                Remove
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 添加模块 -->
    <div class="add-module">
      <div class="newinputdiv" v-for="item in $store.state.HeadData">
        {{ item.name + ":" }}
        <input
          v-model="$store.state.inputValue[item.fieldname]"
          placeholder="请输入任务"
          autofocus="autofocus"
          autocomplete="on"
          class="newinput"
        />
      </div>
      <button
        class="addbutton"
        v-on:click="add"
        autofocus="autofocus"
        autocomplete="off"
      >
        Add
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  store,
  methods: {
    add: function () {
      let copy = Object.assign({}, this.$store.state.inputValue); //添加一行数据
      this.$store.state.TableData.push(copy);
    },
    remove: function (index) {
      this.$store.state.TableData.splice(index, 1);
    },

    sortByStuidAsc: function () {
      //顺序从小到大
      this.$store.state.TableData.sort(function (a, b) {
        return a.stuid - b.stuid;
      });
    },
    sortByStuidDsc: function () {
      //逆序从大到小
      this.$store.state.TableData.sort(function (a, b) {
        return b.stuid - a.stuid;
      });
    },
    sortByNameAsc: function () {
      this.$store.state.TableData.sort(function (a, b) {
        return a.name.localeCompare(b.name, "en");
      });
    },
    sortByNameDsc: function () {
      this.$store.state.TableData.sort(function (a, b) {
        return b.name.localeCompare(a.name, "en");
      });
    },
    sortBySexAsc: function () {
      this.$store.state.TableData.sort(function (a, b) {
        return a.sex.localeCompare(b.sex, "en");
      });
    },
    sortBySexDsc: function () {
      this.$store.state.TableData.sort(function (a, b) {
        return b.sex.localeCompare(a.sex, "en");
      });
    },
    sortByBirthdayAsc: function () {
      this.$store.state.TableData.sort(function (a, b) {
        return a.birthday.localeCompare(b.birthday, "en");
      });
    },
    sortByBirthdayDsc: function () {
      this.$store.state.TableData.sort(function (a, b) {
        return b.birthday.localeCompare(a.birthday, "en");
      });
    },
    sortByAddressAsc: function () {
      this.$store.state.TableData.sort(function (a, b) {
        return a.addr.localeCompare(b.addr, "en");
      });
    },
    sortByAddressDsc: function () {
      this.$store.state.TableData.sort(function (a, b) {
        return b.addr.localeCompare(a.addr, "en");
      });
    },
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

html {
  font-family: sans-serif;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
}

body {
  margin: 10px;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
  font-size: larger;
}
.newinputdiv {
  display: inline-block;
}

.singlefilter {
  display: inline-block;
}

.addbutton {
  width: 80px;
  height: 30px;
  background-color: blanchedalmond;
  color: black;
  cursor: pointer;
}
.sortbutton {
  width: 30px;
  height: 30px;

  cursor: pointer;
}
.removebutton {
  width: 75px;
  height: 25px;
  background-color: powderblue;
  color: black;
  cursor: pointer;
  font-size: 15px;

  transition: color 0.2s ease-out;
}

td,
th {
  padding: 0;
}

.container .row {
  width: fit-content;
  height: fit-content;
}

.table-css {
  border-collapse: collapse;
  border-spacing: 0;
  empty-cells: show;
  border: 1px solid #cbcbcb;
}

.table-css td,
.table-css th {
  border-left: 1px solid #cbcbcb;
  border-width: 0 0 0 1px;
  font-size: inherit;
  margin: 0;
  overflow: visible;
  padding: 0.5em 1em;
}

.table-css thead {
  background-color: #e0e0e0;
  color: #000;
  text-align: left;
  vertical-align: bottom;
}

.table-css td {
  background-color: transparent;
}

.selector {
  width: 100px;
  height: 30px;
  font-size: 15px;
}
</style>
