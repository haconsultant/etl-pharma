<template>
    <div id="app">
    <v-system-bar class="system__bar" fixed app window style="-webkit-app-region: drag"> 
      <v-spacer></v-spacer>
      <v-btn flat small class="button__system" @click="minimize()"><v-icon>remove</v-icon></v-btn>
      <v-btn flat small class="button__system" @click="close()"><v-icon>close</v-icon></v-btn>
    </v-system-bar>
        <v-app dark>
            <v-content>
                <v-container fluid class="flex-fluid">
                    <v-slide-y-transition mode="out-in">
                        <router-view></router-view>
                    </v-slide-y-transition>
                </v-container>
            </v-content>
            <v-footer :fixed="true" app class="footer__app">
                <cron></cron>
                <populate></populate>
                <v-spacer></v-spacer>
                <span class="spacing">Newtoms &copy; 2018</span>
            </v-footer>
        </v-app>
    </div>
</template>

<script>
import Cron from '@/components/Schedule/Cron'
import Populate from '@/components/Sync/Populate'
import { globalConfig } from '@/utils/db/helpers/procesor'
const id = '905cf401-c38f-4f72-8df4-662cb8ff621e'
export default {
  name: 'etl-pharma',
  components: { Cron, Populate },
  data: () => ({
    title: 'ETL-Pharma',
    cron: {}
  }),
  created () {
    this.usarData()
    this.$bus.on('add-todo', () => {
      this.checkConfigState()
    })
  },
  beforeDestroy () {
    this.$bus.off('add-todo')
  },
  methods: {
    usarData () {
      this.$store.dispatch('globalId', id).then((response) => {
        console.log(response)
        globalConfig(id).then((response) => {
          this.$router.push('/User/Login')
          console.log(response)
          /* if (response === null) {
            this.$router.push('/User/Login')
          } else {
            this.$router.push('/Home')
          } */
        })
      })
    },
    checkConfigState () {
      globalConfig(id).then(() => {
        this.$bus.emit('start-cron')
      })
    },
    minimize () {
      this.$electron.remote.BrowserWindow.getFocusedWindow().minimize()
    },
    close () {
      this.$electron.remote.BrowserWindow.getFocusedWindow().hide()
    }
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');
  /* Global CSS */
  html { overflow-y: auto }
  #app {
      background-image: url('~@/assets/hcare.png');
      background-repeat: no-repeat;
      background-size: 800px 810px;
  }
  .button__system {
    background: #1F2341!important;
    color: #cdd43d;
    -webkit-app-region: no-drag;
    margin: inherit!important;
    min-width: inherit!important; 
  }
  .content {
    height: 100vh;
  }
  .fix__toolbar {
    transform: translateY(33px)!important;
  }
  .flex-fluid {
    display: flex;
    height: 100%;
    -webkit-app-region: no-drag;
  }
  .footer__app {
    background: rgba(31, 35, 65, 0.43)!important;
    color: #cdd43d!important;
  }
  .spacing {
    padding: 0rem 2rem;
  }
  .system__bar {
    background: #1F2341;
  }
  .system-bar--window .icon {
    margin: inherit!important;
  }
</style>
