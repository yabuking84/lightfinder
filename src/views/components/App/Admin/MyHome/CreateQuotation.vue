<template>
<span>


<v-btn 
@click.stop="dialog=true"
small class="black white--text">
	create quotation
</v-btn>

<v-dialog v-model="dialog" width="1200px">
	<v-card>
		<v-card-title class="headline black white--text py-2" primary-title>
			<v-layout row wrap justify-space-between align-center>
				<span>Create Quotation</span>
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

					<quotation-items 
					@update:items="formData.items = $event"
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
			class="black white--text" 
			:loading="btnLdng"
			@click="submitForm()">
				submit
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

import QuotationItems from '@/views/Components/App/Admin/MyHome/CreateQuotationItems'

 import Vue from 'vue'

export default {
mixins:[
	validationMixin,
],

components: {
	QuotationItems,	
},



data() { return {

	dialog: false,

	btnLdng: false,

	formData :{
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
			this.formData.items = [];
			this.bus.$emit('reset-items');
		},
	},
},



methods: {
	submitForm(){
		this.$v.$touch();

		if(!this.$v.formData.$error)
		alert('submit');

	},

	testChange(){
		this.formData.items[1].ref = 'asdsd';
	},


	addItem(){		
		this.bus.$emit('add-item');
	},
},


}	
</script>


<style scoped lang="scss">


</style>

