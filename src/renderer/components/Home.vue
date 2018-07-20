<template>
    <v-card class="flex-fluid">
        <v-container class="full-flex">
            <connection></connection>
        </v-container>
        <v-container class="full-flex">
            <schedule></schedule>
        </v-container>
    </v-card>
</template>

<script>
  import Connection from './Layout/Connection'
  import Schedule from './Layout/Schedule'

  export default {
    name: 'welcome',
    components: { Connection, Schedule },
    created () {
      // this.usarData()
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      usarData () {
        this.$router.push('/User/Login')
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
