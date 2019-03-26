<template>
  <div>
    <v-dialog :value="openSampleDialog" @input="$emit('update:openSampleDialog',false)" width="1200px">
      <v-layout row wrap v-show="isEditAddress">
        <v-spacer></v-spacer>
        <v-btn icon @click="isEditAddress=false">
          <v-icon>close</v-icon>
        </v-btn>
      </v-layout>
      <v-slide-x-transition>
        <v-layout row wrap pa-2 v-show="isEditAddress">
          <v-flex xs5 ml-2>
            <v-select ref="countryMassShipping" label="Countries">
            </v-select>
          </v-flex>
          <v-flex xs5 ml-2>
            <v-text-field label="Street Address">
            </v-text-field>
          </v-flex>
          <v-flex xs5 ml-2>
            <v-text-field label="City">
            </v-text-field>
          </v-flex>
          <v-flex xs5 ml-2>
            <v-text-field label="Zip/Postal Code">
            </v-text-field>
          </v-flex>
          <v-flex xs12 ml-2>
            <v-btn flat small class=" green darken-2">
              <i class="ml-1 font-weight-light far fa-plus white--text"></i>
              <span class="ml-1 white--text font-weight-light">Save</span>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-slide-x-transition>
    </v-dialog>
  </div>
</template>
<script>
</script>
