<template>
  <div class="size-selector">
    <button
      v-for="sizeItem in sizes"
      :key="sizeItem.id"
      :class="{ 'size-selector__item_active': activeId === sizeItem.id }"
      class="size-selector__item"
      @click="setSizeActive(sizeItem.id)"
    >
      {{ sizeItem.name }} <span>cm.</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'SizeSelector',
  props: {
    sizes: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      activeId: null
    }
  },
  computed: {
    defaultSizeId() {
      return this.sizes[0] && this.sizes[0].id
    }
  },
  created() {
    this.setSizeActive(this.defaultSizeId)
  },
  methods: {
    setSizeActive(id) {
      this.activeId = id
      this.$emit('size-updated', id)
    }
  }
}
</script>
