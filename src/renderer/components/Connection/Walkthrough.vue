<template>
    <v-stepper v-model="step" class="box__fixed">
        <v-stepper-header>
            <v-stepper-step :complete="step > 1" step="1">Name of step 1</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="step > 2" step="2">Name of step 2</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="step > 3" step="3">Name of step 3</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="4">Name of step 3</v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
            <v-stepper-content step="1" class="step__container">
                <div class="stepper__body">
                    <v-card class="mb-5 step__content">
                        <v-layout align-center justify-center>
                            <v-subheader class="headline">Servidor de Base de Datos</v-subheader>
                        </v-layout>
                        <v-form class="step__controls">
                            <v-text-field v-model="config.server" label="Direcion del Servidor" outline required></v-text-field>
                            <v-text-field v-model="config.userName" label="Usuario" outline required></v-text-field>
                            <v-text-field v-model="config.password" label="Contraseña" outline required></v-text-field>
                            <v-layout align-center justify-center>
                                <v-btn large @click="serverConnection">Conectarse</v-btn>
                            </v-layout>
                        </v-form>
                    </v-card>
                </div>
                <div class="stepper__footer">
                    <v-btn large color="primary" @click="nextStep()">
                        Continue
                    </v-btn>
                    <v-btn large flat>Cancel</v-btn>
                </div>
            </v-stepper-content>
            <v-stepper-content step="2" class="step__container">
                <div class="stepper__body">
                    <v-card class="mb-5 step__content">
                        <v-layout align-center justify-center>
                            <v-subheader class="headline">Conexion con Base de Datos</v-subheader>
                        </v-layout>
                        <v-form class="step__controls">
                            <v-select outline v-model="config.options.database" :items="dataBaseName" label="Bases de Datos"></v-select>
                            <v-layout align-center justify-center>
                                <v-btn large @click="connectDatabase">Conectarse</v-btn>
                            </v-layout>
                        </v-form>
                    </v-card>
                </div>
                <div class="stepper__footer">
                    <v-btn large color="primary" @click="nextStep()">
                        Continue
                    </v-btn>
                    <v-btn large flat @click="lastStep()">Cancel</v-btn>
                </div>
            </v-stepper-content>
            <v-stepper-content step="3" class="step__container">
                <div class="stepper__body">
                    <v-card class="mb-5 step__content">
                        <v-card flat color="transparent" class="step__controls__sm">
                            <v-layout align-center justify-center>
                                <v-subheader class="headline">Frecuencia de Actualizacion de Inventario</v-subheader>
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
                                        <v-slider label="m:" v-model="timeMinutes" :max="59" :min="5"></v-slider>
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
                    </v-card>
                </div>
                <div class="stepper__footer">
                    <v-btn large color="primary" @click="nextStep()">
                        Continue
                    </v-btn>
                    <v-btn large flat @click="lastStep()">Cancel</v-btn>
                </div>
            </v-stepper-content>
        </v-stepper-items>
        <v-stepper-content step="4" class="step__container">
            <v-card class="mb-5 step__content">
                <v-layout align-center justify-center>
                    <v-subheader class="headline">Configurarcion Realizada</v-subheader>
                </v-layout>
                <v-layout align-center justify-center class="space__title">
                    <v-subheader class="display-1">¿Desea Sincronizar con la nube en este momento?</v-subheader>
                </v-layout>
                <v-layout align-center justify-center>
                  <v-btn large :loading="isSync" color="blue lighten-3" class="white--text" @click="startSync()">Sincronizar</v-btn>
                </v-layout>
            </v-card>
            <div class="stepper__footer">
                <v-layout align-center justify-end>
                    <v-btn router to="/Home" large color="primary" @click="finishWalkthrough()">
                        Finalizar
                    </v-btn>
                    <v-btn large color="primary" @click="reset()">
                        Reset
                    </v-btn>
                </v-layout>
            </div>
        </v-stepper-content>
    </v-stepper>
</template>
<script>
import { mssqlServerConnection, mssqlConectDataBase } from '@/utils/server/mssql'
import { saveDatabaseConfig, resetDatabase } from '@/utils/db/localdb'
export default {
  data: () => ({
    configInfo: {},
    isSync: false,
    stateSync: 'm',
    step: 0,
    result: [],
    timeHours: '',
    timeMinutes: '',
    databaseType: '',
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
  }),
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
    },
    step () {
      if (this.step === 4) {
        // this.saveConnectionConfig()
      }
    }
  },
  mouted () {
    this.leadingZero()
  },
  methods: {
    serverConnection () {
      this.connectSuccessful = true
      this.dataBaseQuantity = []
      mssqlServerConnection(this.config).then(response => {
        response.forEach(tuple => {
          this.dataBaseName.push({text: tuple.DATABASE_NAME, value: tuple.DATABASE_NAME})
        })
      }).then(() => {
        this.nextStep()
        this.configInfo.dataBaseName = this.dataBaseName
        this.$store.dispatch('avialableDatabases', this.dataBaseName)
      })
    },
    connectDatabase () {
      mssqlConectDataBase(this.config).then(response => {
        if (response.valid) {
          this.databaseType = response.schema
          this.nextStep()
        } else {
          console.log(this.config)
        }
        this.isLoading = false
      })
    },
    startSync () {
      this.isSync = true
      this.$bus.emit('sycn')
    },
    finishWalkthrough () {
      this.configInfo.config = this.config
      this.configInfo.cron = { hours: this.timeHours, minutes: this.timeMinutes }
      this.configInfo.dataBaseType = this.databaseType
      this.configInfo.pharmacyInfo = this.$store.state.user.pharmacy
      saveDatabaseConfig(this.$store.state.global.id, this.configInfo).then(() => {
        this.$bus.emit('cron')
      })
    },
    reset () {
      resetDatabase()
    },
    nextStep () {
      if (this.step <= 4) {
        this.step++
      }
    },
    lastStep () {
      if (this.step > 0) {
        this.step--
      }
    },
    leadingZero () {
      if ((this.timeHours === 0) && (this.timeMinutes === 0)) {
        this.stateSync = 'Minutos'
        this.timeHours = '00'
        this.timeMinutes = '00'
      }
    }
  }
}
</script>

<style>
  .space__title {
    padding: 4rem;
    text-align: center;
  }
  .step__controls {
    padding: 3rem 8rem;
  }
  .step__controls__sm {
    padding: 0rem 5rem;
  }
  .step__container {
    min-height: 600px;
    display: flex;
  }
  .step__container > .stepper__wrapper {
    flex: 1;
    display: flex;
    flex-flow: column;
    justify-content: space-between;
  }
  .stepper__body {
    max-height: 380px;
    min-height: 380px;
  }
  .step__content {
    height: auto;
    min-height: 420px;
  }
  .stepper__footer {
    padding-bottom: 3rem; 
  }
  .box__fixed {
    height: 100%;
    width: 100%;
    padding: 3rem;
  }

</style>
