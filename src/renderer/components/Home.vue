<template>
    <v-card class="flex-fluid">
        <v-container class="full-flex">
            <connection-module></connection-module>
        </v-container>
        <v-container class="full-flex">
            <schedule-module></schedule-module>
        </v-container>
    </v-card>
</template>

<script>
  import ConnectionModule from './Layout/ConnectionModule'
  import ScheduleModule from './Layout/ScheduleModule'

  export default {
    name: 'welcome',
    components: { ConnectionModule, ScheduleModule },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    }
  }
</script>

<style scoped>
  .full-flex {
    display: flex;
  }
  .flex-fluid
  {
    flex: 1;
    display: flex;
    flex-flow: column;
  }

  .padd
  {
    padding: 1rem;
  }

  .link-btn
  {
    width: 150px;
  }
</style>
