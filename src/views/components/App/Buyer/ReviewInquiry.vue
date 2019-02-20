<template>
<div class="text-xs-center">

    <v-dialog :value="dialog" 
        @input="$emit('update:dialog', false)" 
        scrollable 
        max-width="80%">

        <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>
                Review Inquiry Data
            </v-card-title>

            <v-card-text>


            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" flat @click="$emit('update:dialog', false)">
                    I accept
                </v-btn>
            </v-card-actions>
        </v-card>

    </v-dialog>

</div>
</template>

<script>
  export default {    
    props: {
        dialog: {
            type: Boolean,
            default: false,            
        },
        formData: {
            type: Object,
        }
    },

    data: function(){
        return {

        }
    },
  }

</script>