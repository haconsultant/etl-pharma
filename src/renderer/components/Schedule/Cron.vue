<template>
    <p class="hidde">Happy to see me? -- this is a Joke // dont you smile me like that I am a bad vue.js arquitecture developer so I will improve, so see yoo next time, or not (Repairing Global Instances of CRON for now is like this XD)</p>
</template>

<script>
export default {
  data: () => ({
    cron: ''
  }),
  created () {
    this.$bus.on('start-cron', () => {
      this.start()
    })
    this.$bus.on('reschedule-cron', () => {
      this.reschedule()
    })
  },
  beforeDestroy () {
    this.$bus.off('start-cron')
    this.$bus.off('reschedule-cron')
  },
  methods: {
    start () {
      let timer = this.$store.state.schedule.timer
      let job
      job = this.$cron.schedule(timer, function () {
        console.log(`CRON Patter ${timer}`)
      })
      this.cron = job
      this.cron.start()
      // console.log(this.$store.state.schedule.timer)
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

