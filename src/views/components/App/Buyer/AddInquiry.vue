<template>
<div>

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
                        <v-text-field
                            single-line                            
                            v-model="formData.keywords"
                            @keyup.enter="stepUp()"
                            label="Write keyword here..">
                        </v-text-field>
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
                        <v-autocomplete
                            v-model="formData.category"
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
                <v-layout row class="digits_1">
                        <v-text-field
                            v-model="formData.warranty"
                            @keyup.enter="stepUp()"
                            :value="formData.warranty"
                            suffix="yr/s"
                            mask="#">
                        </v-text-field>
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
                <v-layout row class="digits_4">
                        <v-text-field
                            v-model="formData.power"
                            @keyup.enter="stepUp()"
                            :value="formData.power"
                            suffix="watts"
                            mask="####"> 
                        </v-text-field>
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
                <v-layout row class="digits_4">
                        <v-text-field
                            v-model="formData.lumen"
                            @keyup.enter="stepUp()"
                            :value="formData.lumen"
                            suffix="lm"
                            mask="####"> 
                        </v-text-field>
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
                <v-layout row class="digits_4">                    
                        <v-text-field
                            v-model="formData.efficiency"
                            @keyup.enter="stepUp()"
                            :value="formData.efficiency"
                            suffix="lm/w"
                            mask="####"> 
                        </v-text-field>
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
                <v-layout row class="digits_3">
                        <v-text-field
                            v-model="formData.beam_angle"
                            @keyup.enter="stepUp()"
                            :value="formData.beam_angle"
                            suffix="degrees"
                            mask="###"> 
                        </v-text-field>
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
                <v-layout row class="digits_4">
                        <v-text-field
                            v-model="formData.cct"
                            @keyup.enter="stepUp()"
                            :value="formData.cct"
                            suffix="lm"
                            mask="####"> 
                        </v-text-field>
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
                <v-layout row class="digits_4">
                        <v-text-field
                            v-model="formData.ip"
                            @keyup.enter="stepUp()"
                            :value="formData.ip"                            
                            mask="####"> 
                        </v-text-field>
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
                <v-layout row >
                        <v-text-field
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
                        <v-text-field
                            single-line                            
                            v-model="formData.size"
                            @keyup.enter="stepUp()"
                            label="Input size here..">
                        </v-text-field>
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





    <v-stepper-step step="15" editable>
        Quantity
    </v-stepper-step>
    <v-stepper-content step="15" ref="step_15">
            <v-container>
                <v-layout row class="digits_4">
                        <v-text-field
                            v-model="formData.quantity"
                            @keyup.enter="stepUp()"
                            :value="formData.quantity"
                            suffix="pc/s"
                            mask="####"> 
                        </v-text-field>
                </v-layout>
            </v-container>
        <v-btn color="primary" @click="stepUp()">next</v-btn>
        <v-btn flat @click="stepDown()">back</v-btn>
    </v-stepper-content>




    <v-stepper-step step="16" editable>
        Desired Price
    </v-stepper-step>
    <v-stepper-content step="16" ref="step_16">
            <v-container>
                <v-layout row>
                    <v-flex xs3>
                        <v-text-field
                            v-model="formData.desired_price"
                            @keyup.enter="stepUp()"
                            :value="formData.desired_price"                            
                            suffix="USD"
                            mask="#######"> 
                        </v-text-field>
                    </v-flex>
                </v-layout>
            </v-container>
        <v-btn color="primary" @click="stepUp()">next</v-btn>
        <v-btn flat @click="stepDown()">back</v-btn>
    </v-stepper-content>






    <v-stepper-step step="17" editable>
        Preferred Shipment Date
    </v-stepper-step>
    <v-stepper-content step="17" ref="step_17" isCalendar>
            <v-container>
                <v-layout row>

                    <v-menu
                        v-model="calendar_menu"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        min-width="290px">

                        <v-text-field
                            slot="activator"
                            v-model="formData.shipping_date"
                            label="Shipment Date"
                            prepend-icon="event"                            
                            readonly></v-text-field>
                        <v-date-picker 
                            v-model="formData.shipping_date" 
                            header-color="black"
                            :min="minDate"
                            @input="calendar_menu = false">
                                
                        </v-date-picker>
                    
                    </v-menu>

                </v-layout>
            </v-container>
        <v-btn color="primary" @click="stepUp()">next</v-btn>
        <v-btn flat @click="stepDown()">back</v-btn>
    </v-stepper-content>





    <v-stepper-step step="18" editable>
        Payment Method
    </v-stepper-step>
    <v-stepper-content step="18" ref="step_18">
            <v-container>
                <v-layout row wrap>
                    <v-flex xs4>
                        <v-switch color="black" v-model="formData.payment_method" label="Credit Card" value="credit_card"></v-switch>
                    </v-flex>
                    <v-flex xs4>
                        <v-switch color="black" v-model="formData.payment_method" label="Bank Transfer" value="bank_transfer"></v-switch>
                    </v-flex>
                </v-layout>
            </v-container>
        <v-btn color="primary" @click="stepUp()">next</v-btn>
        <v-btn flat @click="stepDown()">back</v-btn>
    </v-stepper-content>






    <v-stepper-step step="19" editable>
        Files to attach
    </v-stepper-step>
    <v-stepper-content step="19" ref="step_19">
            <v-container>
                <v-layout row>
                    <v-textarea 
                        label="files here.."
                        single-line>
                    </v-textarea>
                </v-layout>
            </v-container>
        <v-btn color="primary" @click="stepUp()">next</v-btn>
        <v-btn flat @click="stepDown()">back</v-btn>
    </v-stepper-content>



    <v-stepper-step step="20" editable>
        Message
    </v-stepper-step>
    <v-stepper-content step="20" ref="step_20">
            <v-container>
                <v-layout row>
                    <v-textarea 
                        label="Type message here.."
                        v-model="formData.message"
                        single-line>
                    </v-textarea>
                </v-layout>
            </v-container>
        <v-btn color="primary" @click="reviewDialog=true">next</v-btn>
        <v-btn flat @click="stepDown()">back</v-btn>
    </v-stepper-content>


  </v-stepper>


<review-inquiry :dialog.sync="reviewDialog" :form-data="formData"></review-inquiry>
    

</div>
</template>



<script>

import helpers from "@/mixins/helpers";
import ReviewInquiry from "@/views/Components/App/Buyer/ReviewInquiry";

export default {
    mixins: [
        helpers,
    ],
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
            shipping_date: null,
            payment_method: null,
            message: null,

        },

        search: null,
        select: null,
        categories: [],
        minDate: null,
        reviewDialog: false,
        dimmables: [
            'TRIAC',
            'DALI',
            '0-10v',
        ],
        calendar_menu: false,
      }
    },

    components: {
        ReviewInquiry
    },

    created: function() {

        // for shipping_date field
        this.formData.shipping_date = this.getDateTime();
        this.minDate = this.formData.shipping_date;

        // get categories for category select box
        this.$store.dispatch('cat/getCategories_a')
        .then((response)=>{
            this.categories = response;
        })
        .catch((e) => {
            console.log('Error: ');
            console.log(e);
        });
    
    },

    watch: {
        search (val) {
            return val && val !== this.select && this.querySelections(val)
        },

        stepCnt(val) {

            // console.log("step_"+val);
            if(val>1) {

                if(typeof this.$refs["step_"+val].$attrs.isCalendar == "undefined") {

                    
                    if(this.$refs["step_"+val].$el.querySelector('input') != null) {
                        this.$refs["step_"+val].$el.querySelector('input').focus();
                    } 
                    else if(this.$refs["step_"+val].$el.querySelector('textarea') != null) {
                        this.$refs["step_"+val].$el.querySelector('textarea').focus();
                    } 

                } 
            }
        }
    },

    methods: {
        stepUp: function(val=1) {
            // console.log("stepCnt = "+this.stepCnt);
            // console.log("val = "+val);
            this.stepCnt = parseInt(this.stepCnt) + parseInt(val);
            // this.stepCnt += val;
        },
        stepDown: function(val=1)  {
            this.stepCnt = parseInt(this.stepCnt) - parseInt(val);
            // this.stepCnt -= val;
        },

        querySelections (v) {

            this.items = this.categories.filter(e => {
                return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
            })

        }        
    },


}
</script>












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

.digits_1 {
    width: 75px;
    input {
        // text-align: right;
    }
}

.digits_2 {
    width: 100px;
    input {
        // text-align: right;
    }
}

.digits_3 {
    width: 120px;
    input {
        // text-align: right;
    }
}

.digits_4 {
    width: 140px;
    input {
        // text-align: right;
    }
}

.digits_6 {
    width: 150px;
    input {
        // text-align: right;
    }
}



.stepperClass .v-stepper__step__step {
    background-color: #000000  !important;
}

.theme--light.v-stepper .v-stepper__step:not(.v-stepper__step--active):not(.v-stepper__step--complete):not(.v-stepper__step--error) .v-stepper__step__step {
    background: rgba(0,0,0,0.15) !important;
}

    
.v-menu__content .primary--text {
    color: #d4d4d4  !important;
}


.v-textarea textarea,
.v-input input {
    caret-color: initial !important;
}

.v-text-field__suffix {
    color: #000 !important;
}


.v-text-field--box input, 
.v-text-field--full-width input, 
.v-text-field--outline input {
    margin-top: 10px;
}

.theme--light.v-icon {
    color: #000;
}

</style>


<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->

