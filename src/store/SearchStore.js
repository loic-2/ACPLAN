import {
    defineStore
} from "pinia";
export const useSearchStore = defineStore("search", {
    state: () => ({
        search: ''
    }),
    actions: {
        resetSearch() {
            this.search = ''
        },
        setSearch(newValue) {
            this.search = newValue
        }
    },
    getters: {
        getSearchChar() {
            return this.search
        }
    }
})