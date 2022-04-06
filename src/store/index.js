import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: [],
    symbol: "AAPL",
    multiplier: 1,
    timespan: "hour",
    timeRangeFrom: "",
    timeRangeTo: ""
  },
  getters: {
    getAllData(state) {
      return state.data;
    }
  },
  mutations: {
    setData(state, payload) {
      let rawData = payload.map(obj => {
        return [obj.t, obj.o, obj.h, obj.l, obj.c, obj.v];
      });

      let injectedData = { ohlcv: rawData };
      state.data = injectedData;
    },
    changeSymbol(state, payload) {
      state.symbol = payload;
    }
  },
  actions: {
    async fetchData(context, payload) {
      await axios
        .get(
          `https://api.polygon.io/v2/aggs/ticker/${context.state.symbol}/range/1/hour/2020-06-13/2020-06-17?apiKey=dVbLOR_E5VOmZ7R2dyfbToXkqeq8WCDP`
        )
        .then(res => context.commit("setData", res.data.results))
        .catch(e => console.log(e));
    }
  },
  modules: {}
});
