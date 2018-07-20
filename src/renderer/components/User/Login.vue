<template>
  <v-container fluid class="flex-fluid" id="login__app">
        <v-layout align-center justify-center>
        <v-form ref="form" v-model="valid" lazy-validation class="login__box login__form">
          <h1>Acceso ETL</h1>
            <v-text-field color="teal accent-3" v-model="user.name" :rules="nameRules" label="Usuario" required></v-text-field>
            <v-text-field v-model="user.password" :rules="passwordRules" label="Contraseña" required></v-text-field>
            <!-- <v-select v-model="select" :items="items" :rules="[v => !!v || 'Selecione una sucursal']" label="Sucursal" required></v-select> -->
            <v-checkbox v-model="checkbox" :rules="[v => !!v || 'You must agree to continue!']" label="Acuerdos de Servicio" required></v-checkbox>
            <v-layout align-center justify-center>
                <v-btn :disabled="!valid" @click="submit">
                    Acceder
                </v-btn>
                <v-btn @click="clear">Limpiar</v-btn>
            </v-layout>
        </v-form>
    </v-layout>
  </v-container>
</template>

<script>
import { logUser, getPharmacyBranches } from '@/utils/api/access'
export default {
  data: () => ({
    pharmacies: [],
    branches: [],
    user: {
      id: '',
      name: '12345',
      password: '12345mM*',
      pharmacies: []
    },
    valid: true,
    nameRules: [
      v => !!v || 'Usuario requerido'
    ],
    passwordRules: [
      v => !!v || 'Contraseña requerida'
    ],
    select: null,
    items: [
      'Item 1',
      'Item 2',
      'Item 3',
      'Item 4'
    ],
    checkbox: false
  }),

  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        logUser(this.user.name, this.user.password).then(response => {
          if (response.data.message[0].user_type === 'farmacia') {
            this.user.id = response.data.message[0].id
            getPharmacyBranches(this.user.id).then(response => {
              console.log(response.data)
              this.checkPharmacyInfo(response.data.pharmacies).then(response => {
                this.user.pharmacies = response
                this.$store.dispatch('saveUserData', this.user)
                this.$router.push('/User/Wellcome')
              })
            })
          } else {
            console.log('Crendenciales Incorrectas')
          }
        }).then(() => {
          console.log({a: this.pharmacies, b: this.branches})
        })
      }
    },
    checkPharmacyInfo (data) {
      return new Promise((resolve, reject) => {
        var beta = []
        var aplha = data.reduce((start, next, index, array) => {
          if (array[index].branches.length < 0) {
            beta.push([index])
          } else {
            beta.push(['key'])
          }
          return beta
        })
        console.log(aplha)
        resolve(aplha)
      })
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>

<style>
    .login__form {
      box-shadow: 11px 10px 29px #03827f;
      background-color: rgba(1, 158, 155, 0.8);
    }
    .login__box {
        width: 60vw;
        padding: 3rem;
        margin-top: 15rem;
    }    
    .login__box > * {
      color: azure!important;
    }
</style>
