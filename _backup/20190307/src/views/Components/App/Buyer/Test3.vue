<template>
    <div class="text-xs-center">
    <br><br><br><br>
    <hr>  
    <h1>TEST 3</h1>
    <br>
        
        <br><br>

        <v-btn flat @click="" value="left" class="v-btn--active">
        </v-btn>  

        <br><br>
        <h3>test = {{ test }}</h3>
        <input type="text" 
                :value="test" 
                @input="test=$event.target.value">

        <br><br>
        <h3>dataToPass = {{ dataToPass }}</h3>
        <input type="text" 
                :value="dataToPass" 
                @input="$emit('update:dataToPass',$event.target.value)">

    <br><br>
    <h1>TEST 3</h1>
    <hr>
    <br><br><br><br>

    </div>
</template>

<script>
  export default {    
    props: {
        dataToPass: {
            type: String,
        }
    },

    data: function(){
        return {
            test: null,

        }
    },

    computed: {

    },
  }

</script>


<style scoped>
    input {
        border: 1px solid black;
    }
</style>