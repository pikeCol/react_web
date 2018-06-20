<template>
  <div class="shopdetail">
    <ShopList :showall="show" />
  </div>
</template>
<script>
import ShopList from '../../components/shop_list'
export default {
  data () {
    return {
      show: true
    }
  },
  components: {
    ShopList
  }
}
</script>
<style lang="less" scoped>
.shopdetail {
  padding: 0 20px;
}
</style>
