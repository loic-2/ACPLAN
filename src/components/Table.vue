<template>
  <div class="row">
    <customer-form  :title="title" :modalName="'setModalCustomer'" 
    :customer="customer" :personnel="personnel" :modify="true" :url="url"></customer-form>
    <div class="row m-0 p-0 mb-1">
      <div class="col p-0 justify-content-start">
        <button @click="refreshTable" class="btn"><i class="fa-solid fa-rotate"></i></button>
      </div>
      <div class="col p-0 d-flex justify-content-end flex-row ">
        <label for="nombre" class="align-self-center">Nombre par page &nbsp;</label>
        <select name="" v-model="per_page" @change="gotoPage(1)" class="form-select" style="width: 70px;" id="">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="50">50</option>
        </select>
      </div>
    </div>
    <table v-if="filteredData.length" id="table-donnee">
        <thead>
            <tr>
                <th class="thead" v-for="key in columns" :key="key.id"
                @click="sortBy(key.name)"
                :class="{ active: sortKey == key.name }">
                    {{ capitalize(key.name) }}
                    <span class="arrow" :class="sortOrders[key.name] > 0 ? 'asc' : 'dsc'">
                    </span>
                </th>
                <th class="thead" v-if="action">Action</th>
            </tr>
        </thead>
        <tbody v-if="filteredData.length>0">
            <tr v-for="entry in filteredData" :key="entry.id">
                <td v-for="key in columns" :key="key.id">
                {{entry[key.name]}}
                </td>
                <td v-if="action">
                    <button class="btn btn-primary" @click="modify(entry)" data-bs-toggle="modal" :data-bs-target="'#setModalCustomer'">
                      <i class="fa-solid fa-pen"></i>
                    </button>&nbsp;
                    <button class="btn btn-danger" @click="deleteObject(entry)">
                      <i class="fa-solid fa-trash-can"></i>
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
    <Loading v-else-if="isLoading" v-model:active="isLoading"
                 :can-cancel="true"
                 :on-cancel="onCancel"
                 loader="bars"
                 :color="'#282a97'"
                 :is-full-page="false" style="position: relative; margin-top: 18%;"/>
    <p v-else>Aucun information a afficher</p>
    <pagination :currentPage="current_page" @suivant="gotoPage($event+1)" @precedent="gotoPage($event-1)" 
    @page="gotoPage" :nombre="number" v-if="filteredData.length"></pagination>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import CustomerForm from './CustomerForm.vue'
import {POSITION, useToast} from 'vue-toastification'
import Pagination from './Pagination.vue';
import { usePersonneStore } from '../store/PersonneStore';
export default {
  setup(){
    const toast= useToast()
    const personneTo= usePersonneStore()
    return {toast,personneTo}
  },
  components:{
    CustomerForm,
    Loading,
    Pagination
  },
  props: {
    data_key:String,
    columns: Array,
    filterKey: String,
    action:{
        type:Boolean,
        default:true
    },
    url:{
      type: String,
      default:''
    },
    customer:{
      type:Boolean,
      default:true
    },
    personnel:{
      type:Boolean,
      default:false
    },
    title:{
      type:String,
      default:"Modifier"
    }
  },
  data() {
    return {
      isLoading:true,
      personne:{
        id:null,
        nom:'',
        prenom:'',
        matricule:'',
        telephone:'',
        assurance:'',
        etat:'',
        email:'',
        adresse:''
      },
      data: [],
      number:0,
      current_page:0,
      per_page:15,
      sortKey: '',
      sortOrders: this.columns.reduce((o, key) => ((o[key] = 1), o), {})
    }
  },
  computed: {
    filteredData() {
      const sortKey = this.sortKey
      const filterKey = this.filterKey && this.filterKey.toLowerCase()
      const order = this.sortOrders[sortKey] || 1
      let data = this.data
      if (filterKey) {
        data = data.filter((row) => {
          return Object.keys(row).some((key) => {
            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
          })
        })
      }
      if (sortKey) {
        data = data.slice().sort((a, b) => {
          a = a[sortKey]
          b = b[sortKey]
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
      }
      return data
    }
  },
  methods: {
    sortBy(key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    },
    capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    },
    modify(param){
      this.personne.nom=param.nom
      this.personne.email=param.email
      this.personne.telephone=param.telephone
      this.personne.adresse=param.adresse
      if (this.personnel || this.customer) {
        this.personne.assurance=param.id_assureur
        if (this.personnel) {
          //this.personne.etat=param.etat
          this.personne.matricule=param.matricule
          this.personne.prenom=param.prenom
          this.personne.id=param.id_personnel

        }else{
          this.personne.id=param.id_client
        }
      }else{
        this.personne.id=param.id_assureur
      }
      console.log(this.personne)
      this.personneTo.modifierPersonne(this.personne)
    },
    deleteObject(param){

      this.$axios.delete(this.url+'/'+param[this.data_key],{timeout:3500})
      .then(res => {
        this.filteredData.splice(this.filteredData.indexOf(param),1);
        this.toast.success('Supression reussi',{timeout:2000,position:POSITION.TOP_RIGHT})
      })
      .catch(err => {
        this.toast.error('Echec de la suppression',{timeout:2000,position:POSITION.TOP_RIGHT})
      })
    },
    getData(val){
      this.$axios.get(this.url+"?page="+val+"&nombre="+this.per_page,{
          timeout: 40000
        })
        .then(res => {
          console.log(res)
          this.number=res.data.last_page
          this.current_page=res.data.current_page
          this.isLoading=false
          let counter=res.data.per_page*(val-1)+1
          this.data= res.data.data
          this.data.forEach(element => {
            element['#']=counter
            counter++
          });
        })
        .catch(err =>{
          console.log(err)
          this.isLoading=false
          this.toast.error('Impossible de charger les informations',{timeout:5000,position:POSITION.TOP_RIGHT})
        });
    },
    gotoPage(val){
      if (val>=1 && val<=this.number) {
        this.getData(val)
        this.filteredData
      }
    },
    refreshTable(){
      this.gotoPage(1)
    }
  },
  mounted() {
    this.getData(1)
  },
}
</script>


<style>
table {
  border: 1px solid #000;
  border-radius: 3px;
  background-color: #fff;
  margin-bottom: 40px;
}

th.thead {
  background-color: rgb(8, 7, 61);
  color: rgba(255, 255, 255, 0.66);
  cursor: pointer;
  user-select: none;
}

td {
  background-color: #f9f9f9;
}

th,
td {
  min-width: 120px;
  padding: 10px 20px;
}

th.active {
  color: #fff;
}

th.active .arrow {
  opacity: 1;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #fff;
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #fff;
}
</style>