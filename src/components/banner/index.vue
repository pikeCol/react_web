<template>
  <van-swipe :autoplay="3000">
    <van-swipe-item v-for="(image, index) in list" :key="index">
      <img v-lazy="image" />
    </van-swipe-item>
  </van-swipe>
</template>
<script>
export default {
  data () {
    return {
      value2: 0
    }
  },
  props: ['list']
}
</script>
<style lang="less">
.banner img {
  height: 424px;
  width: 750px;
}
</style>
