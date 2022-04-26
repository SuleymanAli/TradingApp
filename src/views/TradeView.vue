<template>
  <div class="container-fluid px-0 trade">
    <div class="inner-layout">
      <div class="sidebar">
        <Symbols />
      </div>
      <div class="content-area">
        <Chart />
        <Quotes />
      </div>
    </div>
  </div>
</template>

<script>
import Chart from '../components/trade/Chart.vue'
import Quotes from '../components/trade/Quotes.vue'
import Symbols from '../components/trade/Symbols.vue'
import Stream from "../helpers/stream";

export default {
  components: { Chart, Symbols, Quotes },
  data: () => ({
    stream: null,
  }),
  mounted() {
    this.stream = new Stream();
    this.stream.subscribe('A.*')
    this.stream.ontrades = this.on_trades
  },
  methods: {
    on_trades(trade) {
      if(trade){
        trade.forEach(item => {
          this.$store.commit('updateGroupedDaily', item)
        })
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