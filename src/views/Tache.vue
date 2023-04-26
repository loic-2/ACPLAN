<template>
  <header-page :titre="'Taches'" :eventName="'addTache'" :modalName="'modalTache'">
    <task-form></task-form>
    <full-calendar :options="calendarOptions" :events="events" :resources="resources"></full-calendar>
  </header-page>
</template>

<script>
import HeaderPage from '../components/HeaderPage.vue'
import FullCalendar from '@fullcalendar/vue3'
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import interactionPlugin from '@fullcalendar/interaction';
import TaskForm from '../components/TaskForm.vue';

export default {
    components:{
        HeaderPage,
        FullCalendar,
        TaskForm
    },
    data() {
      return {
        calendarOptions: {
          plugins: [resourceTimeGridPlugin, resourceTimelinePlugin, interactionPlugin],
          initialView: 'resourceTimelineDay',
          schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
          headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'resourceTimelineDay,resourceTimelineWeek,resourceTimelineMonth'
          },
        },
        resources: [
          { id: '1', title: 'Salle de réunion A' },
          { id: '2', title: 'Salle de réunion B' },
          { id: '3', title: 'Salle de réunion C' },
        ],
        events: [
        {
          id: '1',
          resourceId: '1',
          start: '2023-02-26T09:00:00',
          end: '2023-02-26T11:00:00',
          title: 'Réunion de projet',
        },
        {
          id: '2',
          resourceId: '2',
          start: '2023-03-01T11:00:00',
          end: '2023-03-01T13:00:00',
          title: 'Déjeuner avec les clients',
        },
      ]
      }
    },
}
</script>

<style>
th div.fc-datagrid-cell-frame, th div.fc-timeline-slot-frame{
  background-color: rgb(8, 7, 61);
}
th div.fc-timeline-slot-frame a{
  color: white;
  text-decoration-line: none;
  font-size: small;
  font-weight: normal;
}

th div.fc-datagrid-cell-frame div.fc-datagrid-cell-cushion:last-child{
  color: white;
  text-decoration-line: none;
}
</style>