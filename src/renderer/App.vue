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
                <v-spacer></v-spacer>
                <span>&copy; 2018</span>
            </v-footer>
        </v-app>
    </div>
</template>

<script>
import {CronJob} from 'cron'
export default {
  name: 'etl-pharma',
  data: () => ({
    title: 'ETL-Pharma'
  }),
  created () {
    this.startCronJobs()
  },
  methods: {
    startCronJobs () {
      var cr = new CronJob('*/5 * * * * *', function () {
        console.log('You will see this message every second')
      }, null, true, 'America/Los_Angeles')
      cr.start()
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
  
</style>
