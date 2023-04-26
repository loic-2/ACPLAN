<template>
  <div class="modal fade" id="modalTache" tabindex="-1" aria-labelledby="modalAjoutTache" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="modalAjoutTache">Ajouter une tache</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <div class="mb-3">
                        <label for="nom">Nom</label>
                        <input type="text" class="form-control" v-model="tache.nom">
                    </div>
                    <div class="mb-3">
                        <label for="nom">Choisissez l'activite</label>
                        <vue-multiselect v-model="tache.activite" 
                        placeholder="Selectionnez l'activite"
                        :options="activites" label="nom" :close-on-select="true"
                        :searchable="true" track-by="nom"></vue-multiselect>
                    </div> 
                    <div class="mb-3">
                        <label for="nom">Choisissez les personnels</label>
                        <vue-multiselect v-model="tache.personnels" 
                        placeholder="Selectionnez les personnels concernes"
                        :options="personnels" label="nom" :close-on-select="true"
                        :searchable="true" track-by="nom" :multiple="true"></vue-multiselect>
                    </div>
                    <div class="mb-3">
                        <div class="row">
                            <div class="col-5 align-self-center">
                                <label for="nom">Date debut</label>
                            </div>
                            <div class="col">
                                <Datepicker :value="dateDebut" v-model="dateDebut"></Datepicker>
                            </div>
                        </div>
                    </div>
                    <div class="mb-3">
                        <div class="row">
                            <div class="col-5 align-self-center">
                                <label for="nom">Date fin</label>
                            </div>
                            <div class="col">
                                <Datepicker :value="dateFin" v-model="dateFin"></Datepicker>
                            </div>
                        </div>
                    </div>
                    <!--<div class="mb-3">
                        <div class="row">
                            <div class="col-5 align-self-center">
                                <label for="nom">Heure debut</label>
                            </div>
                            <div class="col">
                                <div class="px-2">
                                    <time-picker @getHour="getStartHour"></time-picker>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mb-3">
                        <div class="row">
                            <div class="col-5 align-self-center">
                                <label for="nom">Heure fin</label>
                            </div>
                            <div class="col">
                                <div class="px-2">
                                    <time-picker @getHour="getEndHour"></time-picker>
                                </div>
                            </div>
                        </div>
                    </div>-->
                    <div class="mb-2">
                        <div class="row">
                            <div class="col-5 align-self-center">
                                <label for="exampleColorInput" class="form-label">Couleur de cette tache</label>
                            </div>
                            <div class="col">
                                <input type="color" class="form-control form-control-color" id="exampleColorInput" 
                                value="#223f7c" title="Choisissez la couleur">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                <button type="button" @click="saveTask()" class="btn btn-primary">Enregistrer</button>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { useToast,POSITION } from 'vue-toastification';
import Datepicker  from 'vuejs3-datepicker'
import TimePicker from './TimePicker.vue';
import VueMultiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.css'
export default {
    setup(){
        const toast=useToast()
        return {toast}
    },
  components: { TimePicker,Datepicker,VueMultiselect },
  data() {
    return {
        dateDebut:new Date(),
        dateFin: new Date(),
        heureDebut: {},
        heureFin:{},
        personnels:[],
        activites:[],
        tache:{
            nom:'',
            personnels:[],
            activite:''
        }
    }
  },
  methods:{
    getStartHour(val){
        this.heureDebut=val;
    },
    getEndHour(val){
        this.heureFin=val;
    },
    getActivities(){
        return this.$axios.get("http://localhost:8000/api/activites")
    },
    getPersonnels(){
        return this.$axios.get("http://localhost:8000/api/personnels")
    },
    saveTask(){
        console.log(this.tache.activite['debut'])
        console.log(this.tache.activite['fin'])
        if(this.dateDebut>=this.tache.activite['debut'] && this.dateDebut<=this.tache.activite['fin']){
            if(this.dateFin>=this.tache.activite['debut'] && this.dateFin<=this.tache.activite['fin']){
                if(this.dateDebut<=this.dateFin){

                }else{
                    this.toast.error("La date de debut ne peut etre superieur a celle de fin",{position:POSITION.TOP_RIGHT})
                }
            }else{
                this.toast.error("La date de fin doit etre entre celle de debut et de fin de l'activite",{position:POSITION.TOP_RIGHT})
            }

        }else{            
            this.toast.error("La date debut doit etre entre celle de debut et de fin de l'activite",{position:POSITION.TOP_RIGHT})
        }
    }
  },
  mounted() {
    Promise.all([this.getActivities(),this.getPersonnels()])
        .then(([activites,personnels]) =>{
            this.activites=activites.data
            this.personnels=personnels.data.data
        })
  },

}
</script>

<style>

.multiselect__option--highlight::after {
    content: attr(data-select);
    background: #35495e;
    color: white;
  }
  .multiselect__option--highlight {
    background: #35495e;
    outline: none;
    color: white;
  }
  .multiselect__tag {
    position: relative;
    display: inline-block;
    padding: 4px 26px 4px 10px;
    border-radius: 5px;
    margin-right: 10px;
    color: #fff;
    line-height: 1;
    background: #35495e;
    margin-bottom: 5px;
    white-space: nowrap;
    overflow: hidden;
    max-width: 100%;
    text-overflow: ellipsis;
  }
  .multiselect__tag-icon::after {
    content: "×";
    color: #fff;
    font-size: 14px;
  }
</style>