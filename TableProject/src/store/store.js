import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    //保存所有数据，以对象的方式到处
    message: "This is a Self-Defined table",
    HeadData: [
      { name: "Name", fieldname: "name" },
      { name: "Sex", fieldname: "sex" },
      { name: "Birthday", fieldname: "birthday" },
      { name: "Address", fieldname: "addr" },
      { name: "Student-ID", fieldname: "stuid" },
    ],
    TableData: [
      {
        name: "Alice",
        sex: "Female",
        birthday: "00.12.14",
        addr: "Hangzhou",
        stuid: "3190101234",
      },
      {
        name: "Bob",
        sex: "Male",
        birthday: "01.1.24",
        addr: "GuangZhou",
        stuid: "3190104588",
      },
      {
        name: "Catherine",
        sex: "Female",
        birthday: "02.04.03",
        addr: "Hangzhou",
        stuid: "3190107848",
      },
      {
        name: "David",
        sex: "Male",
        birthday: "01.11.12",
        addr: "BeiJing",
        stuid: "3190104785",
      },
    ],
    inputValue: {
      name: "Unknown",
      sex: "Unknown",
      birthday: "Unknown",
      addr: "Unknown",
      stuid: "Unknown",
    },
    filterName: "ALL",
    filterSex: "ALL",
    filterBirthday: "ALL",
    filterAddress: "ALL",
    filterStudentID: "ALL",
    Sexset: ["Male", "Female"],
  },
  mutations: {
    //保存所有方法，用来改变state的数据
  },
});

export default store;
