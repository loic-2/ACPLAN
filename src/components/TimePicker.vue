<template>
  <div class="row timepicker align-items-center">
    <div class="col-1 p-2">
        <span><i class="fa-regular fa-clock"></i></span>
    </div>
    <div class="col ">
        <select name="" id="" class="form-select" v-model="hourSelected">
            <option><span>00</span></option>
            <option v-for="i=0 in 23" :key="i"><span v-if="i<10">0</span>{{ i }}</option>
        </select>
    </div>
    <div class="col-1">
        <span><b>:</b></span>
    </div>
    <div class="col ">
        <select name="" id="" class="form-select" v-model="minuteSelected">
            <option><span>00</span></option>
            <option v-for="i=0 in 59" :key="i"><span v-if="i<10">0</span>{{ i }}</option>
        </select>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            time:{
                hour:'',
                minute:''
            },
        }
    },
    computed: {
        hourSelected: {
        get() {
            return this.value
        },
        set(newValue) {
            this.time.hour=newValue
            this.$emit('getHour', this.time)
        }
        },
        minuteSelected: {
        get() {
            return this.value
        },
        set(newValue) {
            this.time.minute=newValue
            this.$emit('getHour', this.time)
        }
        }
    },
    methods:{
    }
}
</script>

<style>
.timepicker{
    border-width: 1px;
    background-color: gainsboro;
    border-style: solid;
    height: 60px;
    width: 230px;
    border-radius: 5px;
}
.swith-format{
    padding: 5px;
    width: 20px;
}
.btn-outline-primary{
    background-color: aquamarine;
}
</style>