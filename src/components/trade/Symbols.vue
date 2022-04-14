<template>
  <div class="trade__list h-100">
    <table class="table table-dark mb-0">
      <thead>
      <tr>
        <th><p class="font-caption">Symbol</p></th>
        <th><p class="font-caption">VW</p></th>
        <th><p class="font-caption">Vol</p></th>
      </tr>
      </thead>
      <tbody>
<!--      <tr-->
<!--          v-for="(stock, index) in stocks.results"-->
<!--          :key="index"-->
<!--          @click="changeSymbolOnChart(stock.T)"-->
<!--          style="cursor:pointer;"-->
<!--      >-->
<!--        <td>{{ stock.T }}</td>-->
<!--        <td>{{ stock.vw }}</td>-->
<!--        <td>{{ stock.v }}</td>-->
<!--      </tr>-->
      <SymbolItem
          v-for="(stock, index) in stocks.results"
          :key="index"
          :stock="stock"
          @change="changeSymbolOnChart(stock.T)"
      />
      </tbody>
    </table>
    <div class="loading" v-if="loading">
      <img src="assets/loading.gif" alt="loading">
    </div>
<!--    <table class="table table-dark mb-0">-->
<!--      <thead>-->
<!--        <tr>-->
<!--          <th><p class="font-caption">Symbol</p></th>-->
<!--          <th><p class="font-caption">Last</p></th>-->
<!--          <th><p class="font-caption">Chg</p></th>-->
<!--          <th><p class="font-caption">Chg%</p></th>-->
<!--        </tr>-->
<!--      </thead>-->
<!--      <tbody>-->
<!--        <tr-->
<!--          v-for="(ticker, index) in getSnapshots.tickers"-->
<!--          :key="index"-->
<!--          @click="changeSymbolOnChart(ticker.ticker)"-->
<!--        >-->
<!--          <td>{{ ticker.ticker }}</td>-->
<!--          <td>42701</td>-->
<!--          <td>{{ ticker.todaysChangePerc }}</td>-->
<!--          <td>{{ ticker.todaysChange }}</td>-->
<!--        </tr>-->
<!--      </tbody>-->
<!--    </table>-->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from "moment";
import SymbolItem from "./SymbolItem.vue";

export default {
  components: {
    SymbolItem
  },
  data(){
    return {
      loading: false
    }
  },
  computed: {
    // ...mapGetters(['getSnapshots']),
    ...mapGetters({
      stocks: 'getGroupedDaily'
    }),
  },
  async mounted() {
    // let today = moment().format("YYYY-MM-DD");
    this.loading = true
    let yesterday = moment().subtract(1, 'days').format("YYYY-MM-DD")
    try {
      await this.$store.dispatch('fetchGroupedDaily',{date: yesterday})
      this.loading = false
    }
    catch (e){
      this.loading = false
    }

    // await this.$store.dispatch('fetchTicketAllSnapshot')
  },
  methods: {
    changeSymbolOnChart(symbol) {
      this.$store.dispatch('fetchTickerRangeData', symbol)
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

.table thead th {
  position: sticky;
  top: 0;
}

.loading {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.6);
}

.loading img {
  width: 80px;
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translateX(-50%);
}
</style>
