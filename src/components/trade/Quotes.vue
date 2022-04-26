<template>
  <div class="quotes">
    <div class="quote-top">
      <div class="quote-title">
        <span>Ask</span>
      </div>
      <div class="quote-items">
        <div class="quote-item" v-for="i in 30">
          <span class="red">444.4</span>
          <span>0.687</span>
        </div>
      </div>
    </div>
    <div class="quote-bottom">
      <div class="quote-title">
        <span>Bid</span>
      </div>
      <div class="quote-items">
        <div class="quote-item" v-for="i in 30">
          <span class="green">444.4</span>
          <span>0.687</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Quotes"
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
</style>