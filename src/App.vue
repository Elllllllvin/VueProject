<template>
  <div id="app">
    <BBVoro>自定义组件</BBVoro>
    <router-view />
  </div>
</template>

<script>
import BBVoro from "./components/BasketBallVoronoi.vue";
export default {
  name: "App",
  components: {
    BBVoro
  }
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
</style>
