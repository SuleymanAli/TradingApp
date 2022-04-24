<template>
  <div class="trade__list h-100">
    <div class="trade__list-inner" v-if="stocks && stocks.length > 0">
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
    <div class="empty-area" v-else>
      <EmptyIcon color="#fff" width="60px" height="60px" />
      <p>No data...</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from "moment";
import SymbolItem from "./SymbolItem.vue";
import EmptyIcon from "../../icons/svg/Empty.vue"

export default {
  components: {
    SymbolItem,
    EmptyIcon
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
    let today = moment().format("YYYY-MM-DD");
    this.loading = true
    let yesterday = moment().subtract(1, 'days').format("YYYY-MM-DD")
    try {
      await this.$store.dispatch('fetchGroupedDaily',{date: today}) //'2022-04-14'
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

.empty-area {
  text-align: center;
  padding: 40px 10px 20px;
}

.empty-area p {
  margin: 15px 0 0;
}

@media (min-width: 768px){
  .empty-area {
    padding: 80px 10px 20px;
  }
}
</style>
