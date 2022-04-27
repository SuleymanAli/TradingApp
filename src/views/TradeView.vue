<template>
  <div class="container-fluid px-0 trade">
    <div class="inner-layout">
      <div class="sidebar">
        <Symbols
            :data="stocks"
            :loading="s_loading"
            @change-symbol="fetchQuotes"
        />
      </div>
      <div class="content-area">
        <Chart />
        <Quotes
            :data="quotes"
            :loading="q_loading"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Chart from '../components/trade/Chart.vue'
import Quotes from '../components/trade/Quotes.vue'
import Symbols from '../components/trade/Symbols.vue'
import Stream from "../helpers/stream";
import moment from "moment";
import {mapGetters} from "vuex";

export default {
  components: { Chart, Symbols, Quotes },
  data: () => ({
    stream: null,
    s_loading: false,
    q_loading: false,
  }),
  computed: {
    ...mapGetters({
      stocks: 'getGroupedDaily',
      quotes: 'getQuotes'
    }),
  },
  async mounted() {
    this.stream = new Stream();
    this.stream.subscribe('A.*')
    this.stream.ontrades = this.on_trades

    await this.fetchQuotes()
    await this.fetchSymbols()
  },
  methods: {
    on_trades(trade) {
      if(trade){
        trade.forEach(item => {
          this.$store.commit('updateGroupedDaily', item)
        })
      }
    },
    async fetchSymbols(){
      // let today = moment().format("YYYY-MM-DD");
      this.s_loading = true
      let yesterday = moment().subtract(1, 'days').format("YYYY-MM-DD")
      try {
        await this.$store.dispatch('fetchGroupedDaily',{date: yesterday}) //'2022-04-14'
        this.s_loading = false
      }
      catch (e){
        this.s_loading = false
      }
    },
    async fetchQuotes(){
      this.q_loading = true
      try {
        await this.$store.dispatch('fetchQuotes', {symbol: this.$route.query.symbol})
        this.q_loading = false
      }
      catch (e){
        this.q_loading = false
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
  display: flex;
  background-color: #212529;

  @media(min-width: 768px){
    height: 100vh;
    overflow: hidden;
  }

  @media(max-width: 767px){
    flex-direction: column-reverse;
  }

  .sidebar {
    height: 35vh;
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;

    @media(min-width: 768px){
      height: auto;
      width: 280px;
    }

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

  .content-area {
    height: 65vh;

    @media(min-width: 768px){
      display: flex;
      height: auto;
      overflow: hidden;
      width: calc(100% - 280px);
    }
  }
}
</style>