<template>
  <label class="input__label">
    {{ label }}

    <input
      :value="value"
      type="text"
      class="input__input"
      :class="{ input__input_errored: errors.length }"
      @input="$emit('input', $event.target.value)"
    />

    <span class="input__error">
      <span v-if="errors && errors[0]">
        {{ error }}
      </span>
    </span>
  </label>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    errors: {
      type: Array,
      default: () => []
    },
    value: {
      type: String,
      default: ''
    }
  },
  computed: {
    error() {
      if (typeof this.errors[0] === 'string') return this.errors[0]

      return this.errors[0].data
        ? this.errors[0].data.text
        : this.errors[0].name
    }
  }
}
</script>

<style lang="scss">
@import '~assets/styles/variables.scss';

.input {
  &__input {
    margin-top: 3px;
    height: 50px;
    border-radius: 10px;
    border: none;
    padding: 5px 10px;
    font-size: 20px;
    color: #6c5f5f;
    &_errored {
      border: 3px solid red;
    }
  }
  &__error {
    color: red;
    height: 17px;
  }
  &__label {
    color: $white-color;
    font-size: 13px;
    display: flex;
    flex-direction: column;
    margin: 5px 0;
  }
}
</style>
