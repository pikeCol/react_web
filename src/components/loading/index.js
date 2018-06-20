// import Loading from "./Loading.vue";
import Vue from 'vue'
let LoadingComponent = Vue.extend(require('./Loading.vue'))
let instance
export default {
  open () {
    if (!instance) {
      console.log(LoadingComponent)
      instance = new LoadingComponent({el: document.createElement('div')})
    }
    if (instance.visible) return
    document.body.appendChild(instance.$el)
    instance.visible = true
  },
  close () {
    if (instance) {
      instance.visible = false
    }
  }
}
