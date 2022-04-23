<template>
  <div class="trade__list h-100">
    <table class="table table-dark mb-0">
      <thead>
      <tr>
        <th><p class="font-caption">Symbol</p></th>
        <th><p class="font-caption">Price</p></th>
        <th><p class="font-caption">Net Change</p></th>
      </tr>
      </thead>
      <tbody>
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
    ...mapGetters({
      stocks: 'getGroupedDaily'
    }),
  },
  async mounted() {
    // let today = moment().format("YYYY-MM-DD");
    this.loading = true
    let yesterday = moment().subtract(1, 'days').format("YYYY-MM-DD")
    try {
      await this.$store.dispatch('fetchGroupedDaily',{date: '2022-04-14'})
      this.loading = false
    }
    catch (e){
      this.loading = false
    }
  },
  methods: {
    changeSymbolOnChart(symbol) {
      this.$router.push({path: '/trade', query: {symbol}})
    },
  },
}
</script>

<style scoped>
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
  width: 60px;
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translateX(-50%);
}
</style>
