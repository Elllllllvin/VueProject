// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});

// <template>
//   <div>
//     <h1>展示某一时刻球场上各球员所控制的空间</h1>
//   </div>
// </template>

// <script>
// import d3 from 'd3';

// export default {
//   name: "BasketBallVoronoi"
// };
// </script>

// <style></style>
