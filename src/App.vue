<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import flexible from './utils/flexible'
export default {
  name: 'App',
  beforeCreate () {
    flexible.autoPixelRatio()
    flexible.autoChangeRootFontSize()
  }
}
</script>
