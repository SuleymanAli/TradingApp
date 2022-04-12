<template>
  <keep-alive>
    <router-view />
    <!-- <div>
    <button class="blue" @click="uns">Uns</button>
    <button class="blue" @click="sbs">sub</button>
  </div> -->
  </keep-alive>
</template>

<script>
import Stream from './helpers/stream'

export default {
  data: () => ({
    stream: null,
  }),
  mounted() {
    this.stream = new Stream()
    this.stream.subscribe('Q.*')

    console.log(this.stream)
  },
  methods: {
    uns() {
      console.log(this.stream)
      this.stream.unsubscribe('Q.*')
    },
    sbs() {
      // console.log(this.stream)
      this.stream.subscribe('AAPL.*')
    },
  },
}
</script>
