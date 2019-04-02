<template>
  <div>
    <v-dialog :value="dialog" @input="$emit('update:dialog', false)" scrollable max-width="80%">
      <v-card>
        
        <v-card-title v-if="isEdit" class="headline red darken-1 white--text" primary-title height="45px">
          Edit
          <v-spacer></v-spacer>
          <span class="font-weight-bold">INQUIRY</span>&nbsp&nbsp<span class="font-weight-light">#{{ inquiry.id }}</span>
        </v-card-title>

        <v-card-title v-else class="headline grey darken-4 white--text" primary-title height="45px">
           Create Inquiry
        </v-card-title>

        <v-card-text id="inquiryCreate_scrollable_cont">
            <v-layout row wrap>
              
            <v-flex xs7>
                <v-card>
                  
          <!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
          <!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
          <!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->

          <v-form @submit.prevent="$v.$invalid ? null : submit()" ref="formData">
                <v-stepper v-model="stepCnt" class="stepperClass" vertical>
                  <v-stepper-step step="1" editable class="step_1">

                    <h2>Hello {{ $store.state.auth.auth_user.name }}! Tell us what you want.</h2>
                    <small>The more data you provide the better we can choose suppliers for you.</small>
                  </v-stepper-step>

                  <v-stepper-content step="1">
                    
                    <!-- when is the inquiry is rejected show this -->
                    <div v-if="isEdit">
                        <v-layout row wrap>
                          <v-flex xs1>
                             <v-img src="https://image.flaticon.com/icons/svg/1497/1497760.svg" height="50px" contain></v-img>  
                          </v-flex>
                          <v-flex xs10 mt-3>
                              <h3 class="font-weight-medium red--text" style="font-style: italic;">
                                Your INQUIRY #1553753471283 is decline by our verifier, please refer on the message box if you have concerns. thanks!
                              </h3>                    
                          </v-flex>
                        </v-layout>
                    </div>

                    <div v-else>
                      <v-btn color="primary" @click="stepUp()">Start</v-btn>
                      <v-btn color="primary" @click="inquirylookup=true"> <span>use existing Inquiry ?</span> </v-btn>
                    </div>

                    

                  </v-stepper-content>

                  <v-stepper-step :rules="[() => 
                    !$v.formData.keywords.$error && !$v.formData.category.$error ]" 
                    step="2" 
                    editable>
                      <!-- Specific keyword for your Quotation -->
                      Subject & Category
                      <small 
                      v-show="$v.formData.keywords.$error">Subject is required</small>
                      <small 
                      v-show="$v.formData.category.$error">Category is required</small>
                  </v-stepper-step>

                  <v-stepper-content step="2" ref="step_2">
                      <v-container>
                        <v-flex xs12>
                          <v-layout row wrap>
                            <v-flex xs5>
                              <h4>Your Subject</h4>
                              <v-text-field 
                              v-model="formData.keywords" 
                              @keyup.enter="stepUp()" 
                              :error-messages="fieldErrors('formData.keywords')" 
                              @blur="$v.formData.keywords.$touch()" 
                              label="Subject">
                              </v-text-field>
                            </v-flex>
                            <v-flex xs1>
                            </v-flex>
                            <v-flex xs5>
                              <h4>Your Chosen Category</h4>
                              <v-autocomplete 
                              v-model="formData.category" 
                              :items="categories" 
                              item-text="name"
                              item-value="id"
                              :error-messages="fieldErrors('formData.category')"
                              @blur="$v.formData.category.$touch()" 
                              :search-input.sync="search" 
                              ref="categorySelect" 
                              ache-items flat hide-no-data hide-details label="Type here the category.."
                               solo-inverted>
                              </v-autocomplete>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                      </v-container>
                      <v-btn color="primary" @click="stepUp()">next</v-btn>
                      <v-btn flat @click="stepDown()">back</v-btn>
                  </v-stepper-content>
                  <!--         <v-stepper-step step="3" :rules="[() => !$v.formData.category.$error ]" editable>
            Choose a category
            <small v-show="$v.formData.category.$error">Category is required</small>
          </v-stepper-step>
          <v-stepper-content step="3" ref="step_3" no-focus>
            <v-container>
              <v-layout row wrap>
             <v-combobox 
                v-model="formData.category" 
                :items="categories" 
                item-text="name" 
                item-value="id" 
                :error-messages="fieldErrors('formData.category')" 
                @blur="$v.formData.category.$touch()" 
                :search-input.sync="search" 
                ref="category" 
                label="Type here the category..">
                </v-combobox>
          
                  <v-layout row wrap>
                    <v-autocomplete 
                        v-model="formData.category" 
                        :items="categories" 
                        item-text="name"
                        item-value="id"
                        :error-messages="fieldErrors('formData.category')" 
                        @blur="$v.formData.category.$touch()" 
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
          
              </v-layout>
            </v-container>
            <v-btn color="primary" @click="stepUp()">next</v-btn>
            <v-btn flat @click="stepDown()">back</v-btn>
          </v-stepper-content>
           -->
                  <!-- Sub category here if there is -->
                  <v-stepper-step step="3" :rules="[() => !$v.formData.quantity.$error &&  !$v.formData.desired_price.$error ]" editable>
                    Quantity & Price
                    <small v-show="$v.formData.quantity.$error">Quantity is required.</small>
                    <small v-show="$v.formData.desired_price.$error">Preffered Price is required.</small>
                  </v-stepper-step>
                  <v-stepper-content step="3" ref="step_3">
                    <v-container>
                      <v-layout row>
                        <v-flex xs4>
                          <v-text-field 
                          v-model="formData.quantity" 
                          label="Quantity" 
                          @keyup.enter="stepUp()" 
                          :error-messages="fieldErrors('formData.quantity')" 
                          @blur="$v.formData.quantity.$touch()" 
                          :value="formData.quantity" 
                          suffix="pcs" 
                          mask="######">
                          </v-text-field>
                        </v-flex>
                        <v-flex xs1>
                        </v-flex>
                        <v-flex xs4>
                          <v-text-field 
                          class="mr-1" 
                          label="Price Per Piece" 
                          :error-messages="fieldErrors('formData.desired_price')" 
                          @blur="$v.formData.desired_price.$touch()" 
                          v-model="formData.desired_price" 
                          @keyup.enter="stepUp()" 
                          :value="formData.desired_price" 
                          suffix="USD">
                          </v-text-field>
                        </v-flex>
                      <v-flex xs1>
                        </v-flex>
                              <v-flex xs4>
                          <v-text-field 
                          class="mr-1" 
                          label="Total Price" 
                          @keyup.enter="stepUp()" 
                          :value="formData.quantity * formData.desired_price" 
                          suffix="USD">
                          </v-text-field>
                        </v-flex>

                      </v-layout>
                    </v-container>
                    <v-btn color="primary" @click="stepUp()">next</v-btn>
                    <v-btn flat @click="stepDown()">back</v-btn>
                  </v-stepper-content>
                  <!-- 
                  <v-stepper-step step="5" :rules="[() => !$v.formData.desired_price.$error ]" editable>
                    Desire/d Price
                    Target Price
                    <small v-show="$v.formData.desired_price.$error">Target Price is required</small>
                  </v-stepper-step>
                  <v-stepper-content step="5"  ref="step_5">
                    <v-container>
                      <v-layout row>
                        <v-flex xs3>
                          <v-text-field 
                          class="mr-1" label="Price Per Piece" 
                          :error-messages="fieldErrors('formData.desired_price')" 
                          @blur="$v.formData.desired_price.$touch()" 
                          v-model="formData.desired_price"
                          @keyup.enter="stepUp()"
                          :value="formData.desired_price" suffix="USD">
                          </v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-container>
                    <v-btn color="primary" @click="stepUp()">next</v-btn>
                    <v-btn flat @click="stepDown()">back</v-btn>
                  </v-stepper-content>

     -->
                  <v-stepper-step step="4" editable>
                    Specifications
                  </v-stepper-step>
                  <v-stepper-content step="4" ref="step_4">
                    <v-container>
                      <v-layout row wrap>
                        <v-flex xs6>
                          <v-layout row class="custom_digits">
                            <v-text-field 
                            label="Power" 
                            v-model="formData.power" 
                            @keyup.enter="stepUp()" 
                            :value="formData.power" 
                            suffix="watts" 
                            mask="######">
                            </v-text-field>
                          </v-layout>
                          <v-layout row class="custom_digits">
                            <v-text-field 
                            label="Lumen" 
                            v-model="formData.lumen"
                            @keyup.enter="stepUp()" 
                            :value="formData.lumen" 
                            suffix="lm" 
                            mask="######">
                            </v-text-field>
                          </v-layout>
                          <v-layout row class="custom_digits">
                            <v-text-field 
                            label="Efficiency" 
                            v-model="formData.efficiency" 
                            @keyup.enter="stepUp()" 
                            :value="formData.efficiency" 
                            suffix="lm/w" mask="######">
                            </v-text-field>
                          </v-layout>
                          <v-layout row class="custom_digits">
                            <v-text-field 
                            label="Beam Angle" 
                            v-model="formData.beam_angle" 
                            @keyup.enter="stepUp()" 
                            :value="formData.beam_angle" 
                            suffix="degrees" mask="###">
                            </v-text-field>
                          </v-layout>
                          <v-layout row wrap>
                            <v-flex xs6>
                              <h5 class="font-weight-light"> <strong> Want to include warranty ? </strong> </h5>
                              <v-radio-group v-model="is_warranty" row>
                                <v-radio label="Yes" :value="1"></v-radio>
                                <v-radio label="No" :value="0"></v-radio>
                              </v-radio-group>
                            </v-flex>
                            <v-flex xs3 mt-2 mr-3 v-show="is_warranty">
                              <v-text-field label="Warranty" v-model="formData.warranty" @keyup.enter="stepUp()" :error-messages="fieldErrors('formData.warranty')" @blur="$v.formData.warranty.$touch()" :value="formData.warranty" suffix="yr/s" mask="#">
                              </v-text-field>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                        <v-flex xs6>
                          <v-layout row class="custom_digits">
                            <v-text-field label="CCT" 
                            v-model="formData.cct" 
                            @keyup.enter="stepUp()" 
                            :value="formData.cct" 
                            suffix="lm" 
                            mask="######">
                            </v-text-field>
                          </v-layout>
                          <v-layout row class="custom_digits">
                            <v-text-field 
                            label="IP Rating" 
                            v-model="formData.ip"
                            @keyup.enter="stepUp()" 
                            :value="formData.ip" 
                            mask="######">
                            </v-text-field>
                          </v-layout>
                          <v-layout row wrap class="custom_digits">
                            <v-text-field 
                            v-model="formData.size" 
                            @keyup.enter="stepUp()" 
                            label="Size">
                            </v-text-field>
                          </v-layout>
                          <v-layout row wrap class="custom_digits">
                            <v-text-field 
                            v-model="formData.finish" 
                            @keyup.enter="stepUp()" 
                            label="Finish">
                            </v-text-field>
                          </v-layout>
                          <v-layout row wrap class="">
                            <v-flex xs3>
                              <v-switch 
                              color="black" 
                              v-model="formData.dimmable" 
                              label="Non-Dim"
                               value="Non-Dim"
                               ></v-switch>
                            </v-flex>
                            <v-flex xs3>
                              <v-switch 
                              color="black" 
                              v-model="formData.dimmable" 
                              label="TRIAC" 
                              value="TRIAC">
                              </v-switch>
                            </v-flex>
                            <v-flex xs3>
                              <v-switch 
                              color="black" 
                              v-model="formData.dimmable" 
                              label="0-10V" 
                              value="0-10V">
                              </v-switch>
                            </v-flex>
                            <v-flex xs3>
                              <v-switch 
                              color="black" 
                              v-model="formData.dimmable"
                              label="DALI" 
                              value="DALI">
                              </v-switch>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                      </v-layout>
                    </v-container>
                    <v-btn color="primary" @click="stepUp()">next</v-btn>
                    <v-btn flat @click="stepDown()">back</v-btn>
                  </v-stepper-content>
                  <!--    <v-stepper-step step="5" editable>
                 Desire/d Price
                 Total Price
             </v-stepper-step>
             <v-stepper-content step="5" ref="step_5">
                 <v-container>
                     <v-layout row>
                         <v-flex xs3>
                             <v-text-field hint="Target Price Per Unit" v-model="formData.desired_price" @keyup.enter="stepUp()" :value="formData.desired_price" suffix="USD">
                             </v-text-field>
                         </v-flex>
                     </v-layout>
                 </v-container>
                 <v-btn color="primary" @click="stepUp()">next</v-btn>
                 <v-btn flat @click="stepDown()">back</v-btn>
             </v-stepper-content>
              -->
                  <!--       <v-stepper-step step="7" editable>
                        Preferred Shipment Date
                    </v-stepper-step>
                    <v-stepper-content step="7" ref="step_7"  no-focus>
                        <v-container>
                            <v-layout row>

                                <v-menu v-model="calendar_menu" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">

                                    <v-text-field slot="activator" v-model="formData.shipping_date" label="Shipment Date" prepend-icon="event" readonly></v-text-field>
                                    <v-date-picker v-model="formData.shipping_date" header-color="black" :min="minDate" @input="calendar_menu = false">

                                    </v-date-picker>

                                </v-menu>

                            </v-layout>
                        </v-container>
                        <v-btn color="primary" @click="stepUp()">next</v-btn>
                        <v-btn flat @click="stepDown()">back</v-btn>
                    </v-stepper-content> -->
                  <!--             <v-stepper-step step="8" editable>
                        Payment Method
                    </v-stepper-step>
                    <v-stepper-content step="8" ref="step_8" no-focus>
                        <v-container>
                            <v-layout row wrap>
                                <v-flex xs4 v-for="(payment_method, index) in payment_methods" :key="`pm-${index}`">
                                    <v-switch color="black" v-model="formData.payment_method" :label="payment_method.name" :value="payment_method.id"></v-switch>
                                </v-flex>
                            </v-layout>
                        </v-container>
                        <v-btn color="primary" @click="stepUp()">next</v-btn>
                        <v-btn flat @click="stepDown()">back</v-btn>
                    </v-stepper-content> -->
                  <!--         <v-stepper-step step="9" editable>
                        Shipping Method
                    </v-stepper-step>
                    <v-stepper-content step="9" ref="step_9" no-focus>
                        <v-container>
                            <v-layout row wrap>

                                <v-flex xs4 v-for="(shipping_method, index) in shipping_methods" :key="`sm-${index}`">
                                    <v-switch color="black" v-model="formData.shipping_method" :label="shipping_method.name" :value="shipping_method.id"></v-switch>
                                </v-flex>                        

                            </v-layout>
                        </v-container>
                        <v-btn color="primary" @click="stepUp()">next</v-btn>
                        <v-btn flat @click="stepDown()">back</v-btn>
                    </v-stepper-content> -->
                  <v-stepper-step :rules="[() => !$v.formData.sample_quantity.$error && !$v.formData.sample_shipping_address.$error && !$v.formData.sample_shipping_country_id.$error && !$v.formData.sample_shipping_city.$error ]" step="5" editable>
                    Request Sample Order
                    <small v-show="$v.formData.sample_quantity.$error">Quantity is required</small>
                    <small v-show="$v.formData.sample_shipping_address.$error">Address is required</small>
                    <small v-show="$v.formData.sample_shipping_country_id.$error">Country is required</small>
                    <small v-show="$v.formData.sample_shipping_city.$error">City is required</small>
                  </v-stepper-step>
                  <v-stepper-content step="5" ref="step_5" no-focus>
                    <v-container>
                      <v-layout row wrap>


                        <v-flex xs6>
                          <!-- <v-text-field v-model="formData.street" @keyup.enter="stepUp()" label="Street Name/No.">  </v-text-field>  -->
                          <h3 class="font-weight-light">Do you want to purchase a sample order ?</h3>
                          <v-radio-group v-model="is_sample" row>
                            <v-radio label="Yes" :value="1"></v-radio>
                            <v-radio label="No" :value="0"></v-radio>
                          </v-radio-group>
                        </v-flex>

                        <v-flex xs6 v-show="is_sample">
                           <h3 class="font-weight-light">Enter your desired quantity.</h3>
                          <v-layout row wrap>
                            <v-flex xs7 class="custom_digits">
                              <v-text-field 
                              v-model="formData.sample_quantity" 
                              @keyup.enter="stepUp()" 
                              :error-messages="fieldErrors('formData.sample_quantity')" 
                              @blur="$v.formData.sample_quantity.$touch()" 
                              label="Quantity" 
                              hint="Note: Quantity can't be change later on. so please be accurate.">
                              </v-text-field>
                            </v-flex>
                          </v-layout>

                          <h3 class="mt-2 font-weight-light">Specify your shipping Address for sample order's.</h3>
                          <v-layout row wrap>
                            <v-flex xs6 pa-1>
                              <v-select 
                              v-model="formData.sample_shipping_country_id" 
                              :items="countries" 
                              item-text="name" 
                              item-value="id" 
                              :error-messages="fieldErrors('formData.sample_shipping_country_id')" 
                              @blur="$v.formData.sample_shipping_country_id.$touch()" 
                              :search-input.sync="search" 
                              ref="countrySampleCountry" 
                              label="Countries">
                              </v-select>
                            </v-flex>
                            <v-flex xs6 pa-1>
                              <v-text-field 
                              v-model="formData.sample_shipping_address" 
                              @keyup.enter="stepUp()" 
                              :error-messages="fieldErrors('formData.sample_shipping_address')" 
                              @blur="$v.formData.sample_shipping_address.$touch()" 
                              label="Street Name/No.">
                              </v-text-field>
                            </v-flex>
                            <v-flex xs6 pa-1>
                              <v-text-field 
                              v-model="formData.sample_shipping_city" 
                              :error-messages="fieldErrors('formData.sample_shipping_city')"
                               @blur="$v.formData.sample_shipping_city.$touch()" 
                               @keyup.enter="stepUp()"
                                label="City">
                              </v-text-field>
                            </v-flex>
                            <v-flex xs6 pa-1>
                              <v-text-field 
                              v-model="formData.sample_shipping_postal" 
                              @keyup.enter="stepUp()" 
                              label="State">
                              </v-text-field>
                            </v-flex>
                          </v-layout>
                        </v-flex>


                      </v-layout>
                    </v-container>
                    <v-btn color="primary" @click="stepUp()">next</v-btn>
                    <v-btn flat @click="stepDown()">back</v-btn>
                  </v-stepper-content>
                  <v-stepper-step step="6" :rules="[() => !$v.formData.oem_service.$error && !$v.formData.oem_description.$error ]" editable>
                    Original Equipment Manufacturer (OEM)
                  </v-stepper-step>
                  <v-stepper-content step="6" ref="step_6" no-focus>
                    <v-container>
                      <v-layout row wrap>

                        <v-flex xs4>
                          <h3 class="font-weight-light">Do you require OEM ?</h3>
                          <v-radio-group v-model="is_oem" row>
                            <v-radio label="Yes" :value="1"></v-radio>
                            <v-radio label="No" :value="0"></v-radio>
                          </v-radio-group>
                        </v-flex>
                          
                          <v-flex xs7>

                        <v-layout row wrap v-show="is_oem">
                                <h3 class="font-weight-light">Please be accurate as possible.</h3>

                                  <v-flex xs12 class="custom_digits" >
                              <v-text-field 
                              v-model="formData.oem_service" 
                              @keyup.enter="stepUp()" 
                              :error-messages="fieldErrors('formData.oem_service')" 
                              @blur="$v.formData.oem_service.$touch()" 
                              label="What kind of Original Equipment Manufacturer (OEM) Service ?">
                              </v-text-field>
                          </v-flex>
                          <v-flex xs12 class="custom_digits" >
                              <v-textarea 
                              label="Description" 
                              :error-messages="fieldErrors('formData.oem_description')" 
                              @blur="$v.formData.oem_description.$touch()" 
                              v-model="formData.oem_description">
                              </v-textarea>
                          </v-flex>
                          <v-flex xs12 >
                            <vue-dropzone id="dropzone-oem" :options="dropzoneOptions" :useCustomSlot=true>
                              <div class="dropzone-custom-content">
                                <h3 class="dropzone-custom-title">Drag and drop to upload Logo's and Label</h3>
                                <div class="subtitle">...or click to select a file from your computer</div>
                              </div>
                            </vue-dropzone>
                          </v-flex>
                        </v-layout>
                            </v-flex>

                       



                      </v-layout>
                    </v-container>
                    <v-btn color="primary" @click="stepUp()">next</v-btn>
                    <v-btn flat @click="stepDown()">back</v-btn>
                  </v-stepper-content>
                  <v-stepper-step step="7" :rules="[() => !$v.formData.shipping_country_id.$error && !$v.formData.shipping_address.$error && !$v.formData.shipping_city.$error  ]" editable>
                    Your Mass Shipping Address
                    <small v-show="$v.formData.shipping_address.$error">Address is required</small>
                    <small v-show="$v.formData.shipping_address.$error">Country is required</small>
                    <small v-show="$v.formData.shipping_city.$error">City is required</small>
                  </v-stepper-step>
                  <v-stepper-content step="7" ref="step_7" no-focus>
                    <v-container>
                      <v-layout row wrap>
                        <v-flex xs5 ml-2>
                          <v-select 
                          v-model="formData.shipping_country_id" 
                          :items="countries" 
                          item-text="name" item-value="id" 
                          :error-messages="fieldErrors('formData.shipping_country_id')" 
                          @blur="$v.formData.shipping_country_id.$touch()" 
                          :search-input.sync="search" 
                          ref="countryMassShipping" 
                          label="Countries">
                          </v-select>
                        </v-flex>
                        <v-flex xs5 ml-2>
                          <v-text-field 
                          v-model="formData.shipping_address" 
                          @keyup.enter="stepUp()" 
                          :error-messages="fieldErrors('formData.shipping_address')" 
                          @blur="$v.formData.shipping_address.$touch()" 
                          label="Street Address">
                          </v-text-field>
                        </v-flex>
                        <v-flex xs5 ml-2>
                          <v-text-field 
                          v-model="formData.shipping_city" 
                          :error-messages="fieldErrors('formData.shipping_city')" 
                          @blur="$v.formData.shipping_city.$touch()" 
                          @keyup.enter="stepUp()" 
                          label="City">
                          </v-text-field>
                        </v-flex>
                        <v-flex xs5 ml-2>
                          <v-text-field 
                          v-model="formData.shipping_postal"
                           @keyup.enter="stepUp()" 
                           label="Zip/Postal Code">
                          </v-text-field>
                        </v-flex>
                      </v-layout>
                      <!-- SSSS -->
                     <!--  <v-layout row wrap>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="">Add New</v-btn>
                      </v-layout> -->
                      <!-- SSSS -->
                    </v-container>
                    <v-btn color="primary" @click="stepUp()">next</v-btn>
                    <v-btn flat @click="stepDown()">back</v-btn>
                  </v-stepper-content>

                  <v-stepper-step step="8" editable>
                    Files to attach
                  </v-stepper-step>
                  <v-stepper-content step="8" ref="step_8">
                    <v-container>
                      <v-layout row class="">
                        <v-flex xs12>
                          <vue-dropzone id="dropzone" :options="dropzoneOptions" :useCustomSlot=true>
                            <div class="dropzone-custom-content">
                              <h3 class="dropzone-custom-title">Drag and drop to upload images and other supporting documents for your inquiry!</h3>
                              <div class="subtitle">...or click to select a file from your computer</div>
                            </div>
                          </vue-dropzone>
                        </v-flex>
                      </v-layout>
                    </v-container>
                    <v-btn color="primary" @click="stepUp()">next</v-btn>
                    <v-btn flat @click="stepDown()">back</v-btn>
                  </v-stepper-content>

                  <v-stepper-step step="9" :rules="[() => !$v.formData.message.$error ]" editable>
                    Additional Details
                    <small v-show="$v.formData.message.$error">Additional details is required</small>
                  </v-stepper-step>
                  <v-stepper-content step="9" ref="step_9">
                    <v-container>
                      <v-layout row>
                        <v-textarea label="Type message here.." v-model="formData.message" :error-messages="fieldErrors('formData.message')" @blur="$v.formData.message.$touch()">
                        </v-textarea>
                      </v-layout>
                    </v-container>
                    <!-- <v-btn color="primary" @click="submitForm()">SUBMIT</v-btn> -->
                    <v-btn flat @click="stepDown()">back</v-btn>
                  </v-stepper-content>
                </v-stepper>
                <!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
                <!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
                <!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
              </v-form>
            
        
              
            
                </v-card>
            </v-flex>


            <v-flex xs4>    
                    <v-card style="position: absolute; margin-left: 50px; margin-right: 50px; padding-bottom: 30px;"  color="white" class="pa-3">
                        <v-card-text>

                            <v-layout row wrap justify-center>
                                <!-- <h2 class="text-xs-center">Inquiry Preview</h2> -->
                                <h2 class="grey--text lighten-5">Inquiry Preview </h2>
                            </v-layout>


                            <v-layout row wrap style="width: 475px;" >

                                <!-- <h1 class="grey--text lighten-5 mt-3">No Preview </h1> -->

                            </v-layout>


                            <v-layout row wrap mt-3>

                                <!-- subject and category -->

                                <v-flex xs6 v-show="formData.keywords">
                                    <h4>Subject:</h4>
                                    <small  v-html="formData.keywords" ></small>
                                </v-flex>

                                <v-flex xs6 v-show="formData.category">
                                    <h4>Category: </h4>
                                    <small v-html="formData.category"></small>
                                </v-flex>

                                <!-- price and quantity -->
                                <v-flex xs12 mt-3>

                                    <v-layout row wrap>

                                        <v-flex xs4 v-show="formData.quantity">
                                            <h4>Quantity</h4>
                                            <small v-html="formData.quantity"></small>
                                        </v-flex>

                                        <v-flex xs4 v-show="formData.desired_price">
                                            <h4>Price per unit</h4>
                                            <small v-html="formData.desired_price"></small>
                                        </v-flex>

                                        <v-flex xs4 v-show="formData.quantity && formData.desired_price">
                                            <h4>Total Price</h4>
                                            <small v-html="formData.quantity * formData.desired_price"></small>
                                        </v-flex>

                                    </v-layout>
                                </v-flex>

                                <!-- specifications -->
                                <v-flex xs12>

                                     <div class="mt-3" v-show="formData.power || formData.lumen || formData.efficiency || formData.beam_angle || formData.cct ||  formData.ip || formData.finish || formData.size || formData.dimmable || formData.warranty ">
                                        <h4>Spefications: </h4>
                                    </div>
                                    
                                    <v-layout row wrap>

                                        <v-flex xs3 v-show="formData.power">
                                            <small>Power: <span v-html="formData.power"> </span></small>
                                        </v-flex>

                                        <v-flex xs3 v-show="formData.lumen">
                                            <small>Lumen: <span v-html="formData.lumen"></span></small>  
                                        </v-flex>

                                        <v-flex xs3 v-show="formData.efficiency">
                                            <small>Efficiency: <span v-html="formData.efficiency"></span> </small>  
                                        </v-flex>

                                        <v-flex xs3 v-show="formData.beam_angle">
                                            <small>Beam Angle: <span v-html="formData.beam_angle"></span> </small>
                                        </v-flex>

                                        <v-flex xs3 v-show="formData.cct">
                                            <small>CCT: <span v-html="formData.cct"> </span> </small>
                                        </v-flex>

                                        <v-flex xs3 v-show="formData.ip">
                                            <small>IP: <span v-html="formData.ip"></span> </small>      
                                        </v-flex>

                                        <v-flex xs3 v-show="formData.finish">
                                            <small>Finish: <span v-html="formData.finish"></span> </small>      
                                        </v-flex>

                                        <v-flex xs3 v-show="formData.size">
                                            <small>Size: <span v-html="formData.size"></span> </small>      
                                        </v-flex>

                                        <v-flex xs3 v-show="formData.dimmable">
                                            <small>Dimmable: <span v-html="formData.dimmable"></span> </small>      
                                        </v-flex>

                                        <v-flex xs3 v-show="formData.warranty">
                                            <small>Warranty: <span v-html="formData.warranty"></span> </small>      
                                        </v-flex>
                                      
                                    </v-layout>
 
                                </v-flex>

                                <!-- Sample Order -->

                                <v-flex xs12 v-show="is_sample" >

                                    <div class="mt-3">
                                        <h4>Sample Order Data</h4>
                                    </div>

                                    <h5 v-show="formData.sample_quantity">Quantity</h5>
                                    <small v-html="formData.sample_quantity"></small>

                                    <h5 v-show="formData.sample_shipping_address || formData.sample_shipping_city|| formData.sample_shipping_country_id">Sample Cost Shipping Address</h5>
                                    <small v-html="formData.sample_shipping_country_id +', '+ formData.sample_shipping_address +','+ formData.sample_shipping_city "></small>

                                </v-flex>

                                <v-flex xs12 v-show="is_oem">

                                    <div class="mt-3">
                                        <h4>Original Equipment Manufacturer (OEM)</h4>
                                    </div>

                                    <div class="mt-3">

                                        <h5 v-show="formData.oem_service">What kind of OEM ?</h5>
                                        <small v-html="formData.oem_service"></small>

                                        <h5 v-show="formData.oem_description">Describe what you need and want to happen ?</h5>
                                        <small v-html="formData.oem_description">LED Downlights</small>

                                    </div>

                                </v-flex>

                                <v-flex xs12 v-show="formData.shipping_address || formData.shipping_country_id || formData.shipping_city">

                                    <div class="mt-3">
                                        <h4>Shipping Address</h4>
                                    </div>

                                    <small v-html="formData.shipping_country_id +', '+  formData.shipping_address +', '+ formData.shipping_city + formData.shipping_postal"></small>

                                </v-flex>

                                <v-flex xs12 v-show="formData.message">

                                    <div class="mt-3">
                                        <h4>Additional Details</h4>
                                    </div>

                                    <small v-html="formData.message"></small>

                                </v-flex>
                            </v-layout>




                        </v-card-text>
                    </v-card>
            </v-flex>

            </v-layout>
        </v-card-text>

        <v-divider></v-divider>
        <v-card-actions>
          <v-layout align-center justify-space-between row fill-height wrap>
            <v-flex xs12 sm6>
              <v-layout class="ma-3">
                <v-btn color="primary" @click="$emit('update:dialog', false)">
                  close
                </v-btn>
                <v-btn color="error" @click="clearForm()">
                  clear
                </v-btn>
              </v-layout>
            </v-flex>
            <v-flex xs12 sm6>
              <v-layout align-center justify-end row fill-height class="ma-3">
                <v-btn color="success" @click="submitForm()" :loading="formLoading">
                  submit
                </v-btn>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <inquiry-lookup-dialog :inquirylookup.sync="inquirylookup"> </inquiry-lookup-dialog>
  </div>
</template>
<script>

import axios from 'axios';

import inqEvntBs from "@/bus/inquiry"
import helpers from "@/mixins/helpers"
import config from '@/config/index'

import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import vue2Dropzone from 'vue2-dropzone'

import { required, email, maxLength, requiredIf, requiredUnless } from 'vuelidate/lib/validators'
import validationMixin from '@/mixins/validationMixin'

import InquiryLookupDialog from '@/views/Components/App/Buyer/inquirylookup'

export default {

  mixins: [
    helpers,
    validationMixin
  ],


  validations: {

    formData: {

      keywords: {
        required
      },

      category: {
        required
      },

      quantity: {
        required
      },

      desired_price: {
        required
      },

      message: {
        required
      },

      warranty: {

        required: requiredIf(function() {
          if (this.is_warranty == 1) {
            return true;
          }
        })
      },

      sample_quantity: {

        required: requiredIf(function() {
          if (this.is_sample == 1) {
            return true;
          }
        })

      },

    // optional /*state: zipcode:*/

    sample_shipping_address: {
      required: requiredIf(function() {
        if (this.is_sample == 1) {
          return true;
        }
      })
    },

    sample_shipping_country_id: {
      required: requiredIf(function() {
        if (this.is_sample == 1) {
          return true;
        }
      })
    },

    sample_shipping_city: {
      required: requiredIf(function() {
        if (this.is_sample == 1) {
          return true;
        }
      })
    },

    oem_service: {

        required: requiredIf(function() {
          if (this.is_oem == 1) {
            return true;
          }
        })
    },

    oem_description: {

        required: requiredIf(function() {
          if (this.is_oem == 1) {
            return true;
          }
        })

    },

      shipping_address: { 
        required 
     },
      shipping_country_id: { 
        required 
     },
      shipping_city: { 
        required 
    },
    
    }
  },

  validationMessages: {

    formData: {

      keywords: { required: 'Please enter an Subject' },
      category: { required: 'Please enter an category.' },
      quantity: { required: 'Please enter an Quantity.' },
      desired_price: { required: 'Please enter your Preferred Price.' },
      message: { required: 'Please enter an Additional Details.' },
      warranty: { required: 'Please enter a Warranty' },

      sample_quantity: { required: 'Please enter an Quantity of an Sample' },
      sample_shipping_address: { required: 'Please enter a Address' },
      sample_shipping_country_id: { required: 'Please enter a Country' },
      sample_shipping_city: { required: 'Please enter a city' },

      oem_service: {  
        required:  'Please enter an OEM service.' 
      },
      oem_description: {
        required: 'Please enter an OEM Description ' 
      },
      shipping_address: { required: 'Please enter an Address.' },
      shipping_country_id: { required: 'Please enter a Country.' },
    shipping_city: { required: 'Please enter City.' },
      
    }
  },

  props: {

    dialog: {
      type: Boolean,
      default: false,
    },

    isEdit: {
      type: Boolean,
      default: false
    },

    isNew: {
      type: Boolean,
      default: false
    },

    inquiry: {
      type: Object
    }

  },

  data() {
    return {

      cnt: 0,
      stepCnt: 1,

     formData: {

        keywords: null,
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
        dimmable: null,
        quantity: null,
        desired_price: null,
        shipping_date: null,
        payment_method: null,
        message: null,
        oem: null,
        oem_service: null,
        oem_description: null,
        sample_quantity: null,
        sample_shipping_address: null,
        sample_shipping_city: null,
        sample_shipping_country_id: null,
        sample_shipping_postal: null,
        shipping_address: null,
        shipping_country_id: null,
        shipping_city: null,
        shipping_postal: null
       
      },

      shipping_methods: config.main.shipping_methods,
      payment_methods: config.main.payment_methods,
      search: null,
      select: null,
      categories: [],
      minDate: null,
      reviewDialog: false,
      dimmables: null,
      formLoading: false,
      calendar_menu: false,
      countries: [],

      // new update 
      is_sample: 0,
      is_oem: 0,
      is_warranty: 0,
      snackbar: false,
      subject_error: false,
      inquirylookup:false,

      /* -------------------------- dropzone -------------------------- */

      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        thumbnailWidth: 200,
        maxFilesize: 0.5,
        headers: { "My-Awesome-Header": "header value" },
        addRemoveLinks: true,
        dictDefaultMessage: "<i class='fa fa-cloud-upload'></i>UPLOAD ME"
      }

      /*  --------------------------  end of dropzone  --------------------------  */

    }
  },

  components: {
    vueDropzone: vue2Dropzone,
    InquiryLookupDialog
  },

  created: function() {


    // for shipping_date field
    this.formData.shipping_date = this.getDateTime();
    this.minDate = this.formData.shipping_date;

    // -----------------------GET CATEGORIES-------------------------------------


    this.$store.dispatch('cat/getCategories_a')
      .then((data) => {
        this.categories = data;
      })
      .catch((e) => {
        console.log('Error: ');
        console.log(e);
      });


    // -----------------------GET COUNTRY-------------------------------------

    // this.$store.dispatch(this.getCountries_a())
    //   .then((response) => {
    //     this.countries = response
    //   })
    //   .catch((e) => {
    //     console.log('Error: ')
    //     console.log(e);
    //   });


          axios({
            method: 'GET',
            url: 'http://192.168.1.200:8000/v1/countries'
          })
          .then(response => {
            this.countries = response.data;
          })
          .catch(error => {
            reject(error);
          })

  },

  watch: {

    search(val) {
      // return val && val !== this.select && this.querySelections(val)
      return val && val !== this.select
    },

    stepCnt(val) {

      // console.log("step_"+val);
      if (val > 1) {
        // remove focus on fields to prevent auto select or display issues, just add no-focus
        if (typeof this.$refs["step_" + val].$attrs['no-focus'] == "undefined") {
          if (this.$refs["step_" + val].$el.querySelector('input') != null) {
            this.$refs["step_" + val].$el.querySelector('input').focus();
          } else if (this.$refs["step_" + val].$el.querySelector('textarea') != null) {
            this.$refs["step_" + val].$el.querySelector('textarea').focus();
          }

        }
      }
    },

    inquiry() {

       this.fillFormData();

    },

    dialog(nVal, oVal) {
        if(!nVal) {
           // this.$emit('update:isEdit', false);
            this.$emit('update:isEdit', false)

        }
    },

    isEdit(nVal, oVal) {
      if(!nVal) {
        this.$emit('update:isEdit', false)
      }
    },

    deep: true

  },

  methods: {

    /* use for editing or updating the inquiry
     when it's rejected from the verificator */

    fillFormData() {

            console.log(this.inquiry.categories)

            this.formData.keywords = this.inquiry.keyword
            this.formData.category = this.inquiry.categories.join(', ') 
            this.formData.warranty = this.inquiry.warranty

            this.formData.quantity = this.inquiry.quantity
            this.formData.desired_price = this.inquiry.desired_price

            this.formData.shipping_date = this.inquiry.desired_shipping_date
            this.formData.payment_method = this.inquiry.payment_method_id
            this.formData.message = this.inquiry.message

            // loop spefications
            this.formData.power = this.getSpefications('Power')
            this.formData.lumen = this.getSpefications('Lumen')
            this.formData.efficiency = this.getSpefications('Efficiency')
            this.formData.beam_angle = this.getSpefications('Beam Angle');
            this.formData.cct = this.getSpefications('CCT')
            this.formData.ip = this.getSpefications('IP')
            this.formData.finish = this.getSpefications('Finish')
            this.formData.size = this.getSpefications('Size')
            this.formData.dimmable = this.getSpefications('Dimmable')

            console.log(this.formData.category)


            // this.formData.oem_service = this.inquiry.keyword
            // this.formData.oem_description = this.inquiry.keyword
            // this.formData.sample_quantity = this.inquiry.keyword
            // this.formData.shipping_of_sample.address = this.inquiry.keyword
            // this.formData.shipping_of_sample.country = this.inquiry.keyword
            // this.formData.shipping_of_sample.city = this.inquiry.keyword
            // this.formData.shipping_of_sample.state = this.inquiry.keyword
            // this.formData.shipping_of_sample.zipcode= this.inquiry.keyword
            // this.formData.shipping_of_mass.address = this.inquiry.keyword
            // this.formData.shipping_of_mass.country = this.inquiry.keyword
            // this.formData.shipping_of_mass.city = this.inquiry.keyword
            // this.formData.shipping_of_mass.state = this.inquiry.keyword
            // this.formData.shipping_of_mass.zipcode = this.inquiry.keyword

      },


    getSpefications(key) {
      var objectHolder = this.inquiry.specifications.find( specifications => specifications.name === key)
      console.log(objectHolder.name +'='+ objectHolder.value)
      return objectHolder.value;
    },

    clearForm() {

      this.formData.keywords = null;
      this.formData.category = null;
      this.formData.warranty = null;
      this.formData.power = null;
      this.formData.lumen = null;
      this.formData.efficiency = null;
      this.formData.beam_angle = null;
      this.formData.cct = null;
      this.formData.ip = null;
      this.formData.finish = null;
      this.formData.size = null;
      this.formData.dimmable = null;
      this.formData.quantity = null;
      this.formData.desired_price = null;
      this.formData.shipping_date = this.getDateTime();
      this.formData.shipment_method = null;
      this.formData.payment_method = null;
      this.formData.message = null;
      this.stepCnt = 1;


      let options = {
        container: '#inquiryCreate_scrollable_cont',
        easing: 'ease-in',
        offset: -60,
        force: true,
        cancelable: true,
        onStart: function(element) {
          // scrolling started
        },
        onDone: function(element) {
          // scrolling is done
        },
        onCancel: function() {
          // scrolling has been interrupted
        },
        x: false,
        y: true
      }
      this.$scrollTo('.step_1', 500, options);

    },

    stepUp: function(val = 1) {
      // console.log("stepCnt = "+this.stepCnt);
      // console.log("val = "+val);
      this.stepCnt = parseInt(this.stepCnt) + parseInt(val);
      // this.stepCnt += val;
    },
    stepDown: function(val = 1) {
      this.stepCnt = parseInt(this.stepCnt) - parseInt(val);
      // this.stepCnt -= val;
    },

    submitForm: function() {

      var formData = {

        "subject": " ",
        "keyword": this.formData.keywords,
        "warranty": this.formData.warranty ? this.formData.warranty : 0,
        "quantity": this.formData.quantity,
        "desired_price": this.formData.desired_price,
        "desired_shipping_date": this.formData.shipping_date,
        "message": this.formData.message,

        "oem": this.is_oem,
        "oem_service": this.formData.oem_service,
        "oem_description": this.formData.oem_description,
        "sample_quantity": this.formData.sample_quantity,
        "sample_shipping_address": this.formData.sample_shipping_address,
        "sample_shipping_city": this.formData.sample_shipping_city,
        "sample_shipping_country_id": this.formData.sample_shipping_country_id,
        "sample_shipping_postal": this.formData.shipping_postal,
        "shipping_address": this.formData.shipping_address,
        "shipping_country_id": this.formData.shipping_country_id,
        "shipping_city": this.formData.shipping_city,
        "shipping_postal": this.formData.shipping_postal,

        "shipping_method_id": 1,
        "payment_method_id": 1,
        "message": this.formData.message,
        "categories": [
          this.formData.category
        ],
        "attachments": [
          "cdn link here later later 1",
          "cdn link here later later 2"
        ],
        "specifications": {
          power: !this.formData.power ? '00' : this.formData.power,
          lumen: !this.formData.lumen ? '00' : this.formData.lumen,
          efficiency: !this.formData.efficiency ? '00' : this.formData.efficiency,
          beam_angle: !this.formData.beam_angle ? '00' : this.formData.beam_angle,
          cct: !this.formData.cct ? '00' : this.formData.cct,
          ip: !this.formData.ip ? '00' : this.formData.ip,
          finish: !this.formData.finish ? '00' : this.formData.finish,
          size: !this.formData.size ? '00' : this.formData.size,
          dimmable: !this.formData.dimmable ? '00' : this.formData.dimmable,
        },
        "sample_quantity": this.formData.sample_quantity,
        "shipping_of_sample": this.formData.shipping_of_sample,
        "shipping_of_mass": this.formData.shipping_of_mass,
        "oem_service": this.formData.oem_service,
        "oem_description": this.formData.oem_description
      }

      // console.log(this.formData);
      // console.log('--------------------------')
      // console.log(formData);

      if (this.$v.$invalid) {

        this.$v.$touch()

      } else {

        this.formLoading = true;
        this.$store.dispatch('byrInq/addInquiry_a', {
            formData: formData,
          })
          .then((response) => {
            this.formLoading = false;
            this.$emit('update:dialog', false);

            // emit on bus that Inquiry form is submitted
            inqEvntBs.emitFormSubmitted();

          }).catch((e) => {
            this.formLoading = false;
            console.log('Error: ' + e);
          }).finally(() => {
            this.formLoading = false;
          });

      }

    },

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
  // background-color: #000 !important;
}

.stepperBlack {
  background-color: #000 !important;
  border-color: #000 !important;
}

</style>
<style lang="scss">
.dropzone-custom-content {
  // position: absolute;
  // top: 50%;
  // left: 50%;
  // transform: translate(-50%, -50%);
  text-align: center;
}

.dropzone-custom-title {
  margin-top: 0;
  color: #00b782;
}

.subtitle {
  color: #314b5f;
}



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


.custom_digits {
  width: 290px;

  input {
    // text-align: right;
  }
}



.stepperClass .v-stepper__step__step {
  background-color: #000000 !important;
}

.theme--light.v-stepper .v-stepper__step:not(.v-stepper__step--active):not(.v-stepper__step--complete):not(.v-stepper__step--error) .v-stepper__step__step {
  background: rgba(0, 0, 0, 0.15) !important;
}


.v-menu__content .primary--text {
  color: #d4d4d4 !important;
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
