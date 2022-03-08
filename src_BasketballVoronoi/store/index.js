import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    Instant_players_info: {
      defensive_players: {
        "120015": [3.4, 5.2],
        "120016": [4.4, 7.2],
        "120017": [5.8, 5.4],
        "120018": [6.6, 9.2],
        "120019": [2.8, 3.1]
      },
      offensive_players: {
        "120025": [5.4, 5.8],
        "120026": [6.1, 7.9],
        "120027": [8.8, 4.4],
        "120028": [9.6, 10.2]
      },
      cutter: { "120029": [7.4, 4.2] },
      offensive_contribution: 0.54,
      basketball: [5.7, 6.3]
    }
  }
});

export default store;
