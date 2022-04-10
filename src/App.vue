<template>
  <!-- <Header /> -->
  <!-- <Symbols /> -->
  <!-- <HomeChart /> -->
  <!-- <RealTimeChart /> -->
  <!-- <TradingVue></TradingVue> -->
  <!-- <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut temporibus
      quae culpa omnis provident voluptatum magnam dolore minus corporis dolorum
      excepturi quam voluptas quasi, cum voluptates aliquid possimus odit
      maiores?
    </div> -->

  <!-- <div class="container mt-4">
      <div class="row">
        <div class="col-lg-8">
          <div class="trading-view">
            <HomeChart />
          </div>
        </div>
        <div class="col-lg-4"></div>
        <div class="col-12">
          <RealTimeChart />
        </div>
      </div>
    </div> -->
  <!-- <Test /> -->

  <div id="app">
    <router-view />
  </div>
</template>

<script>
import Header from './components/home/Header.vue'
import HomeChart from './components/home/Chart.vue'
import Symbols from './components/home/Symbols.vue'
import RealTimeChart from '../test/tests/DataHelper.vue'
import Test from '../test/Test.vue'
import TradingVue from './TradingVue.vue'

export default {
  components: {
    Header,
    HomeChart,
    Symbols,
    RealTimeChart,
    Test,
    TradingVue,
  },
  created() {
    return {
      mal: '',
      chart: '',
    }
  },
  mounted() {
    // function Stream(url, subscribeParams = '', source = 'polygon') {
    //   var ws = new WebSocket(url)
    //   var cb = () => {}
    //   if (subscribeParams) {
    //     ws.onopen = function() {
    //       if (source === 'polygon') {
    //         ws.send(
    //           '{"action":"auth", "params":"yrCiFAvpCU41Sq6cN0FI2lj0nohWNqJy"}'
    //         )
    //       }
    //       if (subscribeParams.length > 0) {
    //         ws.send(`{"action":"subscribe", "params":"${subscribeParams}"}`)
    //       }
    //     }
    //   }
    //   ws.onmessage = function(data) {
    //     try {
    //       data = JSON.parse(data.data)
    //       // console.log(data)
    //       cb(data)
    //     } catch (e) {
    //       console.log(e)
    //     }
    //   }
    //   return {
    //     set ontrades(val) {
    //       cb = val
    //     },
    //     off() {
    //       ws.close(1000)
    //     },
    //   }
    // }
    // Stream('wss://polyfeed.polygon.io/stocks', 'T.LPL,Q.MSFT')
    // let newStream = new Stream(
    // 'wss://stream.binance.com:9443/ws/btcusdt@kline_1m'
    // )
    // newStream.ontrades = this.on_trades
    // const socket = new WebSocket(
    //   `wss://stream.binance.com:9443/ws/btcusdt@kline_1m`
    // )
    // socket.onmessage = (event) => {
    //   let message = JSON.parse(event.data)
    //   // let candleStick = message.k
    //   console.log(message)
    //   // this.chart.update({
    //   //   time: candleStick.t / 1000,
    //   //   open: parseInt(candleStick.o),
    //   //   high: parseInt(candleStick.h),
    //   //   low: parseInt(candleStick.l),
    //   //   close: parseInt(candleStick.c),
    //   // })
    // }
  },
  methods: {
    on_trades(trade) {
      console.log(trade)
      // this.chart.update({
      //   t: trade.T, // Exchange time (optional)
      //   price: parseFloat(trade.p), // Trade price
      //   volume: parseFloat(trade.q), // Trade amount
      //   'datasets.binance-btcusdt': [
      //     // Update dataset
      //     trade.T,
      //     trade.m ? 0 : 1, // Sell or Buy
      //     parseFloat(trade.q),
      //     parseFloat(trade.p),
      //   ],
      //   // ... other onchart/offchart updates
      // })
    },
  },
}
</script>

<style>
/* .trading-view {
  border: 1px solid #ccc;
} */
</style>
