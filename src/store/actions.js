import axios from "axios";
const BASE_URL = 'https://api.polygon.io';
const API_KEY = 'yrCiFAvpCU41Sq6cN0FI2lj0nohWNqJy';

const fetchTickerRangeData = async function(context, payload) {
  await context.commit("changeTickerName", payload);

  await axios
    .get(
      `${BASE_URL}/v2/aggs/ticker/${context.state.tickerName}/range/1/hour/2020-06-13/2020-06-17?apiKey=${API_KEY}`
    )
    .then((res) => context.commit("setTickerData", res.data.results))
    .catch((e) => console.log(e));
}

const fetchTicketAllSnapshot = async function(context, payload) {
  await axios
    .get(
      `${BASE_URL}/v2/snapshot/locale/us/markets/stocks/tickers?apiKey=${API_KEY}`
    )
    .then((res) => context.commit("setSnapshots", res.data))
    .catch((e) => console.log(e));
}

const fetchGainers = async function(context, payload) {
  await axios
    .get(
      `${BASE_URL}/v2/snapshot/locale/us/markets/stocks/gainers?apiKey=${API_KEY}`
    )
    .then((res) => context.commit("setGainers", res.data))
    .catch((e) => console.log(e));
}

const fetchLosers = async function(context, payload) {
  await axios
    .get(
      `${BASE_URL}/v2/snapshot/locale/us/markets/stocks/losers?apiKey=${API_KEY}`
    )
    .then((res) => context.commit("setLosers", res.data))
    .catch((e) => console.log(e));
}

// sarkhan edit
const fetchGroupedDaily = async function({commit}, payload) {
  await axios.get(`${BASE_URL}/v2/aggs/grouped/locale/us/market/stocks/${payload.date}?adjusted=true&apiKey=${API_KEY}`)
    .then((res) => {
      if(res.status === 200){
        commit('setGroupedDaily',res.data)
      }
    })
    .catch((e) => console.log(e));
}

const fetchChartData = async function({commit}, payload){
  await axios.get(`${BASE_URL}/v2/aggs/ticker/${payload.symbol}/range/${payload.multiplier}/${payload.timespan}/${payload.from}/${payload.to}?adjusted=false&sort=asc&limit=50000&apiKey=${API_KEY}`)
    .then((res) => {
      if(res.status === 200){
        commit('setChartDataOHLCV', res.data)
      }
    })
    .catch((e) => console.log(e));
}

const fetchQuotes = async function({commit}, payload){
  await axios.get(`${BASE_URL}/v2/last/nbbo/${payload.symbol}?apiKey=${API_KEY}`)
    .then((res) => {
      if(res.status === 200){
        commit('setQuote', res.data)
      }
    })
    .catch((e) => console.log(e));
}

export default {
  fetchTickerRangeData,
  fetchTicketAllSnapshot,
  fetchGainers,
  fetchLosers,
  fetchGroupedDaily,
  fetchChartData,
  fetchQuotes
}