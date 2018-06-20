<template>
<transition name="loading">
	<div class="loading_wrap">
		<div class="mask" v-show="visible">
			<van-loading type="spinner" color="black" />
		</div>
	</div>
</transition>
</template>
<script>
export default {
  data () {
    return {
      visible: false
    }
  },
  methods: {}
}
</script>
<style lang="less">
.loading-enter,
.loading-leave-active {
    opacity: 0;
}
// .loadingpotion {}
.loading_wrap {
    transition: opacity 0.2s linear;
    .mask {
        position: fixed;
        z-index: 6000;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        background: rgba(0,0,0,0.3);
        .van-loading {
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
        }
        .van-loading--black .van-loading__spinner--spinner {
            color: #fff;
        }
    }
}
</style>
