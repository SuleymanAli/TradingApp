<template>
  <div>
    <Header />
    <div class="container mt-4">
      <div class="row">
        <div class="col-lg-8">
          <div class="trading-view">
            <HomeChart />
          </div>
        </div>
        <div class="col-lg-4">
          <Symbols />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './components/home/Header.vue'
import HomeChart from './components/home/Chart.vue'
import Symbols from './components/home/Symbols.vue'

export default {
  components: {
    Header,
    HomeChart,
    Symbols,
  },
}
</script>

<style>
.trading-view {
  border: 1px solid #ccc;
}
</style>
