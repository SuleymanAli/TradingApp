import Vue from "vue";

const setTickerData = function(state, payload) {
  if(payload && payload.length > 0){
    let rawData = payload.map((obj) => {
      return [obj.t, obj.o, obj.h, obj.l, obj.c, obj.v];
    });

    // let injectedData = { ohlcv: rawData };
    state.tickerData = rawData;
  }
}

const changeTickerName = function(state, payload) {
  state.tickerName = payload;
}

const setSnapshots = function(state, payload) {
  state.snapshotAll = payload;
}

const setGainers = function(state, payload) {
  state.gainers = payload;
}

const setLosers = function(state, payload) {
  state.losers = payload;
}

// sarkhan edit
const setGroupedDaily = function(state, payload) {
  state.groupedDaily = payload;
}

const updateGroupedDaily = function(state, payload){
  if(state.groupedDaily && state.groupedDaily.results){
    let stockIndex = state.groupedDaily.results.findIndex(stock => stock.T === payload.sym);

    if(stockIndex !== -1){
      Vue.set(state.groupedDaily.results[stockIndex],'o',payload.o);
      Vue.set(state.groupedDaily.results[stockIndex],'h',payload.h);
      Vue.set(state.groupedDaily.results[stockIndex],'l',payload.l);
      Vue.set(state.groupedDaily.results[stockIndex],'c',payload.c);
      Vue.set(state.groupedDaily.results[stockIndex],'vw',payload.vw);
      Vue.set(state.groupedDaily.results[stockIndex],'v',payload.v);
    }
  }
}

const setChartDataOHLCV = function(state, payload){
  let data = payload.results;
  if(data && data.length > 0){
    state.chart_OHLCV = data.map((obj) => {
      return [obj.t, obj.o, obj.h, obj.l, obj.c, obj.v];
    });
  }
}

export default {
  setTickerData,
  changeTickerName,
  setSnapshots,
  setGainers,
  setLosers,
  setGroupedDaily,
  updateGroupedDaily,
  setChartDataOHLCV
}