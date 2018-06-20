<template>
  <div class="good_detail">
    <div class="img_wrap">
      <img v-lazy="imagePath" alt="">
    </div>
    <p>{{text}}</p>
  </div>
</template>
<script>
export default {
  name: 'GoodDetail',
  props: {
    text: {
      type: String,
      default: '商家信息'
    },
    imagePath: {
      type: String,
      default: '../assets/img/present@3x.png'
    }
  }
}
</script>
<style lang="less">
@import "../../assets/less/base.less";

.good_detail {
  border-bottom: 1px solid #ddd;
  padding-bottom: 40px;
  margin-bottom: 40px;
  &:not(:last-child) {
    margin-bottom: 0;
  }
  img {
    height: 380px;
    width: 100%;
    margin-bottom: 40px;
  }
  p {
    white-space: pre-wrap;
    font-size: 24px;
    color: #323232;
  }
}
</style>
