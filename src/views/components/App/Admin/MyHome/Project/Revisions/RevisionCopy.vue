<template>
<span>


	<v-container fluid grid-list-xl>
		<v-layout row wrap>
			
			<v-flex xs12 class="white--text">
				<router-link :to="{name:'AdminMyHome'}">
					<h3 
					class="white--text d-inline-block mr-2"
					style="border-bottom: 1px solid;">
						My Home
					</h3>
				</router-link> 
				/
				<router-link :to="{name:'AdminMyHomeProject', params:{proj_id:proj_id}}">
					<h3 
					class="white--text d-inline-block mr-2"
					style="border-bottom: 1px solid;">
						Project {{ proj_id }}
					</h3>
				</router-link> 
				/
				<router-link :to="{name:'AdminMyHomeRevisionView', params:{proj_id:proj_id,rev_id:rev_id}}">
					<h3 
					class="white--text d-inline-block mr-2"
					style="border-bottom: 1px solid;">
						Revision {{ formData.revision }}
					</h3>
				</router-link> 
				/
				<h3 class="d-inline-block ml-2">Copy Revision</h3>
			</v-flex>

			<v-flex xs12>

				<v-card>


					<v-card-text class="item-box">
						<v-layout row wrap>
							<v-flex xs4>					  
								<v-text-field
								v-model="formData.revision"
								label="Revision Reference name">
								</v-text-field>
							</v-flex>								
							<v-flex xs4>					  
								<v-text-field
								v-model="formData.shipping_cost"						
								label="Shipping Cost"
								type="number"
								placeholder="0.00"
								prefix="$">
								</v-text-field>										
							</v-flex>
						</v-layout>

						<v-layout row wrap style="min-height:300px;">
							<quotation-items 
							:itemsProp="formData.items"
							:items.sync="formData.items"
							:bus="bus"></quotation-items>
						</v-layout>

					</v-card-text>



					<v-card-actions>
						<v-btn 
						class="black white--text mr-3" 
						:loading="btnLdng"
						@click="submitForm()">
							Copy
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

			</v-flex>
		</v-layout>
	</v-container>












</span>
</template>


<script>
import validationMixin from '@/mixins/validationMixin'
import { required, decimal } from 'vuelidate/lib/validators'

import QuotationItems from '@/views/Components/App/Admin/MyHome/Project/Revisions/RevisionEditItems'
import prjctEvntBs from '@/bus/project'

import Vue from 'vue'

export default {
mixins:[
	validationMixin,
],

components: {
	QuotationItems,	
},

data() { return {

	btnLdng: false,

	formData :{
		revision: null,
		shipping_cost: null,
		eta: null,
		etd: null,
		items:[],
	},

	revision: {},

	bus: new Vue(),
}},


computed:{
	proj_id(){
		return this.$route.params.proj_id;
	},
	rev_id(){
		return this.$route.params.rev_id;
	},
},




created(){
	this.getRevision();	
},

methods: {

	getRevision(){
		this.$store.dispatch(this.getStore('myHm')+'/getQuotation_a',{
			proj_id: this.proj_id,
			rev_id: this.rev_id,
		})
		.then((rspns)=>{
			console.log(rspns);
			this.formData.revision = rspns.revision;
			this.formData.shipping_cost = (rspns.shipping_cost)?rspns.shipping_cost:0;
			this.formData.eta = rspns.eta;
			this.formData.etd = rspns.etd;
			this.formData.items = rspns.items;
		})
		.catch((e)=>{
			console.log(e);
		});
	},

	submitForm(){

		console.log('submit');
		console.log(this.formData);

		this.$store.dispatch(this.getStore('myHm')+'/createQuotation_a',{
			proj_id: this.proj_id,
			formData: this.formData,
		})
		.then((rspns)=>{
			console.log(rspns);
			this.clearItems();
			prjctEvntBs.emiRefreshRevisionTable();
			this.$router.push({
				name:'AdminMyHomeRevisionView',
				params:{
					proj_id: this.proj_id,
					rev_id: rspns.data.id,
				},
			});
		});
	},


	clearItems(){		
		this.bus.$emit('reset-items');
	},			

	addItem(){		
		this.bus.$emit('add-item');
	},
},



watch:{
	'formData.project_type': {
		handler(nVal,oVal){
			if(nVal!='Others')
			this.formData.project_type_others = null;
		},
	},

},

}	
</script>


<style scoped lang="scss">


</style>

