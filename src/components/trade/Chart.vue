<template>
  <!-- Real time data example -->
  <trading-vue
      :data="chart_data"
      :width="width"
      :height="height"
      :title-txt="getSymbol"
      :chart-config="{ MIN_ZOOM: 1 }"
      :toolbar="true"
      :overlays="overlays"
      ref="tvjs">
  </trading-vue>
<!--  <trading-vue-->
<!--      :data="chart"-->
<!--      :width="this.width"-->
<!--      :height="this.height"-->
<!--      :title-txt="getTickerName"-->
<!--      :chart-config="{ MIN_ZOOM: 1 }"-->
<!--      ref="tvjs"-->
<!--      :toolbar="true"-->
<!--      :overlays="overlays"-->
<!--      :color-back="colors.colorBack"-->
<!--      :color-grid="colors.colorGrid"-->
<!--      :color-text="colors.colorText"-->
<!--  >-->
<!--  </trading-vue>-->
</template>

<script>
// import TradingVue from '../../TradingVue.vue'
// import Utils from '../../stuff/utils.js'
// import Const from '../../stuff/constants.js'
// import DataCube from '../../helpers/datacube.js'
// import Stream from '../../../test/tests/DataHelper/stream.js'
// import ScriptOverlay from '../../../test/tests/Scripts/EMAx6.vue'
// import BSB from '../../../test/tests/Scripts/BuySellBalance.vue'
// import { mapGetters } from 'vuex'
// import { Overlay } from '../../mixins/overlay'
// import { Tool } from '../../mixins/tool'
//
// // Gettin' data through webpeck proxy
// const PORT = location.port
// const URL = `http://localhost:${PORT}/api/v3/klines?symbol=`
// const WSS = `wss://polyfeed.polygon.io/stocks`

import TradingVue from "../../TradingVue.vue";
import Data from '../../../data/data.json'
import DataCube from '../../helpers/datacube.js'
import moment from "moment";
import { mapGetters } from "vuex";
import ScriptOverlay from '../../../test/tests/Scripts/EMAx6.vue'
import BSB from '../../../test/tests/Scripts/BuySellBalance.vue'


export default {
  components: {
    TradingVue
  },
  data() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      colors: {
        colorBack: '#fff',
        colorGrid: '#eee',
        colorText: '#333',
      },
      overlays: [ScriptOverlay, BSB],
    };
  },
  computed: {
    ...mapGetters({
      chart_data: 'getChartData'
    }),
    getSymbol(){
      return this.$route.query.symbol
    }
  },
  watch: {
    $route(){
      this.$refs.tvjs.resetChart()
      this.fetchChartData()
    }
  },
  async mounted() {
    await this.fetchChartData()
    this.onResize()
    window.addEventListener('resize', this.onResize)
  },
  methods: {
    onResize() {
      this.width = document.querySelector('.chart').clientWidth + 11
      this.height = document.querySelector('.chart').clientHeight
    },
    async fetchChartData(){
      const today = moment().format("YYYY-MM-DD");
      const yesterday = moment().subtract(1, 'days').format("YYYY-MM-DD");

      if(this.$route.query.symbol){
        await this.$store.dispatch('fetchChartData', {
          symbol: this.$route.query.symbol,
          multiplier: '1',
          timespan: 'hour',
          from: '2021-01-01',
          to: today
        })
      }
    },
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  },
  // name: 'DataHelper',
  // icon: '⚡',
  // description: 'Real-time updates. Play with DataCube in the console',
  // props: ['night'],
  // components: {
  //   TradingVue,
  // },
  // data() {
  //   return {
  //     chart: {},
  //     width: window.innerWidth,
  //     height: window.innerHeight,
  //     index_based: false,
  //     overlays: [ScriptOverlay, BSB],
  //   }
  // },
  // computed: {
  //   colors() {
  //     return this.$props.night
  //       ? { colorBack: '#fff', colorGrid: '#eee', colorText: '#333' }
  //       : {}
  //   },
  //   ...mapGetters(['getTickerData', 'getTickerName']),
  //   cbox_width() {
  //     return Math.floor(this.width / 3 - 1)
  //   },
  //   cbox_height() {
  //     return Math.floor(this.height / 4 - 1)
  //   },
  // },
  // watch: {
  //   getTickerData() {
  //     console.log('change')
  //     // this.$refs.tvjs.resetChart()
  //     // this.chart = new DataCube(this.getTickerData)
  //     // window.dc = this.chart
  //     // this.load_chunk
  //     // window.dc = this.chart // Debug
  //     // window.tv = this.$refs.tvjs // Debug
  //     this.load_chunk().then((data) => {
  //       this.chart = new DataCube(
  //         {
  //           ohlcv: data['chart.data'],
  //           onchart: [
  //             {
  //               type: 'EMAx6',
  //               name: 'Multiple EMA',
  //               data: [],
  //             },
  //           ],
  //           // offchart: [
  //           //   {
  //           //     type: 'BuySellBalance',
  //           //     name: 'Buy/Sell Balance, $lookback',
  //           //     data: [],
  //           //     settings: {},
  //           //   },
  //           // ],
  //           // datasets: [
  //           //   {
  //           //     type: 'Trades',
  //           //     id: 'binance-btcusdt',
  //           //     data: [],
  //           //   },
  //           // ],
  //         },
  //         { aggregation: 100 }
  //       )
  //       // Register onrange callback & And a stream of trades
  //       this.chart.onrange(this.load_chunk)
  //       this.$refs.tvjs.resetChart()
  //       // this.stream = new Stream(WSS, 'T.AAPL')
  //       // this.stream.ontrades = this.on_trades
  //       window.dc = this.chart // Debug
  //       window.tv = this.$refs.tvjs // Debug
  //     })
  //   },
  // },
  // async mounted() {
  //   if(this.$route.query.symbol){
  //     await this.$store.dispatch('fetchTickerRangeData', this.$route.query.symbol)
  //   }
  //
  //   window.addEventListener('resize', this.onResize)
  //   this.onResize()
  //
  //   // Load the last data chunk & init DataCube:
  //   let now = Utils.now()
  //   this.load_chunk([now - Const.HOUR4, now]).then((data) => {
  //     this.chart = new DataCube(
  //       {
  //         ohlcv: data['chart.data'],
  //         onchart: [
  //           {
  //             type: 'EMAx6',
  //             name: 'Multiple EMA',
  //             data: [],
  //           },
  //         ],
  //         // offchart: [
  //         //   {
  //         //     type: 'BuySellBalance',
  //         //     name: 'Buy/Sell Balance, $lookback',
  //         //     data: [],
  //         //     settings: {},
  //         //   },
  //         // ],
  //         // datasets: [
  //         //   {
  //         //     type: 'Trades',
  //         //     id: 'binance-btcusdt',
  //         //     data: [],
  //         //   },
  //         // ],
  //       },
  //       { aggregation: 100 }
  //     )
  //     // Register onrange callback & And a stream of trades
  //     this.chart.onrange(this.load_chunk)
  //     this.$refs.tvjs.resetChart()
  //     // this.stream = new Stream(WSS, 'T.AAPL')
  //     // this.stream.ontrades = this.on_trades
  //     window.dc = this.chart // Debug
  //     window.tv = this.$refs.tvjs // Debug
  //   })
  // },
  // methods: {
  //   onResize() {
  //     // this.width = window.innerWidth / 2 - 1
  //     // this.height = window.innerHeight / 2 - 1
  //     this.width = document.querySelector('.chart').clientWidth + 16
  //     this.height = document.querySelector('.chart').clientHeight - 3
  //   },
  //   // New data handler. Should return Promise, or
  //   // use callback: load_chunk(range, tf, callback)
  //   async load_chunk() {
  //     // let [t1, t2] = range
  //     // let x = 'BTCUSDT'
  //     // let q = `${x}&interval=1m&startTime=${t1}&endTime=${t2}`
  //     // let r = await fetch(URL + q).then((r) => r.json())
  //     // console.log(this.format(this.parse_binance(r)))
  //     // console.log(this.format(r))
  //     // console.log(this.format(this.getTickerData))
  //     return this.format(this.getTickerData)
  //   },
  //   // Parse a specific exchange format
  //   parse_binance(data) {
  //     if (!Array.isArray(data)) return []
  //     return data.map((x) => {
  //       for (var i = 0; i < x.length; i++) {
  //         x[i] = parseFloat(x[i])
  //       }
  //       return x.slice(0, 6)
  //     })
  //   },
  //   format(data) {
  //     // Each query sets data to a corresponding overlay
  //     return {
  //       'chart.data': data,
  //       // other onchart/offchart overlays can be added here,
  //       // but we are using Script Engine to calculate some:
  //       // see EMAx6 & BuySellBalance
  //     }
  //   },
  //   on_trades(trade) {
  //     // console.log('trade', trade)
  //     // this.chart.update({
  //     //   t: trade.T, // Exchange time (optional)
  //     //   price: parseFloat(trade.p), // Trade price
  //     //   volume: parseFloat(trade.q), // Trade amount
  //     //   'datasets.binance-btcusdt': [
  //     //     // Update dataset
  //     //     trade.T,
  //     //     trade.m ? 0 : 1, // Sell or Buy
  //     //     parseFloat(trade.q),
  //     //     parseFloat(trade.p),
  //     //   ],
  //     //   // ... other onchart/offchart updates
  //     // })
  //   },
  // },
  // beforeDestroy() {
  //   window.removeEventListener('resize', this.onResize)
  //   if (this.stream) this.stream.off()
  // },
}
</script>

<style scoped>
.trading-vue-js {
  width: 100% !important;
  height: 100% !important;
}
</style>
