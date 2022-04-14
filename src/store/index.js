import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const BASE_URL = 'https://api.polygon.io/v2';
const API_KEY = 'yrCiFAvpCU41Sq6cN0FI2lj0nohWNqJy';

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
    losers: [],
    groupedDaily: {}
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
    },
    getGroupedDaily(state) {
      return state.groupedDaily;
    },
  },
  mutations: {
    setTickerData(state, payload) {
      if(payload && payload.length > 0){
        let rawData = payload.map((obj) => {
          return [obj.t, obj.o, obj.h, obj.l, obj.c, obj.v];
        });

        // let injectedData = { ohlcv: rawData };
        state.tickerData = rawData;
      }
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
    },
    setGroupedDaily(state, payload) {
      state.groupedDaily = payload;
    },
    updateGroupedDaily(state, payload){
      if(state.groupedDaily && state.groupedDaily.results){
        let stockIndex = state.groupedDaily.results.findIndex(stock => stock.T === payload.sym);

        if(stockIndex !== -1){
          Vue.set(state.groupedDaily.results[stockIndex],'vw',payload.vw);
          Vue.set(state.groupedDaily.results[stockIndex],'v',payload.v);
          Vue.set(state.groupedDaily.results[stockIndex],'o',payload.o);
        }
      }
    }
  },
  actions: {
    async fetchTickerRangeData(context, payload) {
      console.log(payload);
      await context.commit("changeTickerName", payload);

      await axios
        .get(
          `${BASE_URL}/aggs/ticker/${context.state.tickerName}/range/1/hour/2020-06-13/2020-06-17?apiKey=${API_KEY}`
        )
        .then((res) => context.commit("setTickerData", res.data.results))
        .catch((e) => console.log(e));
    },
    async fetchTicketAllSnapshot(context, payload) {
      await axios
        .get(
          `${BASE_URL}/snapshot/locale/us/markets/stocks/tickers?apiKey=${API_KEY}`
        )
        .then((res) => context.commit("setSnapshots", res.data))
        .catch((e) => console.log(e));
    },
    async fetchGainers(context, payload) {
      await axios
        .get(
          `${BASE_URL}/snapshot/locale/us/markets/stocks/gainers?apiKey=${API_KEY}`
        )
        .then((res) => context.commit("setGainers", res.data))
        .catch((e) => console.log(e));
    },
    async fetchLosers(context, payload) {
      await axios
        .get(
          `${BASE_URL}/snapshot/locale/us/markets/stocks/losers?apiKey=${API_KEY}`
        )
        .then((res) => context.commit("setLosers", res.data))
        .catch((e) => console.log(e));
    },
    async fetchGroupedDaily({commit}, payload) {
      await axios.get(`${BASE_URL}/aggs/grouped/locale/us/market/stocks/${payload.date}?adjusted=true&apiKey=${API_KEY}`)
        .then((res) => {
          if(res.status === 200){
            commit('setGroupedDaily',res.data)
          }
        })
        .catch((e) => console.log(e));
    },
  },
  modules: {},
});
