<template>
  <!-- Top List -->
  <section class="topList py-5 bg-light">
    <div class="container">
      <div class="row">
        <!-- Gainers -->
        <div class="col-lg-6">
          <div class="topList__title">
            Top Gainer Coin
          </div>
          <div class="d-flex flex-wrap">
            <div
              v-for="(ticker, index) in gainers.tickers"
              :key="index"
              class="topList__brand brand d-flex"
            >
              <div class="brand__name">
                {{ ticker.ticker }}
              </div>
              <div class="brand__price">+{{ ticker.todaysChange }}</div>
              <div
                class="brand__priceWithPerc brand__priceWithPerc--green ms-auto"
              >
                +{{ ticker.todaysChangePerc }}%
              </div>
            </div>
          </div>
        </div>
        <!-- Losers -->
        <div class="col-lg-6">
          <div class="topList__title">
            Top Loser Coin
          </div>
          <div class="d-flex flex-wrap">
            <div
              v-for="(ticker, index) in losers.tickers"
              :key="index"
              class="topList__brand brand d-flex"
            >
              <div class="brand__name">
                {{ ticker.ticker }}
              </div>
              <div class="brand__price">{{ ticker.todaysChange }}</div>
              <div
                class="brand__priceWithPerc brand__priceWithPerc--red ms-auto"
              >
                {{ ticker.todaysChangePerc }}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      gainers: 'getGainers',
      losers: 'getLosers',
    }),
  },
  async mounted() {
    await this.$store.dispatch('fetchGainers')
    await this.$store.dispatch('fetchLosers')
  },
}
</script>

<style>
.topList__title {
  margin-bottom: 24px;
}

.brand {
  padding: 6px 8px;
  width: 300px;
}
.brand__name {
  text-decoration: uppercase;
  display: flex;
  width: 95px;
  flex: 95px;
}

.brand__price {
  display: flex;
  width: 85px;
  flex: 85;
}

.brand__priceWithPerc {
  display: flex;
  flex: 52;
  width: 52px;
}
.brand__priceWithPerc--green {
  color: #00aa13;
}

.brand__priceWithPerc--red {
  color: #ce594f;
}
</style>
