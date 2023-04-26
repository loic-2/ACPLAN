<template>
  <header-page :titre="'Clients'" :eventName="'addClient'" :modalName="'modalCustomer'">
    <customer-form :title="'Ajouter un client'" :url="'http://127.0.0.1:8000/api/clients'"></customer-form>
    <Table :title="'Modifier le client'" :url="'http://127.0.0.1:8000/api/clients'" 
    :columns="columns" :data_key="'id_client'"></Table>
  </header-page>
</template>

<script>
import HeaderPage from '../components/HeaderPage.vue'
import Table from '../components/Table.vue'
import CustomerForm from '../components/CustomerForm.vue'
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
    },
    methods: {
    }
}
</script>

<style>

</style>