<template>
    <v-container fluid grid-list-md class="layaout__box">
        <h1>Selecion de Farmacia y Sucursal</h1>
        <div class="iterators__container">
            <div class="iterator__box">
                <h1>Farmacias</h1>
                <v-data-iterator :items="pharmacies" :rows-per-page-items="rowsPerPagePharmacies" :pagination.sync="pagination" content-tag="v-layout" row wrap>
                    <v-flex slot="item" slot-scope="props" xs12 sm6 md4 lg3 align-center>
                        <v-card>
                            <v-card-media :src="imageUrl" height="100px"></v-card-media>
                            <v-card-title class="layout__vertical">
                                <h4>{{ props.item.name }}</h4>
                                <div>
                                    <span class="grey--text">{{ props.item.rif}}</span>
                                    <br>
                                    <span>{{props.item.description}}</span>
                                    <br>
                                </div>
                            </v-card-title>
                            <v-card-actions>
                                <v-layout align-center justify-end>
                                    <v-btn flat color="primary" @click="selectedPharmacy(props.item.id)">Selecionar</v-btn>
                                </v-layout>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-data-iterator>
            </div>
            <v-divider></v-divider>
            <v-slide-y-transition mode="out-in">
                <div v-if="branches.length > 0" class="iterator__box">
                    <h1>Sucursales</h1>
                    <v-data-iterator :items="branches" :rows-per-page-items="rowsPerPageBranches" :pagination.sync="pagination" content-tag="v-layout" row wrap>
                        <v-flex slot="item" slot-scope="props" xs12 sm4 md3 lg3>
                            <v-card>
                                <v-card-media :src="imageUrl" height="100px"></v-card-media>
                                <v-card-title class="layout__vertical">
                                    <h4>{{ props.item.name }}</h4>
                                    <v-card-actions>
                                        <v-layout justify-end>
                                            <v-btn flat color="primary" @click="selectedPharmacyBranch(props.item.id)">Selectionar</v-btn>
                                        </v-layout>
                                    </v-card-actions>
                                </v-card-title>
                            </v-card>
                        </v-flex>
                    </v-data-iterator>
                </div>
            </v-slide-y-transition>
            <v-card-actions>
                <v-layout align-center justify-end>
                    <v-btn :disabled="((selectedPharmacyId === '') || (selectedPharmacyBranchId === ''))" large color="error" @click="clean()">Cancelar</v-btn>
                    <v-btn :disabled="((selectedPharmacyId === '') || (selectedPharmacyBranchId === ''))" large color="primary" @click="nextStep()">Continuar</v-btn>
                </v-layout>
            </v-card-actions>
        </div>
    </v-container>
</template>
<script>
  export default {
    data: () => ({
      imageUrl: 'static/pharmacy.jpg',
      selected: false,
      selectedPharmacyId: '',
      selectedPharmacyBranchId: '',
      rowsPerPagePharmacies: [],
      rowsPerPageBranches: [],
      pharmacies: [],
      branches: [],
      pagination: {
        rowsPerPage: 4
      }
    }),
    created () {
      this.getInfo()
    },
    methods: {
      getInfo () {
        this.pharmacies = [this.$store.state.user.info.pharmacies]
      },
      selectedPharmacy (id) {
        this.selectedPharmacyId = id
        this.branches = []
        this.pharmacies.map((pharmacy) => {
          if (pharmacy.id === id) {
            pharmacy.branches.map((branch) => {
              this.branches.push(branch)
            })
          }
        })
        console.log(this.branches)
      },
      selectedPharmacyBranch (id) {
        this.selectedPharmacyBranchId = id
      },
      nextStep () {
        this.$router.push('/Connection/Walkthrough')
        console.log(`id_pharmacy = ${this.selectedPharmacyId} / id_pharamcy_branch = ${this.selectedPharmacyBranchId}`)
      },
      clean () {
        this.selectedPharmacyId = ''
        this.selectedPharmacyBranchId = ''
      }
    }
  }
</script>

<style>
    .layout__vertical {
      display: flex;
      flex-flow: column;
      align-items: baseline;
    }
    .layaout__box {
      box-shadow: 11px 10px 29px #03827f;
      background-color: rgba(1, 158, 155, 0.8);
    }
</style>
