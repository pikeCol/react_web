<template>
<div class="form-inline hairline">
	<div class="form-cell"><span>{{label}}</span></div>
	<div class="form-value">
		<input :type="type" @focus="active = true" :disabled="disabled" :readonly="readonly" ref="input" :placeholder="placeholder" @input="handleInput" :value="currentValue">
	</div>
</div>
</template>
<script>
export default {
  data() {
    return {
      active: false,
      currentValue: this.value
    };
  },
  methods: {
    handleInput(evt) {
      this.currentValue = evt.target.value;
    }
  },
  watch: {
    value(val) {
      this.currentValue = val;
    },
    currentValue(val) {
      this.$emit("input", val);
    }
  },
  props: {
    type: {
      type: String,
      default: "text"
    },
    label: String,
    readonly: Boolean,
    value: String,
    state: {
      type: String,
      default: "default"
    },
    placeholder: String,
    value: {}
  }
};
</script>

<style lang="less">
</style>
