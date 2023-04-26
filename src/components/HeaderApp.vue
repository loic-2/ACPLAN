<template>
    <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="/">INTIA</a>
            <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <input @change="search" class="form-control form-control-dark w-100" v-model="dataSearch" type="text" placeholder="Search" aria-label="Search">
            <div class="navbar-nav">
                <div class="nav-item text-nowrap">
                    <a class="nav-link px-3" href="#">Deconnexion</a>
                </div>
            </div>
    </header>    
</template>
<script>

export default {
    data() {
        return {
            dataSearch:''
        }
    },
    methods:{
        search(){
            this.$emit('recherche');
        }
    }
}
</script>