import Vue from "vue";
import App from "./App";
import store from "./store/store.js";

/* eslint-disable no-new */
new Vue({
  el: "#app",
  data() {
    return {
      message: "This is a Test HTml",
    };
  },
  router,
  store,
  components: { "my-app": App },
});
