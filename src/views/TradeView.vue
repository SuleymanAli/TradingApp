<template>
  <div>
    <div class="container-fluid px-0 trade">
      <div class="row g-0">
        <div class="col-lg-3">
          <!-- <Symbols /> -->
        </div>
        <div class="col-lg-9 bg-dark">
          <!-- <Chart /> -->
        </div>
        <div class="col-lg-12">
          <div class="trade__orderBook">
            <table class="table table-dark mb-0">
              <thead>
                <tr>
                  <th><p class="font-caption">Symbol</p></th>
                  <th><p class="font-caption">Last</p></th>
                  <th><p class="font-caption">Chg</p></th>
                  <th><p class="font-caption">Chg%</p></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>BTC</td>
                  <td>42701</td>
                  <td>-66.45</td>
                  <td>-0.16</td>
                </tr>
                <tr>
                  <td>BTC</td>
                  <td>42701</td>
                  <td>-66.45</td>
                  <td>-0.16</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from '../components/trade/Chart.vue'
import Symbols from '../components/trade/Symbols.vue'

export default {
  components: { Chart, Symbols },
  mounted() {},
  methods: {
    // checkUrlQueryForSymbol() {
    //   if (this.$route.query.symbol.length > 0) {
    //     console.log(this.$route.query.symbol)
    //   }
    // },
  },
}
</script>
