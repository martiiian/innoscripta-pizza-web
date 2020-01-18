<template>
  <nav class="navigation">
    <ul class="navigation__list">
      <li class="navigation__item">
        biba
      </li>
      <li class="navigation__item">
        fuck
      </li>
    </ul>
  </nav>
</template>

<script>
export default {}
</script>

<style lang="scss">
@import '~assets/styles/variables.scss';

.navigation {
  width: 100%;
  &__list {
    display: flex;
    justify-content: space-around;
    height: 50px;
    align-items: center;
  }
  &__item {
    list-style: none;
    color: $white-color;
  }
}
</style>
