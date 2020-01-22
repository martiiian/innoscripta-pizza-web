<template>
  <img :src="product.image_name" :alt="product.name" />
</template>

<script>
export default {
  name: 'ProductImage',
  props: {
    product: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
