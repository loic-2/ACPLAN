<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HeaderApp from './components/HeaderApp.vue';
import MenuApp from './components/MenuApp.vue';
</script>

<template>
  <header-app @recherche="show"/>
  <div class="container-fluid">
    <div class="row">
      <menu-app/>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value:''
    }
  },
  methods:{
    show(val){
      console.log(val);
    }
  }
}
</script>
<style scoped>

</style>