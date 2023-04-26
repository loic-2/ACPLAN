<template>
  <header-page :titre="'Activites'" :eventName="'addActivite'" :modalName="'modalActivite'">
    <event-form @reload="getEvents"></event-form>
    <full-calendar :options="calendarOptions">
      <template v-slot:eventContent='arg'>
        <b>{{ arg.event.title }}</b>
      </template>
    </full-calendar>
  </header-page>
</template>

<script>
import HeaderPage from '../components/HeaderPage.vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import EventForm from '../components/EventForm.vue'
export default {
    components:{
        HeaderPage,
        FullCalendar,
        EventForm
    },
    data() {
      return {
        calendarOptions: {
        plugins: [ dayGridPlugin,interactionPlugin,timeGridPlugin,listPlugin ],
        initialView: 'dayGridMonth',
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek,dayGridDay,listMonth'
        },
        nowIndicator: true,
        dateClick: this.handleDateClick,
        eventClick:this.eventClick,
        eventDrop: this.eventDrag,
        selectable:true,
        events: []
        }
      }
    },
    methods: {
      handleDateClick: function(arg) {
        alert('date click! ' + arg.dateStr)
      },
      eventClick(arg){
        alert('event '+ arg.event.title)
      },
      eventDrag(arg){
        alert('event new start '+arg.event.start.toISOString())
      },
      getEvents(){
        this.$axios.get('http://127.0.0.1:8000/api/activites')
        .then(response => {
          this.calendarOptions.events = response.data.map(event => {
            return {
              title: event.nom,
              start: event.debut,
              end: event.fin,
              color: event.couleur
            }
          });
        })
        .catch(error => {
          console.log(error);
        });
      },
    },
    mounted() {
      this.getEvents()
    },
}
</script>

<style>
th div.fc-scrollgrid-sync-inner{
  background-color: rgb(8, 7, 61)
}
th div.fc-scrollgrid-sync-inner a.fc-col-header-cell-cushion{
  color:white;
  text-decoration-line: none;
  font-weight: normal;
}
</style>