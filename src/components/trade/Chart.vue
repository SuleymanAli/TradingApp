<template>
  <div class="chart-inner">
    <!-- Real time data example -->
    <trading-vue
        :data="chart"
        :width="width"
        :height="height"
        :title-txt="getSymbol"
        :chart-config="{ MIN_ZOOM: 1 }"
        :toolbar="false"
        :index-based="true"
        :overlays="overlays"
        :legend-buttons="['display', 'up', 'down', 'remove']"
        @legend-button-click="legendAction"
        ref="tvjs">
    </trading-vue>
    <TFSelector 
      :timeframes="time_frames" 
      selected="4H"
      v-on:selected="on_selected">
    </TFSelector>
    <div class="loading" v-if="loading">
      <img src="assets/loading.gif" alt="loading">
    </div>
  </div>
</template>

<script>
import TradingVue from "../../TradingVue.vue";
import Overlays from 'tvjs-overlays'
import TFSelector from "../TFSelector.vue";
import DataCube from '../../helpers/datacube.js'
import moment from "moment";
import { mapGetters } from "vuex";
import Stream from "../../helpers/stream";
import LegendController from "../../helpers/legend_controller";

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
      overlays: [Overlays['RSI'], Overlays['Stoch'], Overlays['EMA']],
      time_frames: [
        {tf: 'Y', timespan: 'year', multiplier: '1'},
        {tf: 'M', timespan: 'month', multiplier: '1'},
        {tf: 'W', timespan: 'week', multiplier: '1'},
        {tf: 'D', timespan: 'day', multiplier: '1'},
        {tf: '12H', timespan: 'hour', multiplier: '12'},
        {tf: '8H', timespan: 'hour', multiplier: '8'},
        {tf: '4H', timespan: 'hour', multiplier: '4'},
        {tf: '3H', timespan: 'hour', multiplier: '3'},
        {tf: '2H', timespan: 'hour', multiplier: '2'},
        {tf: '1H', timespan: 'hour', multiplier: '1'},
        {tf: '45M', timespan: 'minute', multiplier: '45'},
        {tf: '30M', timespan: 'minute', multiplier: '30'},
        {tf: '15M', timespan: 'minute', multiplier: '15'},
        {tf: '5M', timespan: 'minute', multiplier: '5'},
        {tf: '3M', timespan: 'minute', multiplier: '3'},
        {tf: '1M', timespan: 'minute', multiplier: '1'},
      ],
      selected_tf: {tf: '4H', timespan: 'hour', multiplier: '4'},
      stream: null,
      loading: false
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
      this.fetchChartData(this.selected_tf)
    }
  },
  mounted() {
    this.onResize()
    window.addEventListener('resize', this.onResize)

    this.stream = new Stream();
    this.stream.subscribe('A.' + this.getSymbol)
    this.stream.ontrades = this.on_trades
  },
  methods: {
    async fetchChartData(tf){
      const today = moment().format("YYYY-MM-DD");
      this.load_chunk(['2021-01-01', today], tf).then(data => {
        this.chart = new DataCube({
          ohlcv: data,
          onchart: [
            {
              name: "EMA, 3",
              type: "EMA",
              data: [],
              settings: {
                  color: "#f7890c",
                  length: 3
              }
            },
            {
              name: "EMA, 8",
              type: "EMA",
              data: [],
              settings: {
                  color: "red",
                  length: 8
              }
            },
            {
              name: "EMA, 20",
              type: "EMA",
              data: [],
              settings: {
                  color: "blue",
                  length: 20
              }
            },
            {
              name: "EMA, 50",
              type: "EMA",
              data: [],
              settings: {
                  color: "yellow",
                  length: 50
              }
            },
            {
              name: "EMA, 100",
              type: "EMA",
              data: [],
              settings: {
                  color: "brown",
                  length: 100
              }
            },
            {
              name: "EMA, 200",
              type: "EMA",
              data: [],
              settings: {
                  color: "green",
                  length: 200
              }
            },
          ],
          offchart: [
            {
              name: "Relative Strength Index",
              type: "RSI",
              data: [],
              settings: {}
            },
            {
              name: "Stochastic",
              type: "Stoch",
              data: [],
              settings: {}
            }
          ],
          datasets: []
        }, { aggregation: 100 })
        // Register onrange callback & And a stream of trades
        // this.chart.onrange(this.load_chunk)
        this.$refs.tvjs.resetChart()

        window.dc = this.chart      // Debug
        window.tv = this.$refs.tvjs // Debug
      })
    },
    async load_chunk(range, tf) {
      this.loading = true;
      let [t1, t2] = range
      try {
        await this.$store.dispatch('fetchChartData', {
          symbol: this.$route.query.symbol,
          multiplier: tf.multiplier,
          timespan: tf.timespan,
          from: t1,
          to: t2
        })
        this.loading = false;
        return this.chart_data
      }
      catch(e){
        this.loading = false;
      }
    },
    onResize() {
      this.width = document.querySelector('.chart-inner').clientWidth
      this.height = document.querySelector('.chart-inner').clientHeight
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
    },
    on_selected(tf) {
      this.selected_tf = tf
      this.fetchChartData(this.selected_tf)
    },
    legendAction(e){
      let legend = new LegendController(this.chart.tv, this.chart)
      legend.onbutton(e)
    },
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

.chart-inner {
  height: inherit;
  position: relative;
}

.loading {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background: rgba(0,0,0,.6);
}

.loading img {
  width: 60px;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translateX(-50%, -50%);
}

@media (min-width: 768px){
  .chart-inner {
    width: calc(100% - 200px);
  }
}
</style>
