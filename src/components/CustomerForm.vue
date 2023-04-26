<template>
  <div class="modal fade" data-bs-backdrop="static" :id="modalName" tabindex="-1" aria-labelledby="modalAddCustomer" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="modalAddCustomer">{{ title }}</h1>
                <button type="button" @click="resetPersonne" class="btn-close text-bg-light" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <div class="mb-3">
                        <label for="nom">Nom</label>
                        <input @input="controlName" type="text" class="form-control" :class="[showNomErrorMessage.value?'error':'succes']" v-model="personne.nom">
                        <span v-if="showNomErrorMessage.value" style="color:red">{{ showNomErrorMessage.message }}</span>
                    </div>
                    <div class="mb-3" v-if="personnel">
                        <label for="prenom">Prenom</label>
                        <input @input="controlPrenom" type="text" class="form-control" :class="[showPrenomErrorMessage.value?'error':'succes']" v-model="personne.prenom">
                        <span v-if="showPrenomErrorMessage.value" style="color:red">{{ showPrenomErrorMessage.message }}</span>
                    </div>
                    <div class="mb-3" v-if="personnel">
                        <label for="matricule">Matricule</label>
                        <input @input="controlMatricule" type="text" class="form-control" :class="[showMatriculeErrorMessage.value?'error':'succes']" v-model="personne.matricule">
                        <span v-if="showMatriculeErrorMessage.value" style="color:red">{{ showMatriculeErrorMessage.message }}</span>
                    </div>
                    <div class="mb-3">
                        <label for="email">Email</label>
                        <input @input="controlEmail" type="text" class="form-control" :class="[showEmailErrorMessage.value?'error':'succes']" v-model="personne.email">
                        <span v-if="showEmailErrorMessage.value" style="color:red">{{ showEmailErrorMessage.message }}</span>
                    </div>
                    <div class="mb-3">
                        <label for="telephone">Telephone</label>
                        <input placeholder="Ex: 693456778" @input="controlTelephone" type="text" class="form-control" :class="[showTelephoneErrorMessage.value?'error':'succes']" v-model="personne.telephone">
                        <span v-if="showTelephoneErrorMessage.value" style="color:red">{{ showTelephoneErrorMessage.message }}</span>
                    </div>
                    <div class="mb-3" v-if="customer || personnel">
                        <label for="assurance">Assurance</label>
                        <VueMultiselect
                        v-model="selctedAssurances" placeholder="Selectionner un assureur"
                        :options="assurances" label="nom" :close-on-select="true"
                        :searchable="true" track-by="nom"></VueMultiselect>
                        <!--<select name="assuranceSelection" id="" class="form-select" v-model="personne.assurance">
                            <option  v-for="assureur in assurances" :key="assureur['id_assureur']" :value="assureur['id_assureur']">{{ assureur['nom'] }}</option>
                        </select>-->
                    </div>
                    <div class="mb-3">
                        <label for="adresse">Adresse</label>
                        <input @input="controleAdresse" type="text" class="form-control" :class="[showAdresseErrorMessage.value?'error':'succes']" v-model="personne.adresse">
                        <span v-if="showAdresseErrorMessage.value" style="color:red">{{ showAdresseErrorMessage.message }}</span>
                    </div>
                    <div class="mb-3" v-if="personnel">
                        <label for="statut">Definissez l'etat</label>
                        <select name="stateSelection" id="" class="form-select" v-model="personne.etat">
                            <option value="activer">Activer</option>
                            <option value="desactiver">Desactiver</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" @click="resetPersonne" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                <button @click="save" type="button" class="btn btn-primary">Enregistrer</button>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import * as vue from 'vue'
import {POSITION,useToast} from 'vue-toastification'
import { usePersonneStore } from '../store/PersonneStore'
import VueMultiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.css'
export default {
    setup(){
        const toast= useToast()
        const PersonneStore=usePersonneStore()
        const personneStore=PersonneStore.getPersonne
        const prenomRegex=/^[a-zA-Z ]+$/i
        const personne = vue.reactive({
            nom:personneStore.nom,
            prenom:personneStore.prenom,
            adresse:personneStore.adresse,
            assurance:personneStore.assurance,
            email:personneStore.email,
            matricule:personneStore.matricule,
            telephone:personneStore.telephone,
            etat:personneStore.etat,
            id:personneStore.id
        })

        vue.watch(() => PersonneStore.getPersonne, (newVal) => {
            personne.nom = newVal.nom
            personne.prenom=newVal.prenom,
            personne.adresse = newVal.adresse
            personne.assurance = newVal.assurance
            personne.email = newVal.email
            personne.matricule = newVal.matricule
            personne.telephone = newVal.telephone
            personne.etat = newVal.etat
            personne.id = newVal.id
        })

        return {prenomRegex,toast,PersonneStore,personne}
    },

    components:{
            VueMultiselect
        },

    props:{
        url:{
            type:String,
            default:''
        },
        customer:{
            type:Boolean,
            default:true
        },
        personnel:{
            type:Boolean,
            default:false
        },
        modify:{
            type:Boolean,
            default:false
        },
        title:String,
        personneToEdit:Object,
        modalName:{
            type: String,
            default:'modalCustomer'
        }
    },
    data() {
        return {
            assurances:[],
            selctedAssurances:null,
            showNomErrorMessage:{
                value:false,
                message:"no thing to show"
            },
            showTelephoneErrorMessage:{
                value:false,
                message:"no thing to show"
            },
            showMatriculeErrorMessage:{
                value:false,
                message:"no thing to show"
            },
            showEmailErrorMessage:{
                value:false,
                message:"no thing to show"
            },
            showAdresseErrorMessage:{
                value:false,
                message:"no thing to show"
            },
            showPrenomErrorMessage:{
                value:false,
                message:"no thing to show"
            }
        }
    },
    computed: {
        updateAssurance(){
            this.personne.assurance=this.selctedAssurances['id_assureur']
        }
    },
    methods: {
        controlName(){
            if (this.personne.nom.length>=20) {
                this.showNomErrorMessage.message="Le nom ne peut exceder 20 caracteres.";
                this.showNomErrorMessage.value=true
            } else {
                if (!this.prenomRegex.test(this.personne.nom)) {
                    this.showNomErrorMessage.message="Le nom ne doit contenir que des lettres.";
                    this.showNomErrorMessage.value=true
                } else {  
                this.showNomErrorMessage.value=false
                }
            }
        },
        controlTelephone(){
            const telephoneRegex= /^[0-9]+$/
            if (this.personne.telephone.length!=9) {
                this.showTelephoneErrorMessage.message="Le telephone doit etre de 9 caracteres(chiffres)."
                this.showTelephoneErrorMessage.value=true
            } else {
                if (!telephoneRegex.test(this.personne.telephone)) {
                    this.showTelephoneErrorMessage.message="Le telephone ne doit pas contenir de caracteres speciaux."
                    this.showTelephoneErrorMessage.value=true
                } else { 
                    this.showTelephoneErrorMessage.value=false
                }
            }
        },
        controlEmail(){
            const emailRegex = /^[a-z0-9]+[.]{0,1}[a-z0-9]+@[a-z0-9]+\.[a-z]{2,}$/;
            if (!emailRegex.test(this.personne.email)) {
                this.showEmailErrorMessage.message="Adresse email invalide."
                this.showEmailErrorMessage.value=true
            } else {
                this.showEmailErrorMessage.value=false
            }
        },
        controlPrenom(){
            if (this.personne.prenom.length>30) {
                this.showPrenomErrorMessage.message="Le prenom ne doit pas exceder 30 caracteres."
                this.showPrenomErrorMessage.value=true
            } else {
                if (!this.prenomRegex.test(this.personne.prenom)) {
                    this.showPrenomErrorMessage.message="Le prenom ne doit contenir que des lettres."
                    this.showPrenomErrorMessage.value=true
                } else {
                    this.showPrenomErrorMessage.value=false
                }
            }
        },
        controleAdresse(){
            const adresseRegex = /^[a-z0-9.\-:, ]+$/i
            if (this.personne.adresse.length>20) {
                this.showAdresseErrorMessage.message="L'adresse doit avoir au maximum 20 caracteres."
                this.showAdresseErrorMessage.value=true
            } else {
                if (!adresseRegex.test(this.personne.adresse)) {
                    this.showAdresseErrorMessage.message="L'adresse ne doit pas contenir de caracteres speciaux."
                    this.showAdresseErrorMessage.value=true
                } else {
                    this.showAdresseErrorMessage.value=false
                }
            }
        },
        controlMatricule(){
            const date= new Date().getFullYear().toString().padStart(4,'0')
            const startWithDateRegex= new RegExp(`^${date}`)
            const dateRegex= new RegExp(`^${date}[A-Z0-9]+$`)
            if (this.personne.matricule.length>15) {
                this.showMatriculeErrorMessage.message="Le matricule doit avoir au maximum 15 caracteres(lettres et chiffres)."
                this.showMatriculeErrorMessage.value=true
            } else {
                if (!startWithDateRegex.test(this.personne.matricule)) {
                    this.showMatriculeErrorMessage.message="Le matricule doit commencer par l'annee courante."
                    this.showMatriculeErrorMessage.value=true
                } else {
                    this.showMatriculeErrorMessage.value=false
                    if (!dateRegex.test(this.personne.matricule)) {
                        this.showMatriculeErrorMessage.message="Le matricule doit contenir des lettres(majuscules) et chiffres."
                        this.showMatriculeErrorMessage.value=true
                    } else {
                        this.showMatriculeErrorMessage.value=false
                    }
                }
            }
        },
        resetPersonne(){
            this.PersonneStore.resetPersonne()
            this.showAdresseErrorMessage.value=false
            this.showEmailErrorMessage.value=false
            this.showMatriculeErrorMessage.value=false
            this.showNomErrorMessage.value=false
            this.showPrenomErrorMessage.value=false
            this.showTelephoneErrorMessage.value=false
            console.log(this.PersonneStore.getPersonne)
        },
        closeModal(){
            const modalCustomer = document.getElementById(this.modalName);

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
            this.resetPersonne()
        },
        controlNoneEmpty(){
            let result=false
            if (!this.showAdresseErrorMessage.value && this.personne.adresse.length) {
                if (!this.showNomErrorMessage.value && this.personne.nom.length) {
                    if (!this.showEmailErrorMessage.value && this.personne.email.length) {
                        if (!this.showTelephoneErrorMessage.value && this.personne.telephone.length) {
                            result=true
                            if (this.personnel || this.customer) {
                                if (this.personne.assurance!="") {
                                    if (this.personnel) {
                                        result=false
                                        if (!this.showMatriculeErrorMessage.value && this.personne.matricule.length) {
                                            if (!this.showPrenomErrorMessage.value && this.personne.prenom.length) {
                                                if (this.personne.etat!="") {
                                                    result=true
                                                } else {
                                                    this.toast.error('Vous definir l\'etat du personnel',{position:POSITION.TOP_RIGHT})
                                                }
                                            } else {
                                                this.toast.error('Le champs Prenom est Obligatoire',{position:POSITION.TOP_RIGHT})
                                            }
                                        } else {
                                            this.toast.error('Vous devez renseigner le champs Matricule',{position:POSITION.TOP_RIGHT})
                                        }
                                    }
                                } else {
                                    result=false
                                    this.toast.error('Vous devez choisir votre assureur',{position:POSITION.TOP_RIGHT})
                                }
                            }
                        } else {
                            this.toast.error('Le champs Telephone est obligatoire',{position:POSITION.TOP_RIGHT})
                        }
                    } else {
                        this.toast.error('Le champs Email est obligatoire',{position:POSITION.TOP_RIGHT})
                    }
                } else {
                    this.toast.error('Le champs Nom est obligatoire',{position:POSITION.TOP_RIGHT})
                }
            } else {
                this.toast.error('Le champs Adresse est obligatoire',{position:POSITION.TOP_RIGHT})
            }
            return result
        },
        save(){
            if (this.controlNoneEmpty()) {
                if (!this.modify) {
                    this.$axios.post(this.url,{
                            'personne':this.personne
                        })
                        .then(res => {
                            console.log(res.data)
                            this.closeModal()
                            this.toast.success('Enregistrement reussi',{timeout:3000,position:POSITION.TOP_RIGHT})
                        })
                        .catch(err => {
                            console.log(err)
                            //this.closeModal()
                            this.toast.error(err.response.data,{timeout:3000,position:POSITION.TOP_RIGHT})
                        })
                } else {
                    this.$axios.put(this.url,{
                            'personne':this.personne
                        })
                        .then(res => {
                            console.log(res.data)
                            this.closeModal()
                            this.toast.success('Modification reussi',{timeout:3000,position:POSITION.TOP_RIGHT})
                        })
                        .catch(err => {
                            console.log(err)
                            //this.closeModal()
                            this.toast.error(err.response.data,{timeout:3000,position:POSITION.TOP_RIGHT})
                        })
                }
            }
        }
    },
    mounted() {
        this.$axios.get('http://127.0.0.1:8000/api/assureurs')
        .then(res =>{
            this.assurances=res.data.data
        })
        .catch(err => {
            this.toast.error('Impossible de charger les assureurs',{timeout:3000,position:POSITION.TOP_RIGHT})
        })
      if (this.modify) {
        console.log(this.personne)
      }  
    },
}
</script>

<style>
div.modal-header, div.modal-footer{
    background-color: rgb(8, 7, 61);
    color: white;
    font-style: normal;
}
input.form-control.error{
    border-color: rgb(240, 65, 65);
    box-shadow: 0 0 10px rgb(231, 59, 59);
}
.hide-block{
    display: none;
}

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