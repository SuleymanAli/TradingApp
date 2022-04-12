<template>
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
            <li class="px-3"><a href="">Trade</a></li>
            <li class="px-3"><a href="">Exchanges</a></li>
            <li class="px-3"><a href="">Holidays</a></li>
            <li class="px-3"><a href="">News</a></li>
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
</template>

<style>
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
</style>
