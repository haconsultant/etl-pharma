<template>
    <div id="app">
        <v-app>
            <v-toolbar fixed app>
                <v-btn router to="/Home" icon class="hidden-xs-only">
              <v-icon>home</v-icon>
            </v-btn>
                <v-toolbar-title v-text="title"></v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>
            <v-content>
                <v-container fluid class="flex-fluid">
                    <v-slide-y-transition mode="out-in">
                        <router-view></router-view>
                    </v-slide-y-transition>
                </v-container>
            </v-content>
            <v-footer :fixed="true" app>
                <cron></cron>
                <v-spacer></v-spacer>
                <span class="spacing">&copy; 2018</span>
            </v-footer>
        </v-app>
    </div>
</template>

<script>
import Cron from '@/components/Schedule/Cron'
import { globalConfig } from '@/utils/helpers/procesor'
export default {
  name: 'etl-pharma',
  components: { Cron },
  data: () => ({
    title: 'ETL-Pharma',
    cron: {}
  }),
  created () {
    this.usarData()
    this.checkConfigState()
    this.$bus.on('add-todo', () => {
      this.checkConfigState()
    })
    this.$bus.on('cron-running', () => {
      this.stopCronJob()
    })
  },
  beforeDestroy () {
    this.$bus.off('add-todo')
    this.$bus.off('cron-running')
  },
  methods: {
    usarData () {
      console.log('Hallo!')
      this.$router.push('/Connection/Walkthrough')
    },
    stopCronJob () {
      this.cron.cancel()
    },
    checkConfigState () {
      globalConfig('905cf401-c38f-4f72-8df4-662cb8ff621e').then(() => {
        this.$bus.emit('start-cron')
      })
    }
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');
  /* Global CSS */
  html { overflow-y: auto }
  .flex-fluid {
    display: flex;
    height: 100%;
  }
  .content {
    height: 100vh;
  }
  .spacing {
    padding: 0rem 2rem;
  }
  
</style>
