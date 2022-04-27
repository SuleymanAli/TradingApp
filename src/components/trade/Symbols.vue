<template>
  <div class="trade__list h-100">
    <div class="trade__list-inner">
      <table class="table table-dark mb-0">
        <thead>
        <tr>
          <th><p class="font-caption">Symbol</p></th>
          <th><p class="font-caption">Price</p></th>
          <th><p class="font-caption">Net Change</p></th>
        </tr>
        </thead>
        <tbody>
        <tr class="search-tr">
          <td colspan="3">
            <div class="search-area">
              <input
                  type="text"
                  placeholder="Search symbol"
                  v-model="search_sym"
              >
            </div>
          </td>
        </tr>
        <SymbolItem
            v-for="(stock, index) in symbolList"
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
<!--    <div class="empty-area" v-else>-->
<!--      <EmptyIcon color="#fff" width="60px" height="60px" />-->
<!--      <p>No data...</p>-->
<!--    </div>-->
  </div>
</template>

<script>
import SymbolItem from "./SymbolItem.vue";
// import EmptyIcon from "../../icons/svg/Empty.vue"

export default {
  components: {
    SymbolItem,
    // EmptyIcon
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      search_sym: ''
    }
  },
  computed: {
    symbolList(){
      if(this.data && this.data.results && this.data.results.length > 0){
        return this.data.results.filter(post => {
          return post.T.toLowerCase().includes(this.search_sym.toLowerCase())
        })
      }
    }
  },
  methods: {
    changeSymbolOnChart(symbol) {
      this.$router.push({path: '/trade', query: {symbol}})
      this.$emit('change-symbol', symbol)
    }
  },
}
</script>

<style scoped>
.table thead th,
.search-tr {
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

.search-area input {
  padding: 2px 5px;
  width: 100%;
  outline: none;
  color: #ddd;
  background: #2b2f34;
  border-color: #41474e;
}
</style>
