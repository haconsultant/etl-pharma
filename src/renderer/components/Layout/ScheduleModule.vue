<template>
    <v-container class="item__container">
        <v-card color="blue-grey lighten-5" class="fixed__card">
            <v-card-title primary-title>
                <div class="headline">Sincronización</div>
            </v-card-title>
            <v-card-actions>
                <v-layout align-center justify-end class="large__title">
                   <v-btn  @click.stop="dialog = true">Configuracion<v-icon right dark>settings</v-icon></v-btn>
                </v-layout>
            </v-card-actions>
        </v-card>
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition" scrollable>
            <v-card tile>
                <v-toolbar card dark color="accent" class="large__title">
                    <v-btn icon class="error" @click.native="dialog = false">
                        <v-icon>close</v-icon>  
                    </v-btn>
                    <v-toolbar-title>Configuracion de Sincronización</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn dark flat @click.native="dialog = false">Guardar</v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-card-text>
                    <v-list three-line subheader class="large__title">
                        <v-layout align-center justify-center>
                            <v-subheader class="headline">Frecuencia de Actualizacion de Inventario</v-subheader>
                        </v-layout>
                        <v-card flat color="transparent" class="step__controls__sm">
                            <v-layout align-center justify-center>
                                <v-subheader class="headline"></v-subheader>
                            </v-layout>
                            <v-card-text>
                                <v-layout row>
                                    <v-flex class="pr-3">
                                        <v-slider label="h:" v-model="timeHours" :max="12" :min="0"></v-slider>
                                    </v-flex>
                                    <v-flex shrink style="width: 60px">
                                        <v-text-field v-model="timeHours" class="mt-0" hide-details single-line type="number"></v-text-field>
                                    </v-flex>
                                </v-layout>
                            </v-card-text>
                            <v-card-text>
                                <v-layout row>
                                    <v-flex class="pr-3">
                                        <v-slider label="m:" v-model="timeMinutes" :max="59" :min="0"></v-slider>
                                    </v-flex>
                                    <v-flex shrink style="width: 60px">
                                        <v-text-field v-model="timeMinutes" class="mt-0" hide-details single-line type="number"></v-text-field>
                                    </v-flex>
                                </v-layout>
                            </v-card-text>
                            <v-card-text>
                                <v-layout align-center justify-center>
                                    <v-subheader class="headline">Su Inventario se sincronizara cada:</v-subheader>
                                </v-layout>
                                <v-layout align-center justify-center>
                                    <p class="display-2">{{timeHours + ' : ' + timeMinutes + ' ' + stateSync}}</p>
                                </v-layout>
                            </v-card-text>
                        </v-card>
                    </v-list>
                </v-card-text>
                <div style="flex: 1 1 auto;"></div>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
export default {
  data () {
    return {
      stateSync: 'm',
      timeHours: '',
      timeMinutes: '',
      dialog: false,
      dataBaseName: [],
      config: {
        userName: 'sa',
        password: '^DpYGW2ukEspaHZ7',
        server: '159.203.86.203',
        options: {
          database: '',
          rowCollectionOnDone: true
        }
      }
    }
  },
  watch: {
    timeHours () {
      if (this.timeHours < 10) {
        this.timeHours = ('0' + this.timeHours).slice(-2)
      }
      if (this.timeHours > 0) {
        this.stateSync = 'h'
      } else {
        this.stateSync = 'm'
      }
    },
    timeMinutes () {
      if (this.timeMinutes < 10) {
        this.timeMinutes = ('0' + this.timeMinutes).slice(-2)
      }
    }
  }
}
</script>

<style>
  .fixed__card {
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    width: 100%;
  }
  .item__container {
     margin: 0px;
    display: flex;
  }
  .config__controls {
      padding: 1rem 9rem;
  }
  .large__title {
      padding: 2rem;
  }
</style>
