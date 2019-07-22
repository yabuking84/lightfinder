<template>
<span>


<v-btn 
@click.stop="dialog=true"
color="black" 
style="height:40px; border: 1px solid #fff !important;"
class="white--text">
	<v-icon class="mr-2">fas fa-plus-circle</v-icon>
	Create Project Inquiry
</v-btn>   

<v-dialog v-model="dialog" width="800px">
    <v-card>
        <v-card-title class="headline black white--text py-2" primary-title>
        	<v-layout row wrap justify-space-between align-center>
            	<span>Create Project Inquiry</span>
            	<v-btn 
            	@click="dialog=false"
            	fab small class="black white--text">
            		<v-icon>fas fa-close</v-icon>
            	</v-btn>
        	</v-layout>
        </v-card-title>

        <v-card-text>

		  	<v-form>
		    <v-container>
		    <v-layout row wrap>

				<v-flex xs6>				  
	        		<v-text-field 
	        		v-model="formData.project_name"
					:error-messages="fieldErrors('formData.project_name')" 
	        		label="Project Name"></v-text-field>
				</v-flex>

				<v-flex xs6>				  
	        		<v-text-field
	        		v-model="formData.target_budget"
					:error-messages="fieldErrors('formData.target_budget')" 
	        		prefix="$"
	        		label="Target Budget"></v-text-field>
				</v-flex>

				<v-flex xs6>
			       	<v-select
	        		v-model="formData.project_type"
	        		label="Project Type"
			        :items="['House','Villa','Others']"></v-select>

	        		<v-text-field
	        		v-show="formData.project_type=='Others'"
	        		v-model="formData.project_type_others"
	        		label="Other Project Type"></v-text-field>
				</v-flex>

				<v-flex xs6>
			       	<v-select
	        		v-model="formData.shipping_method"
	        		label="Shipping Method"
			        :items="['Air','Sea']"></v-select>
				</v-flex>


				<v-flex xs12>
			        <v-textarea outline
			        v-model="formData.description"
			        label="Description"></v-textarea>
				</v-flex>


        	</v-layout>
        	</v-container>
        	</v-form>

        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn 
            class="black white--text" 
            :loading="btnLdng"
            @click="submitForm()">
                submit
            </v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>


</span>
</template>


<script>
import validationMixin from '@/mixins/validationMixin'
import { required, decimal } from 'vuelidate/lib/validators'

export default {

	mixins:[
		validationMixin,
	],

		
	validations: {
		formData: {
			project_name: { required, },
			target_budget: { decimal, },
		},
	},

	validationMessages: {
		formData: {
			project_name: { required: 'Project name required.', },
			target_budget: { decimal: 'Numbers only please.', },
		},
	},


	data() { return {

		dialog: false,

		btnLdng: false,

		formData :{
			project_name: null,
			project_type: null,
			project_type_others: null,
			target_budget: null,
			shipping_method: null,
			description: null,
		},

	}},


	watch:{
		'formData.project_type': {
			handler(nVal,oVal){
				if(nVal!='Others')
				this.formData.project_type_others = null;
			},
		},
	},



	methods: {
		submitForm(){
			this.$v.$touch();

			if(!this.$v.formData.$error) {

				this.$store.dispatch(this.getStore()+'/addProject_a',{
					"name": "Project Test",
					"type": "my-home",
					"budget": 0,
					"shipping_method_id": 1,
					
					'shipping_address': null,
					'shipping_street': null,
					'shipping_city': null,
					'shipping_postal': null,
					'sample_shipping_address': null,
					'sample_shipping_street': null,
					'sample_shipping_city': null,
					'sample_shipping_postal': null,

					"attachments": [],
				})
				.then((rspns)=>{

				})
				.catch((e)=>{
					console.log(e);
				});

			}
		}
	},


}	
</script>


<style scoped lang="scss">
	
.v-textarea:not(.v-input--is-focused):not(.v-input--has-state) /deep/ > .v-input__control > .v-input__slot:hover,
.v-textarea /deep/ > .v-input__control > .v-input__slot,
.v-textarea /deep/ > .v-input__control > .v-input__slot:hover {
	border: 1px solid rgba(0,0,0,0.54);
}
// .v-textarea > .v-input__control > .v-input__slot:hover
</style>

