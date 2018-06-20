<template>
  <ul class="shopList">
    <li v-if="shopArr&&shopArr.length>0" v-for="item in shopArr" :key="item.name">
      <div class="shop_list_left">
        <h6>{{item.name}}</h6>
        <p>{{item.address}}</p>
      </div>
      <a :href="'tel:'+item.phone">
        <div class="shop_list_right"></div>
      </a>
    </li>
  </ul>
</template>
<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {}
  },
  props: {
    showall: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState({
      shopArr: function (state) {
        if (this.showall || state.shoplist.shopArr.length <= 5) {
          return state.shoplist.shopArr
        } else {
          return state.shoplist.shopArr.slice(0, 5)
        }
      }
    })
  },
  mounted () {}
}
</script>
<style lang="less" scoped>
@import '../../assets/less/base.less';

.shopList li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 1.76rem;
    &:not(:last-child) {
        border-bottom: 1px solid #ccc;
    }
}
.shopList .shop_list_left {
    width: 470px;
    overflow: hidden;
    h6 {
        width: 470px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 30px;
        color: @dark;
        margin: 0;
    }
    p {
        width: 470px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 24px;
        color: #909090;
    }
}
.shopList .shop_list_right {
    width: 60px;
    height: 60px;
    .bg-image( '../../assets/images/bargain/phone');
    background-repeat: no-repeat;
    background-size: cover;
}
</style>
