<template>
  <div>
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
    <TFSelector :charts="charts"></TFSelector>
  </div>
</template>

<script>
import TradingVue from "../../TradingVue.vue";
import TFSelector from "../TFSelector.vue";
import DataCube from '../../helpers/datacube.js'
import moment from "moment";
import { mapGetters } from "vuex";
import Stream from "../../helpers/stream";
import data_tf from '../../../test/data/data_tf.json'

export default {
  components: {
    TradingVue,
    TFSelector
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
      charts: data_tf,
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
    $route(newVal,oldVal){
      this.stream.ws.send(JSON.stringify({action: 'unsubscribe', params: 'A.' + oldVal.query.symbol}))
      this.stream.ws.send(JSON.stringify({action: 'subscribe', params: 'A.' + newVal.query.symbol}))
      this.fetchChartData()
    }
  },
  async mounted() {
    this.onResize()
    window.addEventListener('resize', this.onResize)
    await this.fetchChartData()

    this.stream = new Stream();
    this.stream.subscribe('A.' + this.getSymbol)
    this.stream.ontrades = this.on_trades
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
