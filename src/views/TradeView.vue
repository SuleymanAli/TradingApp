<template>
  <div class="container-fluid px-0 trade">
    <div class="inner-layout">
      <div class="sidebar">
        <Symbols />
      </div>
      <div class="chart">
        <Chart />
      </div>
    </div>
  </div>
</template>

<script>
import Chart from '../components/trade/Chart.vue'
import Symbols from '../components/trade/Symbols.vue'
import Stream from "../helpers/stream";

export default {
  components: { Chart, Symbols },
  data: () => ({
    stream: null,
  }),
  mounted() {
    this.stream = new Stream();
    this.stream.subscribe('A.*')
    this.stream.ontrades = this.on_trades
  },
  methods: {
    on_trades(trade) {
      if(trade){
        trade.forEach(item => {
          this.$store.commit('updateGroupedDaily', item)
        })
      }
    }
  },
  beforeDestroy() {
    if (this.stream) this.stream.unsubscribe('A.*')
  }
}
</script>

<style lang="scss" scoped>
.inner-layout {
  color: #fff;
  height: 100vh;
  display: flex;
  overflow: hidden;
  background-color: #212529;

  .sidebar {
    width: 300px;
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;

    &::-webkit-scrollbar {
      width: 5px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
      background: #444444;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: #888;
    }
  }

  .chart {
    overflow: hidden;
    width: calc(100% - 300px);
  }
}
</style>