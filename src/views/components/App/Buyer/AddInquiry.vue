<template>
  <v-stepper v-model="stepCnt" class="stepperClass" vertical>


    <v-stepper-step step="1" editable>
        <h2>Hello Buyer! Tell us what you want.</h2>
        <small>The more data you provide the better we can choose suppliers for you.</small>
    </v-stepper-step>
    <v-stepper-content step="1">
        <!-- <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card> -->
        <v-btn color="primary" @click="stepUp">Start</v-btn>        
    </v-stepper-content>




    <v-stepper-step step="2" editable>
        Specific keyword for your Quotation
    </v-stepper-step>
    <v-stepper-content step="2">
            <v-container>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-text-field
                            outline
                            single-line
                            v-model="formData.keywords"
                            @keyup.enter="stepUp"
                            label="Write keyword here.">
                                
                        </v-text-field>
                    </v-flex>
                </v-layout>
            </v-container>
        <v-btn color="primary" @click="stepUp">next</v-btn>
        <v-btn flat @click="stepDown">back</v-btn>
    </v-stepper-content>




    <v-stepper-step step="3" editable>
        Choose a category
    </v-stepper-step>
    <v-stepper-content step="3">
            <v-container>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-autocomplete
                            v-model="formData.category"
                            :loading="loading"
                            :items="items"
                            :search-input.sync="search"
                            cache-items
                            class="mx-3"
                            flat
                            hide-no-data
                            hide-details
                            label="What state are you from?"
                            solo-inverted>
                        </v-autocomplete>
                    </v-flex>
                </v-layout>
            </v-container>
        <v-btn color="primary" @click="stepUp">next</v-btn>
        <v-btn flat @click="stepDown">back</v-btn>
    </v-stepper-content>







    <v-stepper-step step="xxxx" editable>
        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    </v-stepper-step>
    <v-stepper-content step="xxxx">
        <v-card color="grey lighten-1" class="mb-5" height="200px">
            
        </v-card>
        <v-btn color="primary" @click="stepUp">next</v-btn>
        <v-btn flat @click="stepDown">back</v-btn>
    </v-stepper-content>




  </v-stepper>
</template>


<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->


<style scoped lang="scss">

.v-btn:not(.v-btn--outline).primary, 
.v-btn:not(.v-btn--outline).secondary, 
.v-btn:not(.v-btn--outline).accent, 
.v-btn:not(.v-btn--outline).success, 
.v-btn:not(.v-btn--outline).error, 
.v-btn:not(.v-btn--outline).warning, 
.v-btn:not(.v-btn--outline).info {
    // color: #000;
    background-color: #000 !important;
}

.stepperBlack {
    background-color: #000 !important;
    border-color: #000 !important;    
}

</style>


<style lang="scss">
.stepperClass .v-stepper__step__step {
    background-color: #000000  !important;
}

.theme--light.v-stepper .v-stepper__step:not(.v-stepper__step--active):not(.v-stepper__step--complete):not(.v-stepper__step--error) .v-stepper__step__step {
    background: rgba(0,0,0,0.15) !important;
}



.v-input input {
    caret-color: initial !important;
}    

</style>


<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->



<script>
  export default {
    data () {
      return {
        stepCnt: 1,
        formData: {
            keyword: null,
            category: null,
        }
      }
    },

    methods: {
        stepUp() {
            this.stepCnt++;
        },
        stepDown() {
            this.stepCnt--;
        },
    }
  }
</script>
