<template>
  <div>
    <!-- Header -->
    <header class="header container-fluid">
      <div class="row">
        <div class="col-lg-3 d-flex">
          <div class="header__logo my-auto">
            <a href="">
              Logo
            </a>
          </div>
        </div>
        <div class="col-6 d-flex">
          <div class="header__nav my-auto">
            <nav class="list-unstyled d-flex">
              <li class="px-3"><a href="">1Item</a></li>
              <li class="px-3"><a href="">2Item</a></li>
              <li class="px-3"><a href="">3Item</a></li>
              <li class="px-3"><a href="">4Item</a></li>
            </nav>
          </div>
        </div>
        <div class="col-3">
          <div class="header__auth">
            <div>
              <button class="blue">Log In</button>
              <button class="blue">Register</button>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Top List -->
    <section class="topList py-5 bg-light">
      <div class="container">
        <div class="row">
          <div class="col-lg-6">
            <!-- <div class="badge">doge</div> -->
            <div class="topList__title">
              Top Gainer Coin
            </div>
            <div class="topList__brand brand d-flex">
              <div class="brand__name">
                AAPL
              </div>
              <div class="brand__price">
                2.0945
              </div>
              <div class="brand__priceWithPerc ms-auto">
                -0.60%
              </div>
            </div>
            <div class="topList__brand brand d-flex">
              <div class="brand__name">
                AAPL
              </div>
              <div class="brand__price">
                2.0945
              </div>
              <div
                class="brand__priceWithPerc brand__priceWithPerc--red ms-auto"
              >
                -0.60%
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="topList__title">
              Top Loser Coin
            </div>
            <div class="topList__brand brand d-flex">
              <div class="brand__name">
                AAPL
              </div>
              <div class="brand__price">
                2.0945
              </div>
              <div
                class="brand__priceWithPerc brand__priceWithPerc--green ms-auto"
              >
                -0.60%
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

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
              <tr>
                <td>BTC</td>
                <td>$42,506.43000</td>
                <td>-0.28%</td>
                <td class="d-flex">
                  <router-link to="/trade" class="ms-auto">Details</router-link>
                </td>
              </tr>
              <tr>
                <td>EYH</td>
                <td>$3,241.61000</td>
                <td>+0.60%</td>
                <td class="d-flex">
                  <router-link to="/trade" class="ms-auto">Details</router-link>
                </td>
              </tr>
              <tr></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <footer class="footer">
      <div class="container">
        <div class="row">
          <div class="col-12 py-5">
            <p class="text-center">
              Trade © 2022
            </p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script></script>

<style scoped>
.header {
  height: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.header__logo a {
  display: block;
  font-size: 18px;
}

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

.footer > div {
  border-top: 1px solid #eeeeee;
}
</style>
