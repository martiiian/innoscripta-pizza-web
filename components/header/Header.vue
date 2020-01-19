<template>
  <header class="header">
    <div class="header__wrapper container-fluid">
      <div class="header__content">
        <div class="header__logo">
          <img src="~/assets/images/pizza-logo.png" alt="" />
        </div>

        <div class="header__site-name">
          <h1 class="header__title">Crazy <span> &nbsp;&nbsp;Pizza!</span></h1>
        </div>
      </div>
    </div>
    <div class="header__icons">
      <button class="header-icon header-icon_type_cart">
        <img src="~assets/images/icons/cart.svg" alt="cart" />
      </button>

      <button class="header-icon header-icon_type_login">
        <img src="~assets/images/icons/login.svg" alt="login" />
      </button>
    </div>
  </header>
</template>

<script>
export default {}
</script>

<style lang="scss">
@import '~assets/styles/variables.scss';

.header {
  background: url('~assets/images/background.jpg') center no-repeat;
  background-size: cover;
  height: 533px;
  &__site-name {
    user-select: none;
    margin-top: -77px;
    margin-left: 93px;
  }
  &__wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  &__content {
    padding-left: 7%;
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
  &__icons {
    position: absolute;
    width: 50px;
    height: 200px;
    right: 20px;
    top: 20px;
  }
  &__title {
    font-family: 'VampiroOne', Helvetica, Arial, sans-serif;
    line-height: 92px;
    transform: rotate(-13.17deg);
    span {
      font-family: 'VampiroOne', Helvetica, Arial, sans-serif;
      display: block;
    }
    font-size: 96px;
    color: $white-color;
    text-shadow: 0 10px 0 $dark-color-2;
  }
}
.header-icon {
  width: 50px;
  height: 50px;
  background: none;
  border-radius: 16px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    opacity: 0.8;
  }
  &_type {
    &_cart {
      background: $orange-color;
    }
    &_login {
      background: $white-color;
      margin-top: 20px;
    }
  }
}
</style>
