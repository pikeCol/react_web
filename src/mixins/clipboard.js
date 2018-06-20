export const clipboard = {
  methods: {
    handleCopy (copyVaule) {
      // 创建'虚拟'DOM
      const input = document.createElement('input')
      document.body.appendChild(input)
      input.setAttribute('value', copyVaule)
      input.select()
      if (document.execCommand('copy')) {
        document.execCommand('copy')
        this.$toast('复制成功')
        // console.log('seuuce')
      }
      // 删除'虚拟'DOM
      // console.log('fail')
      document.body.removeChild(input)
    }
  }
}
