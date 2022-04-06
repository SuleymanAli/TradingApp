<template>
  <trading-vue
    ref="tradingVue"
    :data="chart"
    :toolbar="true"
    :chart-config="{ TB_ICON_BRI: 1.25 }"
    :width="width"
    :height="height"
    :color-back="colors.colorBack"
    :color-grid="colors.colorGrid"
    :color-text="colors.colorText"
  />
</template>

<script>
import TradingVue from '../../TradingVue.vue'
import DataCube from '../../helpers/datacube.js'
// import Data from '../data/data.json'
import { mapGetters } from 'vuex'

export default {
  name: 'app',
  components: {
    TradingVue,
  },
  data() {
    return {
      chart: {},
      width: 850,
      height: 621,
      colors: {
        colorBack: '#fff',
        colorGrid: '#eee',
        colorText: '#333',
      },
    }
  },
  computed: {
    ...mapGetters(['getAllData']),
  },
  watch: {
    getAllData() {
      this.$refs.tradingVue.resetChart()
      this.chart = new DataCube(this.getAllData)
      window.dc = this.chart
    },
  },
  async mounted() {
    await this.$store.dispatch('fetchData')
    this.chart = new DataCube(this.getAllData)
    window.addEventListener('resize', this.onResize)
    window.dc = this.chart
    window.tv = this.$refs.tradingVue
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    onResize() {
      this.width = window.innerWidth
      this.height = window.innerHeight
    },
  },
}
</script>
