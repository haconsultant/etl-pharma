<template>
    <v-container class="item__container">
        <v-card color="blue-grey lighten-5" class="fixed__card">
            <v-card-title primary-title>
                <div class="headline">Base de Datos</div>
            </v-card-title>
            <v-card-actions>
                <v-layout align-center justify-end class="large__title">
                <v-btn  @click.stop="dialog = true">Configuracion<v-icon right dark>settings</v-icon></v-btn>
                <v-btn router to="/connection/walkthrough">Paso a paso<v-icon right dark>list</v-icon></v-btn>
                </v-layout>
            </v-card-actions>
        </v-card>
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition" scrollable>
            <v-card tile>
                <v-toolbar card dark color="accent" class="large__title">
                    <v-btn icon class="error" @click.native="dialog = false">
                        <v-icon>close</v-icon>  
                    </v-btn>
                    <v-toolbar-title>Configuracion de Base de Datos</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn dark flat @click.native="dialog = false">Guardar</v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-card-text>
                    <v-list three-line subheader class="large__title">
                        <v-layout align-center justify-center>
                            <v-subheader class="headline">Conexion del Servidor</v-subheader>
                        </v-layout>
                        <v-form class="config__controls">
                            <v-text-field v-model="config.server" label="Direcion del Servidor" required></v-text-field>
                            <v-text-field v-model="config.userName" label="Usuario" required></v-text-field>
                            <v-text-field v-model="config.password" label="Contraseña" required></v-text-field>
                            <v-layout align-center justify-center>
                                <v-btn large @click="serverConnection">Conectarse</v-btn>
                            </v-layout>
                        </v-form>
                    </v-list>
                    <v-divider></v-divider>
                    <v-list three-line subheader class="large__title">
                        <v-layout align-center justify-center>
                            <v-subheader class="headline">Base de Datos</v-subheader>
                        </v-layout>
                        <v-form class="config__controls">
                            <v-select outline v-model="config.options.database" :items="dataBaseName" label="Bases de Datos"></v-select>
                            <v-layout align-center justify-center>
                                <v-btn large @click="connectDatabase">Conectarse</v-btn>
                            </v-layout>
                        </v-form>
                    </v-list>
                </v-card-text>
                <div style="flex: 1 1 auto;"></div>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import { mssqlServerConnection, mssqlConectDataBase } from '@/utils/server/mssql'
export default {
  data () {
    return {
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
        console.log(this.dataBaseName)
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
