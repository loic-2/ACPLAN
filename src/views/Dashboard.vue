<template>
  <HeaderPage :titre="'Tableau de bord'" :eventName="creerActivite" :show="true">
    <div class="row">
      <Bar :data="chartData" :options="chartOptions"></Bar>
    </div>
  </HeaderPage>
</template>

<script>
import HeaderPage from '../components/HeaderPage.vue';
import {Bar} from 'vue-chartjs'
import {Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale} from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
export default {
  components:{
    HeaderPage,
    Bar
  },
  data() {
    return {
      chartData: {
        labels: [ 'January', 'February', 'March' ],
        datasets: [ { data: [40, 20, 12] } ]
      },
      chartOptions: {
        responsive: true
      }
    }
  },
}
</script>

<style>

</style>