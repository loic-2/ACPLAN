import {
    defineStore
} from "pinia";

export const usePersonneStore = defineStore('personne', {
    state: () => ({
        personne: {
            id: null,
            nom: "",
            prenom: "",
            matricule: "",
            telephone: "",
            adresse: "",
            etat: "",
            assurance: "",
            email: ""
        }
    }),
    actions: {
        modifierPersonne(nouvellePersonne) {
            this.personne = nouvellePersonne
        },
        // Action pour réinitialiser l'état de la personne
        resetPersonne() {
            this.personne = {
                id: null,
                nom: "",
                prenom: "",
                matricule: "",
                telephone: "",
                adresse: "",
                etat: "",
                assurance: "",
                email: ""
            }
        }
    },
    getters: {
        getPersonne() {
            return this.personne
        }
    }
})