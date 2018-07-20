<template>
    <p class="hidde">{{sycn}}</p>
</template>

<script>
import { mssqlGetClientInventory } from '@/utils/server/mssql'
import { sycnInventory } from '@/utils/api/inventory'
export default {
  data: () => ({
    sycn: 'Sync Module'
  }),
  created () {
    this.$bus.on('sycn', () => {
      this.start()
    })
  },
  beforeDestroy () {
    this.$bus.off('sycn')
  },
  methods: {
    start () {
      console.log('Star Sync')
      mssqlGetClientInventory(this.$store.state.database.config, this.$store.state.database.type).then(response => {
        this.result = response
        console.log(this.result)
      }).then(() => {
        sycnInventory(this.result).then(response => {
          this.isSync = false
        })
      })
    }
  }
}
</script>

<style>

</style>
