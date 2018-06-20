<template>
  <span class="time">{{showTime}}</span>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    type: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      timer: null,
      showTime: '',
      update: false
    }
  },
  computed: {
    ...mapGetters({
      data_time: 'clock_time'
    })
  },
  methods: {
    startclock () {
      this.timer = setTimeout(() => {
        this.formateTime(this.data_time)
        if (this.data_time === 0) {
          clearTimeout(this.timer)
          this.$store.dispatch('setTime', {
            time: 0
          })
        } else {
          this.startclock()
        }
        this.$store.dispatch('reduceTime')
      }, 1000)
    },
    formateTime (s) {
      var t
      var hour = Math.floor(s / 3600)
      var min = Math.floor(s / 60) % 60
      var sec = s % 60
      if (hour < 10) {
        t = '0' + hour + ':'
      } else {
        t = hour + ':'
      }
      if (min < 10) {
        t += '0'
      }
      t += min + ':'
      if (sec < 10) {
        t += '0'
      }
      // t += sec.toFixed(2);
      t += sec
      this.showTime = t
    }
  },
  mounted () {
    // this.data_time =this.time;
    this.startclock()
  }
}
</script>
