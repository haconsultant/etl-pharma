<template>
    <p class="hidde">Happy to see me? -- this is a Joke // dont you smile me like that I am a bad vue.js arquitecture developer so I will improve, so see yoo next time, or not (Repairing Global Instances of CRON for now is like this XD)</p>
</template>

<script>
export default {
  data: () => ({
    cron: ''
  }),
  created () {
    this.$bus.on('cron', () => {
      this.start()
    })
  },
  beforeDestroy () {
    this.$bus.off('start')
  },
  methods: {
    start () {
      let timer = this.$store.state.schedule.cron
      let job
      job = this.$cron.schedule(timer, () => {
        this.$bus.emit('sycn')
      })
      this.cron = job
      this.cron.start()
    },
    reschedule () {
      this.cron.destroy()
      let timer = this.$store.state.schedule.timer
      console.log(timer)
      // this.cron.reschedule(timer)
      console.log('DRY but dont\' KISS')
    }
  }
}
</script>
<style>
  .hidde {
    display: none;
  }
</style>

