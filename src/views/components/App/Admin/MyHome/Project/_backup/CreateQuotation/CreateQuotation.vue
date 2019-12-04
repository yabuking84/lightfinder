<template>
<span>


<v-btn 
@click.stop="dialog=true"
small class="black white--text">
	<span>Add/Edit Items</span>
</v-btn>

<v-dialog v-model="dialog" fullscreen>
	<v-card>
		<v-card-title class="headline black white--text py-2" primary-title>
			<v-layout row wrap justify-space-between align-center>
				<span>Add/Edit Items</span>
				<v-btn 
				@click="dialog=false"
				fab small class="black white--text">
					<v-icon>fas fa-close</v-icon>
				</v-btn>
			</v-layout>
		</v-card-title>

		<v-card-text style="min-height: 80vh;">

			<v-form>
			<v-container>

				<v-layout row wrap>
					<v-flex xs4>					  
						<v-text-field
						v-model="formData.revision"
						label="Revision Reference name">
						</v-text-field>
					</v-flex>
				</v-layout>

				<v-layout row wrap>

					<quotation-items 
					:items.sync="formData.items"
					:bus="bus"></quotation-items>

				</v-layout>
				
				<!-- <v-layout row wrap>
					<h4>formData.items</h4>
					<pre>{{ formData.items }}</pre>
				</v-layout> -->

			</v-container>
			</v-form>

		</v-card-text>

		<v-divider></v-divider>

		<v-card-actions>
			<v-btn 
			class="black white--text mr-3" 
			:loading="btnLdng"
			@click="submitForm()">
				submit
			</v-btn>			

			<v-spacer></v-spacer>

			<v-btn 
			class="red white--text" 
			:loading="btnLdng"
			@click="clearItems()">
				clear items
			</v-btn>

			<v-spacer></v-spacer>

			<v-btn @click="addItem()" color="success">
				Add Item
			</v-btn>				
		</v-card-actions>
	</v-card>
</v-dialog>


</span>
</template>


<script>
import validationMixin from '@/mixins/validationMixin'
import { required, decimal } from 'vuelidate/lib/validators'

import QuotationItems from '@/views/Components/App/Admin/MyHome/Project/CreateQuotation/CreateQuotationItems'

 import Vue from 'vue'

export default {
mixins:[
	validationMixin,
],

components: {
	QuotationItems,	
},

props:['proj_id'],

data() { return {

	dialog: false,

	btnLdng: false,

	formData :{
		revision: null,
		"shipping_cost": 0,
		"eta": null,
		"etd": null,
		items:[],
	},

	bus: new Vue(),
}},


watch:{
	'formData.project_type': {
		handler(nVal,oVal){
			if(nVal!='Others')
			this.formData.project_type_others = null;
		},
	},

	dialog:{
		handler(nVal,oVal){
			// this.formData.items = [];
			// this.bus.$emit('reset-items');
		},
	},
},



methods: {
	submitForm(){
		// this.$v.$touch();

		// if(!this.$v.formData.$error) {
		// }	

		this.$store.dispatch(this.getStore('myHm')+'/createQuotation_a',{
			proj_id: this.proj_id,
			formData: this.formData,
		})
		.then((rspns)=>{
			this.clearItems();
			this.dialog = false;
		});

	},


	clearItems(){		
		this.bus.$emit('reset-items');
	},			

	addItem(){		
		this.bus.$emit('add-item');
	},
},


}	
</script>


<style scoped lang="scss">


</style>

