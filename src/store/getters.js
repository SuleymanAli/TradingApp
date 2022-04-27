const getTickerData = function(state) {
  return state.tickerData;
}

const getTickerName = function(state) {
  return state.tickerName;
}

const getSnapshots = function(state) {
  return state.snapshotAll;
}

const getGainers = function(state) {
  return state.gainers;
}

const getLosers = function(state) {
  return state.losers;
}

// sarkhan edit
const getGroupedDaily = function(state) {
  return state.groupedDaily;
}

const getChartData = function(state) {
  return state.chart_data;
}

const getChartOHLCV = function(state) {
  return state.chart_OHLCV;
}

const getQuotes = function(state) {
  return state.quotes;
}

export default {
  getTickerData,
  getTickerName,
  getSnapshots,
  getGainers,
  getLosers,
  getGroupedDaily,
  getChartData,
  getChartOHLCV,
  getQuotes
}