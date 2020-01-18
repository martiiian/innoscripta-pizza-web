<template>
  <header class="header">
    <div class="header__wrapper container">
      <Navigation class="header__nav" />

      <div class="header__content">
        <div class="header__logo">
          <img src="~/assets/images/pizza-logo.png" alt="" />
        </div>

        <div class="header__site-name">
          <h1 class="header__title">
            Crazy Pizza
          </h1>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import Navigation from '@/components/header/Navigation'

export default {
  components: {
    Navigation
  }
}
</script>

<style lang="scss">
@import '~assets/styles/variables.scss';

.header {
  background: url('~assets/images/background.jpg') center no-repeat;
  background-size: cover;
  height: 533px;
  &__wrapper {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  &__content {
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  &__title {
    font-family: 'VampiroOne', Helvetica, Arial, sans-serif;
    font-size: 96px;
    color: $white-color;
    text-shadow: 0 10px 0 $dark-color-2;
  }
}
</style>
