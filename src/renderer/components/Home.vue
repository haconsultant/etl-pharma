<template>
    <v-card class="flex-fluid" id="home__box">
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
      }
    }
  }
</script>

<style scoped>
  #home__box {
    background: rgba(1, 153, 148, 0.88);
  }
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
