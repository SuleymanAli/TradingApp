<template>
  <ul class="list-group">
    <!-- TESLA:TSLA  -->
    <li class="list-group-item" @click="changeSymbolOnChart('TSLA')">TESLA</li>
    <!-- NVIDIA:NVDA  -->
    <li class="list-group-item" @click="changeSymbolOnChart('NVDA')">NVIDIA</li>
    <!-- TWITTER:TWTR  -->
    <li class="list-group-item" @click="changeSymbolOnChart('TWTR')">
      TWITTER
    </li>
    <!-- Facebook:FB  -->
    <li class="list-group-item" @click="changeSymbolOnChart('FB')">Facebook</li>
    <!-- MICROSOFT:MSFT  -->
    <li class="list-group-item" @click="changeSymbolOnChart('MSFT')">
      MICROSOFT
    </li>
    <!-- AMAZON:AMZN  -->
    <li class="list-group-item" @click="changeSymbolOnChart('AMZN')">AMAZON</li>
    <!-- NETFLIX:NFLX  -->
    <li class="list-group-item" @click="changeSymbolOnChart('NFLX')">
      NETFLIX
    </li>
    <!-- PAYPAL:PYPL  -->
    <li class="list-group-item" @click="changeSymbolOnChart('PYPL')">PAYPAL</li>
    <!-- GOOGLE:GOOGL  -->
    <li class="list-group-item" @click="changeSymbolOnChart('GOOG')">
      GOOGLE
    </li>
    <!-- AMD:AMD  -->
    <li class="list-group-item" @click="changeSymbolOnChart('AMD')">AMD</li>
  </ul>
</template>

<script>
export default {
  methods: {
    changeSymbolOnChart(symbol) {
      console.log(symbol)
      this.$store.commit('changeSymbol', symbol)
      this.$store.dispatch('fetchData')
      // window.location.reload()
    },
  },
}
</script>

<style scoped>
.list-group {
  cursor: pointer;
}
</style>
