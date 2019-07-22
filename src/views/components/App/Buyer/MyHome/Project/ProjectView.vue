<template>
	<div>
		<v-container fluid grid-list-xl>
			<v-layout row wrap>
				
				<v-flex xs12 class="white--text" style="position: relative;">
					<router-link :to="{name:'BuyerMyHome'}">
						<h3 
						class="white--text d-inline-block mr-2"
						style="border-bottom: 1px solid;">
							My Home
						</h3>
					</router-link> 
					/
					<h3 class="d-inline-block ml-2">Project Inquiry {{ proj_id }}</h3>


					<v-btn class="white black--text pay-psf">
						<v-icon class="mr-2">far fa-credit-card</v-icon>
						PAY PSF
					</v-btn>

				</v-flex>
				
				<v-flex xs8>
					<v-card>
						<v-card-title>
						  	<h3>Quotation</h3>
						</v-card-title>
						<v-card-text style="height:300px">
							<quotation :project="project"></quotation>
						</v-card-text>
						<v-card-actions>
		                    <router-link :to="{name:'BuyerMyHomePayQuotation', params:{proj_id:proj_id}}">
								<v-btn class="black white--text">
									pay quotation
								</v-btn>
		                    </router-link>
						</v-card-actions>
					</v-card>
				</v-flex>

				<v-flex xs4>
					<v-card>
						<v-card-title>
						  	<h3>Ordered Samples </h3>
						</v-card-title>
						<v-card-text style="height:300px">
							<ordered-samples :ordered-samples="orderedSamples"></ordered-samples>
						</v-card-text>
						<v-card-actions>
		                    <router-link :to="{name:'BuyerMyHomeOrderSamples', params:{proj_id:proj_id}}">
								<v-btn class="black white--text">
									order samples
								</v-btn>
		                    </router-link>							
						</v-card-actions>

					</v-card>
				</v-flex>

				<v-flex xs6>
					<v-card>
						<v-card-text>
							<messaging :proj_id="proj_id"></messaging>
						</v-card-text>
					</v-card>					
				</v-flex>

				<v-flex xs6>
					<v-card>
						<v-card-title>
						  	<h3>Attached Files</h3>
						</v-card-title>
						<v-card-text style="height:300px">
							<files></files>
						</v-card-text>
					</v-card>
				</v-flex>

			</v-layout>
		</v-container>
	</div>	
</template>

<script> 
import Messaging from "@/views/Components/App/Buyer/MyHome/Project/ProjectViewMessagingBox"
import Files from "@/views/Components/App/Buyer/MyHome/Project/ProjectViewFiles"
import Quotation from "@/views/Components/App/Buyer/MyHome/Project/ProjectViewQuotation"
import OrderedSamples from "@/views/Components/App/Buyer/MyHome/Project/ProjectViewOrderedSamplesTable"

import PayQuotation from "@/views/Components/App/Buyer/MyHome/PayQuotation/PayQuotationView"

import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import vue2Dropzone from 'vue2-dropzone'

import config from '@/config/index'

export default {
components:{
	Messaging,
	Files,
	Quotation,
	PayQuotation,
	OrderedSamples,
    vueDropzone: vue2Dropzone,
},

data(){ return {

	projectFiles:[],
	orderedSamples:[],
	project: {},

}},


created(){
	this.getProject();
	this.getOrderedSamples();
},


methods: {

	getProject(){
		// console.log('xxxxxxx'+this.getStore('myHm')+'/getProject_a');
		this.$store.dispatch(this.getStore('myHm')+'/getProject_a',{
			proj_id:this.proj_id,
		})
		.then((rspns)=>{
			console.log(rspns);
			this.project = rspns;
		})
		.catch((e)=>{
			console.log(e);
		});
	},

	getOrderedSamples(){
		this.$store.dispatch(this.getStore('myHm')+'/getOrderedSamples_a')
		.then((rspns)=>{
			console.log(rspns);
			this.orderedSamples = rspns;
		})
		.catch((e)=>{
			console.log(e);			
		});
	},


},


computed:{
	proj_id(){
		return this.$route.params.proj_id;
	},
},


}	
</script>


<style scoped lang="scss">

.pay-psf {
	position: absolute;
	top: 0;
	right: 0;
}
	
</style>