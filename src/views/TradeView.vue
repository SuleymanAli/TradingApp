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

export default {
  components: { Chart, Symbols },
  mounted() {},
  methods: {
    // checkUrlQueryForSymbol() {
    //   if (this.$route.query.symbol.length > 0) {
    //     console.log(this.$route.query.symbol)
    //   }
    // },
  },
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