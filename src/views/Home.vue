<template>
  <div class="home d-flex flex-column">
    <Header />
    <TopList />

    <section class="list py-5">
      <div class="container">
        <div class="row">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">
                  <p class="font-caption">Name</p>
                </th>
                <th scope="col font-caption">
                  <p class="font-caption">Price</p>
                </th>
                <th scope="col font-caption">
                  <p class="font-caption">24h Change</p>
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(ticker, index) in snapshots.tickers" :key="index">
                <td>{{ ticker.ticker }}</td>
                <td>${{ ticker.day.c }}</td>
                <td>{{ ticker.todaysChangePerc }}%</td>
                <td class="d-flex">
                  <a
                    class="ms-auto"
                    @click.prevent="goToCurrentTicker(ticker.ticker)"
                  >
                    Details
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <Footer class="mt-auto" />
  </div>
</template>

<script>
import Header from '../components/home/Header.vue'
import Footer from '../components/home/Footer.vue'
import TopList from '../components/home/TopList.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    Header,
    Footer,
    TopList,
  },
  computed: {
    ...mapGetters({
      snapshots: 'getSnapshots',
    }),
  },
  async mounted() {
    await this.$store.dispatch('fetchTicketAllSnapshot')
  },
  methods: {
    goToCurrentTicker(symbol) {
      console.log(symbol)
      this.$router.push({ path: '/trade', query: { symbol } })
    },
  },
}
</script>

<style lang="scss">
html {
  overflow-y: auto !important;
  background-color: #212529 !important;
}
.home {
  min-height: 100vh;
}

.list {
  .table > :not(:first-child) {
    border-top: none;
  }

  thead {
    background-color: #fafafa;
    border-radius: 16px;

    thead th {
      border: none;
    }
  }
}
</style>
