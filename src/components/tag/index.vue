<template>
  <div class="tag">{{word}}</div>
</template>
<script>
export default {
  props: ['word']
}
</script>
<style lang="less">
@import "../../assets/less/base.less";

.tag {
  display: inline-block;
  height: 50px;
  color: #fff;
  font-size: 24px;
  line-height: 50px;
  padding: 0px 22px;
  .bg-image( "../../assets/images/bargain/newperson");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
</style>
