<template>
  <ul class="list-group">
    <li
      v-for="(ticker, index) in getSnapshots.tickers"
      :key="index"
      class="list-group-item"
      @click="changeSymbolOnChart(ticker.ticker)"
    >
      {{ ticker.ticker }}
      {{ ticker.todaysChangePerc }}
      {{ ticker.todaysChange }}
    </li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['getSnapshots']),
  },
  async mounted() {
    await this.$store.dispatch('fetchTicketAllSnapshot')
    console.log(this.getSnapshots)
  },
  methods: {
    changeSymbolOnChart(symbol) {
      console.log(symbol)
      this.$store.commit('changeTickerName', symbol)
      this.$store.dispatch('fetchTickerRangeData')
    },
  },
}
</script>

<style scoped>
.list-group {
  cursor: pointer;
  width: 50vw;
  height: 50vh;
  overflow-y: scroll;
}
</style>
