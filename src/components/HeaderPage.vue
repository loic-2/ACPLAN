<template>
  <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4" :id="idName">
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2"><p>{{titre}}</p></h1>
      <div class="btn-toolbar mb-2 mb-md-0">
        <div class="btn-group me-2">
          <button type="button" class="btn btn-sm btn-outline-secondary"
           @click="send" data-bs-toggle="modal" :data-bs-target="'#'+modalName">Ajouter</button>
          <button type="button" @click="exportDataToExcel" class="btn btn-sm btn-outline-secondary">Exporter</button>
        </div>
        <button type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle" v-if="show">
            <span data-feather="calendar"></span>
              Cette semaine
        </button>
      </div>
    </div>
    <slot></slot>
  </main>
</template>

<script>
import {read, utils, writeFileXLSX} from 'xlsx'
export default {
  computed: {
        idName: function () {
            return this.titre.toLowerCase()+'-bloc';
        }
      },
    props:{
        titre: String,
        eventName:String,
        show:{
          type: Boolean,
          default: false
        },
        modalName:{
          type: String,
          default:''
        }
    },
    methods: {
      send(){
        this.$emit(this.eventName);
      },
      exportDataToExcel(){
        const wb= utils.table_to_book(document.getElementById("table-donnee"))
        writeFileXLSX(wb,this.titre+".xlsx")
      }
    },
}
</script>

<style>

</style>