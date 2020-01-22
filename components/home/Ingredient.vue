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
