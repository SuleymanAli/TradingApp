<template>
  <!-- Real time data example -->
  <trading-vue
      :data="chart"
      :width="width"
      :height="height"
      :title-txt="getSymbol"
      :chart-config="{ MIN_ZOOM: 1 }"
      :toolbar="false"
      :index-based="true"
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
import DataCube from '../../helpers/datacube.js'
import moment from "moment";
import { mapGetters } from "vuex";
import Stream from "../../helpers/stream";

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
      chart: {},
      stream: null,
    };
  },
  computed: {
    ...mapGetters({
      chart_data: 'getChartOHLCV'
    }),
    getSymbol(){
      return this.$route.query.symbol
    }
  },
  watch: {
    $route(){
      this.fetchChartData()
    }
  },
  async mounted() {
    this.onResize()
    window.addEventListener('resize', this.onResize)
    await this.fetchChartData()
  },
  methods: {
    async fetchChartData(){
      const today = moment().format("YYYY-MM-DD");
      this.load_chunk(['2021-01-01', today]).then(data => {
        this.chart = new DataCube({
          ohlcv: data,
          onchart: [],
          offchart: [],
          datasets: []
        }, { aggregation: 100 })
        // Register onrange callback & And a stream of trades
        this.chart.onrange(this.load_chunk)
        this.$refs.tvjs.resetChart()
        this.stream = new Stream();
        this.stream.subscribe('A.' + this.getSymbol)
        this.stream.ontrades = this.on_trades

        window.dc = this.chart      // Debug
        window.tv = this.$refs.tvjs // Debug
      })
    },
    async load_chunk(range) {
      let [t1, t2] = range
      await this.$store.dispatch('fetchChartData', {
        symbol: this.$route.query.symbol,
        multiplier: '4',
        timespan: 'hour',
        from: t1,
        to: t2
      })
      return this.chart_data
    },
    onResize() {
      this.width = document.querySelector('.chart').clientWidth
      this.height = document.querySelector('.chart').clientHeight
    },
    on_trades(trade) {
      if(trade){
        trade.forEach(item => {
          this.chart.update({
            // candle: [item.o, item.h, item.l, item.c, item.v],
            price: item.vw,
            volume: item.v,
          })
        })
      }
    }
  },

  // watch: {
  //   $route(){
  //     this.$refs.tvjs.resetChart()
  //     this.fetchChartData()
  //   }
  // },
  // async mounted() {
  //   await this.fetchChartData()
  //   this.onResize()
  //   window.addEventListener('resize', this.onResize)
  // },
  // methods: {
  //   onResize() {
  //     this.width = document.querySelector('.chart').clientWidth + 11
  //     this.height = document.querySelector('.chart').clientHeight
  //   },
  //   async fetchChartData(){
  //     const today = moment().format("YYYY-MM-DD");
  //     // const yesterday = moment().subtract(1, 'days').format("YYYY-MM-DD");
  //
  //     if(this.$route.query.symbol){
  //       await this.$store.dispatch('fetchChartData', {
  //         symbol: this.$route.query.symbol,
  //         multiplier: '4',
  //         timespan: 'hour',
  //         from: '2021-01-01',
  //         to: today
  //       })
  //     }
  //   },
  // },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  },
}
</script>

<style scoped>
.trading-vue-js {
  width: 100% !important;
  height: 100% !important;
}
</style>
