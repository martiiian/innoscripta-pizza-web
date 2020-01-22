<template>
  <li class="ingredient">
    {{ ingredient.name }}
  </li>
</template>

<script>
export default {
  name: 'Ingredient',
  props: {
    ingredient: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="scss">
@import '~assets/styles/variables.scss';

.ingredient {
  list-style: none;
  padding-left: 12px;
  position: relative;
  margin-left: 10px;
  &::before {
    position: absolute;
    top: 6px;
    left: 0;
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: $light-gray-color;
  }
  &:first-child {
    padding-left: 0;
    &::before {
      display: none;
    }
  }
}
</style>
