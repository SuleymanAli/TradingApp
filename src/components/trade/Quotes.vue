<template>
  <div class="quotes">
    <div class="quote-top">
      <div class="quote-title">
        <span>Ask</span>
      </div>
      <div class="quote-items">
        <div
            class="quote-item"
            v-for="(quote, index) in data.results"
            :key="index"
        >
          <span class="red">{{ quote.ask_price }}</span>
          <span>{{ quote.ask_size }}</span>
        </div>
      </div>
      <div class="loading" v-if="loading">
        <img src="assets/loading.gif" alt="loading">
      </div>
    </div>
    <div class="quote-bottom">
      <div class="quote-title">
        <span>Bid</span>
      </div>
      <div class="quote-items">
        <div
            class="quote-item"
            v-for="(quote, index) in data.results"
            :key="index"
        >
          <span class="green">{{ quote.bid_price }}</span>
          <span>{{ quote.bid_size }}</span>
        </div>
      </div>
      <div class="loading" v-if="loading">
        <img src="assets/loading.gif" alt="loading">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Quotes",
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
  }
}
</script>

<style lang="scss" scoped>
  .quotes {
    display: flex;
    font-size: 14px;
    background: #1a1d20;

    @media (min-width: 768px) {
      display: block;
      width: 200px;
    }
    @media (max-width: 767px) {
      margin-top: 35vh;
    }
  }

  .quote-top,
  .quote-bottom {
    width: 50%;
    height: 35vh;
    overflow: hidden;
    position: relative;

    @media (min-width: 768px) {
      width: auto;
      height: 50vh;
    }
  }

  .quote-title {
    padding: 5px 10px;
    background: #181b1e;
    border-bottom: 1px solid #383838;
  }

  .quote-items {
    height: 100%;
    overflow: auto;

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

    .quote-item {
      font-size: 12px;
      padding: 2px 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }

  .green {
    color: #63df89;
  }

  .red {
    color: #ec4662;
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
    width: 30px;
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
  }
</style>