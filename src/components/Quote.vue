<template>
  <div class="quote-area" v-if="data">
    <div class="quote-block bid">{{ data.P }}</div>
    <div class="quote-diff">{{ diff }}</div>
    <div class="quote-block ask">{{ data.p }}</div>
  </div>
</template>

<script>
export default {
  name: "Quote",
  props: {
    data: {
      type: Object,
    }
  },
  computed: {
    diff(){
      return (this.data.P - this.data.p).toFixed(2)
    }
  }
}
</script>

<style lang="scss" scoped>
  .quote-area {
    position: absolute;
    top: 60px;
    left: 13px;
    display: flex;
    align-items: center;
    font-size: 13px;
    font-weight: 500;
    z-index: 1;

    @media (min-width: 768px){
      top: 48px;
    }
  }

  .quote-block {
    height: 24px;
    cursor: pointer;
    padding: 1px 2px;
    border: 1px solid;
    border-radius: 6px;
    min-width: 55px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #121826;

    &.bid {
      color: #f23645;
      border-color: #f23645;
    }

    &.ask {
      color: #2962ff;
      border-color: #2962ff;
    }
  }

  .quote-diff {
    color: #dfdfdf;
    font-size: 12px;
    min-width: 45px;
    text-align: center;
  }
</style>