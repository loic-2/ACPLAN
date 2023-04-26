<template>
  <HeaderPage :titre="'Personnels'" :eventName="'addPersonnel'" :modalName="'modalCustomer'">
    <customer-form :customer="false" :title="'Ajouter un personnel'" :personnel="true"
     :url="'http://127.0.0.1:8000/api/personnels'"></customer-form>
    <Table :data_key="'id_personnel'" :columns="columns" :title="'Modifier le personnel'" :customer="false"
     :personnel="true" :url="'http://127.0.0.1:8000/api/personnels'" :filterKey="searchValue"></Table>
  </HeaderPage>
</template>

<script>
import HeaderPage from '../components/HeaderPage.vue';
import Table from '../components/Table.vue';
import CustomerForm from '../components/CustomerForm.vue';
export default {
  components:{
    HeaderPage,
    Table,
    CustomerForm
  },
  data() {
    return {
      columns:[
        {
          id:1,
          name:"#",
        },
        {
          id:2,
          name:"nom",
        },
        {
          id:3,
          name:"prenom",
        },
        {
          id:4,
          name:"matricule",
        },
        {
          id:5,
          name:"email",
        },
        {
          id:6,
          name:"statut",
        }
      ],
      searchValue:''
    }
  },
}
</script>

<style>

</style>