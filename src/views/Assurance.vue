<template>
  <header-page :titre="'Assurances'" :eventName="'addAssurance'" :modalName="'modalCustomer'">
    <customer-form :customer="false" :title="'Ajouter une assurance'" :url="'http://127.0.0.1:8000/api/assureurs'"></customer-form>
    <Table :columns="columns" :url="'http://127.0.0.1:8000/api/assureurs'" :title="'Modifier l\'assureur'"
     :customer="false" :personnel="false" :data_key="'id_assureur'"></Table>
  </header-page>
</template>

<script>
import CustomerForm from '../components/CustomerForm.vue'
import HeaderPage from '../components/HeaderPage.vue'
import Table from '../components/Table.vue'
export default {
    components:{
        HeaderPage,
        Table,
        CustomerForm
    },
    data() {
        return {
          columns:[
          {id:1,name:'#'},
          {id:2,name:'nom'},
          {id:3,name:'adresse'},
          {id:4,name:'telephone'},
          {id:5,name:'email'}
          ]
        }
    }
}
</script>

<style>

</style>