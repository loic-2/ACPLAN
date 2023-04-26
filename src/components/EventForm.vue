<template>
  <div class="modal fade" id="modalActivite" tabindex="-1" aria-labelledby="modalAjoutActivite" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="modalAjoutActivite">Ajouter une activite</h1>
        <button type="button" @click="resetData" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="form-group">
            <div class="mb-3">
                <label for="nom">Nom</label>
                <input type="text" class="form-control" v-model="nom">
            </div>
            <div class="mb-3">
                <div class="row">
                    <div class="col-5 align-self-center">
                        <label for="date-debut">Date debut</label>
                    </div>
                    <div class="col">
                        <Datepicker v-model="dateDebut" :value="dateDebut" language="fr"></Datepicker>
                    </div>
                </div>
            </div>
            <div class="mb-3">
                <div class="row">
                    <div class="col-5 align-self-center">
                        <label for="date-fin">Date fin</label>
                    </div>
                    <div class="col">
                        <Datepicker class="w-100" v-model="dateFin" :value="dateFin" language="fr"></Datepicker>
                    </div>
                </div>
            </div>
            <!--<div class="mb-3">
                <div class="row">
                    <div class="col-5 align-self-center">
                        <label for="heure-debut">Heure debut</label>
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
                        <label for="heure-fin">Heure fin</label>
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
                        <label for="exampleColorInput" class="form-label">Couleur de cette activite</label>
                    </div>
                    <div class="col">
                        <input type="color" v-model="couleur" class="form-control form-control-color" id="exampleColorInput" 
                         title="Choisissez la couleur">
                    </div>
                </div>
            </div>
        </div>
      </div>
      <div class="modal-footer">
        <button @click="resetData" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
        <button @click="saveActivite" type="button" class="btn btn-primary">Enregistrer</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { useToast,POSITION } from 'vue-toastification'
import Datepicker from 'vuejs3-datepicker'
import TimePicker from './TimePicker.vue'
export default {

    setup(){
        const toast=useToast()
        return {toast}
    },
    components:{
        Datepicker,
        TimePicker
    },
    data() {
        return {
            dateDebut: new Date(),
            dateFin: new Date(),
            heureDebut:{},
            heureFin:{},
            nom:'',
            couleur:'#223f7c'
        }
    },
    methods:{
        getEndHour(val){
            this.heureFin=val;
        },
        getStartHour(val){
            this.heureDebut=val;
        },
        resetData(){
            this.nom=''
            this.dateDebut=new Date()
            this.dateFin=new Date()
        },
        closeModal(){

            const modalCustomer = document.getElementById('modalActivite');

            // supprimer la classe "modal-open" de la balise body
            document.body.classList.remove('modal-open');
            document.body.removeAttribute('style')
            document.body.setAttribute('style','')
            // supprimer les classes "show" et "modal" de la div modale
            modalCustomer.classList.remove('show');
            modalCustomer.classList.add('modal')
            modalCustomer.removeAttribute('style');
            modalCustomer.removeAttribute('role');
            modalCustomer.removeAttribute('aria-modal');
            modalCustomer.setAttribute('style','display: none;')
            modalCustomer.setAttribute('aria-hidden',true)

            // supprimer la classe "show" de la div modale backdrop
            const modalBackdrop = document.querySelector('.modal-backdrop');
            if (modalBackdrop) {
                modalBackdrop.remove()
            }
            this.resetData()
        },
        saveApiCall(){

            const dteFinYear= this.dateFin.getFullYear()
            const dteDebutYear= this.dateDebut.getFullYear()
            const finmonth = ('0' + (this.dateFin.getMonth() + 1)).slice(-2);
            const finday = ('0' + this.dateFin.getDate()).slice(-2);
            const debutMonth = ('0' + (this.dateDebut.getMonth() + 1)).slice(-2);
            const debutDay = ('0' + this.dateDebut.getDate()).slice(-2);

            const formattedDateFin = `${dteFinYear}-${finmonth}-${finday}`;
            const formattedDateDebut = `${dteDebutYear}-${debutMonth}-${debutDay}`;
            this.$axios.post("http://localhost:8000/api/activites",{
                'nom':this.nom,
                'fin':formattedDateFin,
                'debut':formattedDateDebut,
                'couleur':this.couleur
            })
            .then(res => {
                this.closeModal()
                this.toast.success("Activite ajouter avec succes",{position:POSITION.TOP_RIGHT,timeout:3000})
                this.$emit('reload')
            })
            .catch(err => {
                console.log(err)
                this.toast.error(err.response.data,{position:POSITION.TOP_RIGHT, timeout:3000})
            })
        },
        saveActivite(){
            const currentDate= new Date();
            if(this.dateDebut>=currentDate){
                if(this.dateFin>=this.dateDebut){
                    if (this.nom.length>=10) {
                        this.saveApiCall()
                    } else {
                        this.toast.error("Vous devez entrer un nom",{position:POSITION.TOP_RIGHT,timeout:3000})
                    }
                }else{
                    this.toast.error("La date de fin doit etre superieure a celle de debut",{position:POSITION.TOP_RIGHT,timeout:3000})
                }
            }else{
                this.toast.error("La date de debut doit etre superieure a celle d'aujourd'hui",{position:POSITION.TOP_RIGHT,timeout:3000})
            }
        }
    }
}
</script>

<style>

</style>