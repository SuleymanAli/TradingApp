<template>
  <div class="trade__list h-100">
    <table class="table table-dark mb-0">
      <thead>
        <tr>
          <th><p class="font-caption">Symbol</p></th>
          <th><p class="font-caption">Last</p></th>
          <th><p class="font-caption">Chg</p></th>
          <th><p class="font-caption">Chg%</p></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(ticker, index) in getSnapshots.tickers"
          :key="index"
          @click="changeSymbolOnChart(ticker.ticker)"
        >
          <td>{{ ticker.ticker }}</td>
          <td>42701</td>
          <td>{{ ticker.todaysChangePerc }}</td>
          <td>{{ ticker.todaysChange }}</td>
        </tr>
        <tr>
          <td>BTC</td>
          <td>42701</td>
          <td>-66.45</td>
          <td>-0.16</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['getSnapshots']),
  },
  async mounted() {
    await this.$store.dispatch('fetchTicketAllSnapshot')
  },
  methods: {
    changeSymbolOnChart(symbol) {
      this.$store.dispatch('fetchTickerRangeData', symbol)
    },
  },
}
</script>

<style scoped>
/* .trade__list {
  background-color: #212529;
} */
.list-group {
  cursor: pointer;
  width: 50vw;
  height: 50vh;
  overflow-y: scroll;
}
</style>
