<template>
<span>


<v-btn 
@click.stop="dialog=true"
color="black" 
style="height:40px; border: 1px solid #fff !important;"
class="white--text">
	<v-icon class="mr-2">fas fa-plus-circle</v-icon>
	Create Project
</v-btn>   

<v-dialog v-model="dialog" width="800px">
    <v-card>
        <v-card-title class="headline black white--text py-2" primary-title>
        	<v-layout row wrap justify-space-between align-center>
            	<span>Create Project</span>
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
			        :items="shippingMethods"
			        item-text="name"
          			item-value="id"></v-select>
				</v-flex>
				
				<v-flex xs6>
	        		<v-text-field
	        		v-model="formData.target_budget"
	        		prefix="$"
	        		type="number"
	        		label="Target Budget"></v-text-field>
				</v-flex>

				<v-flex xs12>
			        <v-textarea outline
			        v-model="formData.description"
			        label="Description"></v-textarea>
				</v-flex>


				<v-flex xs12>
				</v-flex>

				<v-flex xs12 mb-0 pb-0 mt-3>
					<v-layout row wrap justify-space-between align-center>
						<h3>Mass Shipping Address</h3>
						<v-btn @click="setCurrentAddress('mass-shipping')" class="black white--text">Use account address</v-btn>
					</v-layout>
				</v-flex>

				<v-flex xs6>
	        		<v-text-field
	        		v-model="formData.shipping_address"
	        		prefix=""
	        		label="Address"></v-text-field>
				</v-flex>

				<v-flex xs6>
	        		<v-text-field
	        		v-model="formData.shipping_street"
	        		prefix=""
	        		label="Street"></v-text-field>
				</v-flex>

				<v-flex xs6>
	        		<v-text-field
	        		v-model="formData.shipping_city"
	        		prefix=""
	        		label="City"></v-text-field>
				</v-flex>

				<v-flex xs6>
	        		<v-text-field
	        		v-model="formData.shipping_postal"
	        		prefix=""
	        		label="Postal"></v-text-field>
				</v-flex>



				<v-flex xs12 mb-0 pb-0 mt-3>
					<v-layout row wrap justify-space-between align-center>
						<h3>Sample Shipping Address</h3>
						<v-btn @click="setCurrentAddress('sample-shipping')" class="black white--text">Use account address</v-btn>
					</v-layout>					
				</v-flex>

				<v-flex xs6>
	        		<v-text-field
	        		v-model="formData.sample_shipping_address"
	        		prefix=""
	        		label="Address"></v-text-field>
				</v-flex>

				<v-flex xs6>
	        		<v-text-field
	        		v-model="formData.sample_shipping_street"
	        		prefix=""
	        		label="Street"></v-text-field>
				</v-flex>

				<v-flex xs6>
	        		<v-text-field
	        		v-model="formData.sample_shipping_city"
	        		prefix=""
	        		label="City"></v-text-field>
				</v-flex>

				<v-flex xs6>
	        		<v-text-field
	        		v-model="formData.sample_shipping_postal"
	        		prefix=""
	        		label="Postal"></v-text-field>
				</v-flex>

				<v-flex xs12>
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
import prjctEvntBs from '@/bus/project'

import config from '@/config/main'

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

			shipping_address: null,
			shipping_street: null,
			shipping_city: null,
			shipping_postal: null,

			sample_shipping_address: null,
			sample_shipping_street: null,
			sample_shipping_city: null,
			sample_shipping_postal: null,

		},

		shippingMethods: config.shipping_methods,

	}},


	watch:{
		'formData.project_type': {
			handler(nVal,oVal){
				if(nVal!='Others')
				this.formData.project_type_others = null;
			},
		},
		dialog: {			
			handler(nVal,oVal){
				this.formData = {
					project_name: null,
					project_type: null,
					project_type_others: null,
					target_budget: null,
					shipping_method: null,
					description: null,

					shipping_address: null,
					shipping_street: null,
					shipping_city: null,
					shipping_postal: null,

					sample_shipping_address: null,
					sample_shipping_street: null,
					sample_shipping_city: null,
					sample_shipping_postal: null,

				};
				
			},		
		}
	},



	methods: {
		submitForm(){
			this.$v.$touch();

			if(!this.$v.formData.$error) {
				var projectType = (this.formData.project_type=='Others')?this.formData.project_type_others:this.formData.project_type;
				var targetBudget = (this.formData.target_budget)?this.formData.target_budget:0;
				var shippingPostal = (this.formData.shipping_postal)?this.formData.shipping_postal:'0000';
				var sampleShippingPostal = (this.formData.sample_shipping_postal)?this.formData.sample_shipping_postal:'0000';

				this.$store.dispatch(this.getStore('myHm')+'/addProject_a',{
					name: this.formData.project_name,
					type: projectType,
					budget: targetBudget,
					shipping_method_id: this.formData.shipping_method,
					
					description: this.formData.description,

					// shipping_cost: 0,

					shipping_address: this.formData.shipping_address,
					shipping_street: this.formData.shipping_street,
					shipping_city: this.formData.shipping_city,
					shipping_postal: shippingPostal,

					sample_shipping_address: this.formData.sample_shipping_address,
					sample_shipping_street: this.formData.sample_shipping_street,
					sample_shipping_city: this.formData.sample_shipping_city,
					sample_shipping_postal: sampleShippingPostal,

					"attachments": [],
				})
				.then((rspns)=>{
					console.log(rspns);
					prjctEvntBs.emiRefreshProjectTable();
					this.dialog = false;

					
				})
				.catch((e)=>{
					console.log(e);
				});

			}

		},

		setCurrentAddress(addressType){
			// console.log(this.$store.state.auth.auth_user.address);

			if(addressType=='mass-shipping') {
				this.formData.shipping_address = this.$store.state.auth.auth_user.address;
				this.formData.shipping_postal = this.$store.state.auth.auth_user.postal;
			} else 
			if(addressType=='sample-shipping') {
				this.formData.sample_shipping_address = this.$store.state.auth.auth_user.address;
				this.formData.sample_shipping_postal = this.$store.state.auth.auth_user.postal;
			}

		},
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

