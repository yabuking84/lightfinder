<template>
	<div>
		<v-container fluid grid-list-xl>
			<v-layout row wrap>
				
				<v-flex xs12 class="white--text" style="position: relative;">
					<router-link :to="{name:'AdminMyHome'}">
						<h3 
						class="white--text d-inline-block mr-2"
						style="border-bottom: 1px solid;">
							My Home
						</h3>
					</router-link> 
					/
					<h3 class="d-inline-block ml-2">Project {{ proj_id }}</h3>

				</v-flex>
				
				<v-flex xs8>
					<v-card>
						<v-card-title>
							<v-layout row wrap justify-space-between>
								<h3 class="ma-2">Quotation {{ proj_id }}</h3>
								<create-quotation :proj_id="proj_id"></create-quotation>
							</v-layout>							
						</v-card-title>
						<v-card-text style="height:300px">
							<quotation :project="project"></quotation>
						</v-card-text>
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
		                    <!-- <router-link :to="{name:'AdminMyHomeOrderedSamples', params:{proj_id:proj_id}}">
								<v-btn class="black white--text">
									order samples
								</v-btn>
		                    </router-link>	 -->						
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

import CreateQuotation from "@/views/Components/App/Admin/MyHome/Project/CreateQuotation/CreateQuotation"
import Messaging from "@/views/Components/App/Admin/MyHome/Project/ProjectViewMessagingBox"
import Files from "@/views/Components/App/Admin/MyHome/Project/ProjectViewFiles"
import Quotation from "@/views/Components/App/Admin/MyHome/Project/ProjectViewQuotation"
import OrderedSamples from "@/views/Components/App/Admin/MyHome/Project/ProjectViewOrderedSamplesTable"

// import ViewOrderedSamples from "@/views/Components/App/Admin/Project/ProjectViewOrderedSamples"



///////////////////////////////////////////////
///////////////////////////////////////////////



import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import vue2Dropzone from 'vue2-dropzone'

import config from '@/config/index'

export default {
components:{
	CreateQuotation,
	Messaging,
	Files,
	Quotation,
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