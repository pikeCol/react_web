<template>
  <div class="app">
    <van-list  v-model="loading" :finished="finished" @load="onLoad"> 
      <van-cell v-for="item in userList" :key="item.id" :title="item.name + '    '+item.phone" />
    </van-list>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
  data () {
    return {
      list: [],
      loading: false,
      finished: false
    }
  },
  mounted () {
    this.getUserList()
  },
  computed: {
    ...mapState({
      userList: state => state.userList
    })
  },
  methods: {
    ...mapActions(['getUserList', 'addUser']),
    async getList () {
      let res = await this.$Http.demo.test()
      console.log(res)
    },
    onLoad () {
      let time = 0
      let t = setInterval(() => {
        time += 1
        let data = {
          name: `治刚${time}`,
          phone: `1316111492${time}`
        }
        let arr = this.userList
        arr.push(data)
        this.addUser(arr)
      }, 1000)
      if (time > 8) {
        clearInterval(t)
        this.finished = true
        this.loading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../../assets/less/demo/demo';
</style>
