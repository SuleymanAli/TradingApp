import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tickerData: [],
    tickerName: "AAPL",
    multiplier: 1,
    timespan: "hour",
    timeRangeFrom: "",
    timeRangeTo: "",
    snapshotAll: [],
    gainers: [],
    losers: []
  },
  getters: {
    getTickerData(state) {
      return state.tickerData;
    },
    getTickerName(state) {
      return state.tickerName;
    },
    getSnapshots(state) {
      return state.snapshotAll;
    },
    getGainers(state) {
      return state.gainers;
    },
    getLosers(state) {
      return state.losers;
    }
  },
  mutations: {
    setTickerData(state, payload) {
      console.log(payload);
      let rawData = payload.map(obj => {
        return [obj.t, obj.o, obj.h, obj.l, obj.c, obj.v];
      });

      // let injectedData = { ohlcv: rawData };
      state.tickerData = rawData;
    },
    changeTickerName(state, payload) {
      state.tickerName = payload;
    },
    setSnapshots(state, payload) {
      state.snapshotAll = payload;
    },
    setGainers(state, payload) {
      state.gainers = payload;
    },
    setLosers(state, payload) {
      state.losers = payload;
    }
  },
  actions: {
    async fetchTickerRangeData(context, payload) {
      await axios
        .get(
          `https://api.polygon.io/v2/aggs/ticker/${context.state.tickerName}/range/1/hour/2020-06-13/2020-06-17?apiKey=yrCiFAvpCU41Sq6cN0FI2lj0nohWNqJy`
        )
        .then(res => context.commit("setTickerData", res.data.results))
        .catch(e => console.log(e));
    },
    async fetchTicketAllSnapshot(context, payload) {
      await axios
        .get(
          `https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers?tickers=AAPL,PYPL,NVDA,FB,AMZN,TWTR,SHOP,TSLA,AMD,QQQ,GOOGL,SPY,ABNB,&apiKey=yrCiFAvpCU41Sq6cN0FI2lj0nohWNqJy`
        )
        .then(res => context.commit("setSnapshots", res.data))
        .catch(e => console.log(e));
    },
    async fetchGainers(context, payload) {
      await axios
        .get(
          `https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/gainers?apiKey=yrCiFAvpCU41Sq6cN0FI2lj0nohWNqJy`
        )
        .then(res => context.commit("setGainers", res.data))
        .catch(e => console.log(e));
    },
    async fetchLosers(context, payload) {
      await axios
        .get(
          `https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/losers?apiKey=yrCiFAvpCU41Sq6cN0FI2lj0nohWNqJy`
        )
        .then(res => context.commit("setLosers", res.data))
        .catch(e => console.log(e));
    }
  },
  modules: {}
});
