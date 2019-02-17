<template>
  <v-stepper v-model="stepCnt" class="stepperClass" vertical>


    <v-stepper-step step="1" editable>
        <h2>Hello {{ $store.state.auth.auth_user.name }}! Tell us what you want.</h2>
        <small>The more data you provide the better we can choose suppliers for you.</small>

    </v-stepper-step>
    <v-stepper-content step="1">

        <v-btn color="primary" @click="stepUp()">Start</v-btn>        
    </v-stepper-content>




    <v-stepper-step step="2" editable>
        Specific keyword for your Quotation
    </v-stepper-step>
    <v-stepper-content step="2" ref="step_2">
            <v-container>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-text-field
                            outline
                            single-line                            
                            v-model="formData.keywords"
                            @keyup.enter="stepUp()"
                            label="Write keyword here..">
                        </v-text-field>
                    </v-flex>
                </v-layout>
            </v-container>
        <v-btn color="primary" @click="stepUp()">next</v-btn>
        <v-btn flat @click="stepDown()">back</v-btn>
    </v-stepper-content>




    <v-stepper-step step="3" editable>
        Choose a category
    </v-stepper-step>
    <v-stepper-content step="3" ref="step_3">
            <v-container>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-autocomplete
                            v-model="formData.category"
                            :loading="loading"
                            :items="categories"
                            :search-input.sync="search"                            
                            ref="categorySelect"
                            cache-items
                            class="mx-3"
                            flat
                            hide-no-data
                            hide-details
                            label="Type here the category.."
                            solo-inverted>
                        </v-autocomplete>
                    </v-flex>
                </v-layout>
            </v-container>
        <v-btn color="primary" @click="stepUp(2)">next</v-btn>
        <v-btn flat @click="stepDown()">back</v-btn>
    </v-stepper-content>


    <!-- Sub category here if there is -->



    <v-stepper-step step="5" editable>
        Warranty
    </v-stepper-step>
    <v-stepper-content step="5" ref="step_5">
            <v-container>
                <v-layout row wrap>
                    <v-flex xs1>
                        <v-text-field
                            class="digits_3"
                            full-width
                            outline
                            single-line
                            v-model="formData.warranty"
                            @keyup.enter="stepUp()"
                            :value="formData.warranty"
                            mask="#"> 
                        </v-text-field>
                    </v-flex>
                    <h4 style="padding-top: 30px;">yr/s</h4>
                </v-layout>
            </v-container>
        <v-btn color="primary" @click="stepUp()">next</v-btn>
        <v-btn flat @click="stepDown(2)">back</v-btn>
    </v-stepper-content>



    <v-stepper-step step="6" editable>
        Power
    </v-stepper-step>
    <v-stepper-content step="6" ref="step_6">
            <v-container>
                <v-layout row wrap>
                    <v-flex xs1>
                        <v-text-field
                            class="digits_4"
                            full-width
                            outline
                            single-line
                            v-model="formData.power"
                            @keyup.enter="stepUp()"
                            :value="formData.power"
                            mask="####"> 
                        </v-text-field>
                    </v-flex>
                    <h4 style="padding-top: 30px;">watts</h4>
                </v-layout>
            </v-container>
        <v-btn color="primary" @click="stepUp()">next</v-btn>
        <v-btn flat @click="stepDown()">back</v-btn>
    </v-stepper-content>




    <v-stepper-step step="7" editable>
        Lumens
    </v-stepper-step>
    <v-stepper-content step="7" ref="step_7">
            <v-container>
                <v-layout row wrap>
                    <v-flex xs1>
                        <v-text-field
                            class="digits_4"
                            full-width
                            outline
                            single-line
                            v-model="formData.lumen"
                            @keyup.enter="stepUp()"
                            :value="formData.lumen"
                            mask="####"> 
                        </v-text-field>
                    </v-flex>
                    <h4 style="padding-top: 30px;">lm</h4>
                </v-layout>
            </v-container>
        <v-btn color="primary" @click="stepUp()">next</v-btn>
        <v-btn flat @click="stepDown()">back</v-btn>
    </v-stepper-content>




    <v-stepper-step step="8" editable>
        Efficiency
    </v-stepper-step>
    <v-stepper-content step="8" ref="step_8">
            <v-container>
                <v-layout row wrap>
                    <v-flex xs1>
                        <v-text-field
                            class="digits_4"
                            full-width
                            outline
                            single-line
                            v-model="formData.efficiency"
                            @keyup.enter="stepUp()"
                            :value="formData.efficiency"
                            mask="####"> 
                        </v-text-field>
                    </v-flex>
                    <h4 style="padding-top: 30px;">lm/w</h4>
                </v-layout>
            </v-container>
        <v-btn color="primary" @click="stepUp()">next</v-btn>
        <v-btn flat @click="stepDown()">back</v-btn>
    </v-stepper-content>





    <v-stepper-step step="9" editable>
        Beam Angle
    </v-stepper-step>
    <v-stepper-content step="9" ref="step_9">
            <v-container>
                <v-layout row wrap>
                    <v-flex xs1>
                        <v-text-field
                            class="digits_4"
                            full-width
                            outline
                            single-line
                            v-model="formData.beam_angle"
                            @keyup.enter="stepUp()"
                            :value="formData.beam_angle"
                            mask="##"> 
                        </v-text-field>
                    </v-flex>
                    <h4 style="padding-top: 30px;">degrees</h4>
                </v-layout>
            </v-container>
        <v-btn color="primary" @click="stepUp()">next</v-btn>
        <v-btn flat @click="stepDown()">back</v-btn>
    </v-stepper-content>




    <v-stepper-step step="10" editable>
        CCT
    </v-stepper-step>
    <v-stepper-content step="10" ref="step_10">
            <v-container>
                <v-layout row wrap>
                    <v-flex xs1>
                        <v-text-field
                            class="digits_4"
                            full-width
                            outline
                            single-line
                            v-model="formData.cct"
                            @keyup.enter="stepUp()"
                            :value="formData.cct"
                            mask="####"> 
                        </v-text-field>
                    </v-flex>
                    <h4 style="padding-top: 30px;">lm</h4>
                </v-layout>
            </v-container>
        <v-btn color="primary" @click="stepUp()">next</v-btn>
        <v-btn flat @click="stepDown()">back</v-btn>
    </v-stepper-content>



    <v-stepper-step step="11" editable>
        IP Rating
    </v-stepper-step>
    <v-stepper-content step="11" ref="step_11">
            <v-container>
                <v-layout row wrap>
                    <v-flex xs1>
                        <v-text-field
                            class="digits_4"
                            full-width
                            outline
                            single-line
                            v-model="formData.ip"
                            @keyup.enter="stepUp()"
                            :value="formData.ip"
                            mask="####"> 
                        </v-text-field>
                    </v-flex>
                    <h4 style="padding-top: 30px;"></h4>
                </v-layout>
            </v-container>
        <v-btn color="primary" @click="stepUp()">next</v-btn>
        <v-btn flat @click="stepDown()">back</v-btn>
    </v-stepper-content>



    <v-stepper-step step="12" editable>
        Finish
    </v-stepper-step>
    <v-stepper-content step="12" ref="step_12">
            <v-container>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-text-field
                            outline
                            single-line                            
                            v-model="formData.finish"
                            @keyup.enter="stepUp()"
                            label="Input finish here..">
                        </v-text-field>
                    </v-flex>
                </v-layout>
            </v-container>
        <v-btn color="primary" @click="stepUp()">next</v-btn>
        <v-btn flat @click="stepDown()">back</v-btn>
    </v-stepper-content>


    <v-stepper-step step="13" editable>
        Size
    </v-stepper-step>
    <v-stepper-content step="13" ref="step_13">
            <v-container>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-text-field
                            outline
                            single-line                            
                            v-model="formData.size"
                            @keyup.enter="stepUp()"
                            label="Input finish here..">
                        </v-text-field>
                    </v-flex>
                </v-layout>
            </v-container>
        <v-btn color="primary" @click="stepUp()">next</v-btn>
        <v-btn flat @click="stepDown()">back</v-btn>
    </v-stepper-content>




    <v-stepper-step step="14" editable>
        Dimmable
    </v-stepper-step>
    <v-stepper-content step="14" ref="step_14">
            <v-container>
                <v-layout row wrap>
                    <v-flex xs2>
                        <v-switch color="black" v-model="formData.dimmable" label="TRIAC" value="TRIAC"></v-switch>
                    </v-flex>
                    <v-flex xs2>
                        <v-switch color="black" v-model="formData.dimmable" label="DALI" value="DALI"></v-switch>
                    </v-flex>
                    <v-flex xs2>
                        <v-switch color="black" v-model="formData.dimmable" label="0-10v" value="0-10v"></v-switch>
                    </v-flex>


                </v-layout>
            </v-container>
        <v-btn color="primary" @click="stepUp()">next</v-btn>
        <v-btn flat @click="stepDown()">back</v-btn>
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

.digits_2 {
    width: 50px;
    input {
        text-align: right;
    }
}

.digits_3 {
    width: 100px;
    input {
        text-align: right;
    }
}

.digits_4 {
    width: 130px;
    input {
        text-align: right;
    }
}

</style>





<style lang="scss">
.stepperClass .v-stepper__step__step {
    background-color: #000000  !important;
}

.theme--light.v-stepper .v-stepper__step:not(.v-stepper__step--active):not(.v-stepper__step--complete):not(.v-stepper__step--error) .v-stepper__step__step {
    background: rgba(0,0,0,0.15) !important;
}

    
.v-menu__content .primary--text {
    color: #d4d4d4  !important;
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
            warranty: null,
            power: null,
            lumen: null,
            efficiency: null,
            beam_angle: null,
            cct: null,
            ip: null,
            finish: null,
            size: null,
            dimmable: [],
            quantity: null,
            desired_price: null,
            shipping_method: null,
            trade_type: null,
            shipping_date: '2019-01-01',
            payment_method: null,
            message: null,

        },

        loading: false,
        search: null,
        select: null,
        categories: [],
        dimmables: [
            'TRIAC',
            'DALI',
            '0-10v',
        ],
      }
    },

    components: {
    },

    created: function() {
        // this.loading = true;
        console.log('getCategories_a');

        this.$store.dispatch('cat/getCategories_a')
        .then((response)=>{
            this.categories = response;
            // this.loading = false;
        })
        .catch((e) => {
            // this.loading = false;
            console.log('Error: ');
            console.log(e);
        });
    
    },

    watch: {
        search (val) {
            return val && val !== this.select && this.querySelections(val)
        },

        stepCnt(val) {

            console.log("step_"+val);
            if(val>1) {
                this.$refs["step_"+val].$el.querySelector('input').focus();
            }
        }
    },

    methods: {
        stepUp: function(val=1) {
            this.stepCnt += val;
        },
        stepDown: function(val=1)  {
            this.stepCnt -= val;
        },

        querySelections (v) {

            this.items = this.categories.filter(e => {
                return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
            })

        }        
    }


}
</script>


