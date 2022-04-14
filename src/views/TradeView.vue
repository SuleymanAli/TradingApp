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
<!--      <div class="row g-0">-->
<!--        <div class="col-lg-3">-->
<!--          <Symbols />-->
<!--        </div>-->
<!--        <div class="col-lg-9 bg-dark">-->
<!--          <Chart />-->
<!--        </div>-->
<!--      </div>-->
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

    // let vm = this;
    // let arr = [
    //   {sym: "MX", v: 76767, vw: 76.76, o: 15.29, c: 15.17, h: 15.5702, l: 15.1, t: 1649880000000, n: 3253},
    //   {sym: "LEV", v: 333, vw: 3301, o: 7.38, c: 7.43, h: 7.56, l: 7.3, t: 1649880000000, n: 4262},
    //   {sym: "AEP", v: 99, vw: 99, o: 102.63, c: 102.25, h: 102.84, l: 101.29, t: 1649880000000,n: 4262},
    //   {sym: "QD", v: 2222, vw: 444.44, o: 1.15, c: 1.18, h: 1.2, l: 1.14, t: 1649880000000, n: 2247}
    // ]
    //
    // setTimeout(() => {
    //   arr.forEach(item => {
    //     setTimeout(() => {
    //       vm.$store.commit('updateGroupedDaily', item)
    //     },2000)
    //   })
    // },10000)
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