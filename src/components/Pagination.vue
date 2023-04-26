<template>
    <nav aria-label="...">
        <ul class="pagination justify-content-center">
            <li class="page-item" :class="{'disabled':(currentPage==1)}" @click="$emit('precedent',currentPage)">
                <span class="page-link">Precedent</span>
            </li>
            <li class="page-item" :class="{'active':(i==currentPage)}" @click="$emit('page',i)" v-for="i=1 in nombre" :key="i">
                <span class="page-link" >{{ i }}</span></li>
            <li class="page-item" :class="{'disabled':(currentPage==nombre)}" @click="$emit('suivant',currentPage)">
                <span class="page-link" href="#">Suivant</span>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {

    props:{
        nombre: Number,
        currentPage:Number,
    }
}
</script>

<style>
li.page-item{
    cursor: pointer;
}
span.page-link{
    color: rgb(8, 7, 61);
}
li.active>span.page-link{
    background-color: rgb(8, 7, 61);
    border-color: rgb(8, 7, 61);
    color: #fff;
}
</style>