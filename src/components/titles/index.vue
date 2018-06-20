<template>
  <div class="titles" :style="styleH">
    {{word}}
  </div>
</template>
<script>
export default {
  props: {
    word: {
      type: String,
      default: ''
    },
    height: {
      type: Number,
      default: 1.17
    }
  },
  computed: {
    styleH () {
      return this.height ? {
        height: this.height + 'rem',
        lineHeight: this.height + 'rem'
      } : {
        height: '1.17rem',
        lineHeight: '1.17rem'
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import "../../assets/less/base.less";

.titles {
  text-align: center;
  font-size: 28px;
  color: #909090;
  &:after,
  &:before {
    width: 60px;
    content: "_______________";
    display: inline-block;
    overflow: hidden;
    color: #909090;
    vertical-align: sub;
    line-height: 2.2;
  }
}
</style>
