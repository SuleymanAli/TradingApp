<template>
  <keep-alive>
    <router-view />
  </keep-alive>
</template>

<script>
import Stream from './helpers/stream'

export default {
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
}
</script>
