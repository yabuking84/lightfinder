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

	
					<!-- <v-btn class="white black--text pay-psf">
						<v-icon class="mr-2">far fa-credit-card</v-icon>
						PAY PSF
					</v-btn> -->

				</v-flex>
				
				<v-flex xs8>
					<v-card>
						<v-card-title>
						  	<h3>Quotation</h3>
						  	<v-spacer></v-spacer>
							<create-quotation :proj_id="proj_id"></create-quotation>
						</v-card-title>
						<v-card-text style="height:auto" v-if="project">
							
							<v-layout row wrap>

								<v-flex xs5>
									<v-layout column wrap>
										<v-flex pb-0>
											<span class="body-1 mr-2">Project Type: </span>
											<span class="subheading font-weight-bold">{{ project.type }}</span>
										</v-flex>
										<v-flex pt-0>
											<span class="body-1 mr-2">Target Budget: </span>
											<span class="subheading font-weight-bold">${{ currency(project.budget) }}</span>
										</v-flex>
										<v-flex pb-0>
											<p class="mt-2">{{ project.description }}</p>
										</v-flex>
									</v-layout>
								</v-flex>

								<v-flex xs7 pr-4>							  
									<v-card>
										<!-- <v-card-title primary-title class="pt-3 pb-0">
											<h3>Revisions</h3>
										</v-card-title> -->
										<v-card-text class="mb-3" style="height: 252px; overflow-y: auto; padding: 10px;">
											<revision-list :proj_id="project.id"></revision-list>										  
										</v-card-text>									
									</v-card>
								</v-flex>

							</v-layout>

						</v-card-text>
						<!-- <v-card-actions>
		                    <router-link :to="{name:'AdminMyHomePayQuotation', params:{proj_id:proj_id}}">
								<v-btn class="black white--text">
									pay quotation
								</v-btn>
		                    </router-link>
						</v-card-actions> -->
					</v-card>
				</v-flex>

				<v-flex xs4>
					<v-card>
						<v-card-title>
						  	<h3>Ordered Samples </h3>
						</v-card-title>
						<v-card-text style="height:300px">
							<ordered-samples v-if="orderedSamples" :ordered-samples="orderedSamples"></ordered-samples>
						</v-card-text>

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
						<!-- <v-card-text style="height:300px"> -->
						<v-card-text style="">
							<files :proj_id="proj_id"></files>
						</v-card-text>
					</v-card>
				</v-flex>

			</v-layout>
		</v-container>
	</div>	
</template>

<script> 
import Messaging from "@/views/Components/App/Admin/MyHome/Project/ProjectViewMessagingBox"
import Files from "@/views/Components/App/Admin/MyHome/Project/ProjectViewFiles"
// import Quotation from "@/views/Components/App/Admin/MyHome/Project/ProjectViewQuotation"
import OrderedSamples from "@/views/Components/App/Admin/MyHome/Project/ProjectViewOrderedSamplesTable"

// import PayQuotation from "@/views/Components/App/Admin/MyHome/PayQuotation/PayQuotationView"
import RevisionList from '@/views/Components/App/Admin/MyHome/Project/Revisions/RevisionList'

import CreateQuotation from "@/views/Components/App/Admin/MyHome/Project/CreateQuotation/CreateQuotation"

import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import vue2Dropzone from 'vue2-dropzone'

import config from '@/config/index'

export default {
components:{
	Messaging,
	Files,
	RevisionList,
	// Quotation,
	// PayQuotation,
	OrderedSamples,
	CreateQuotation,
    vueDropzone: vue2Dropzone,
},

data(){ return {

	orderedSamples: null,
	project: null,

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
			// console.log('getProject_a',rspns);
			this.project = rspns;
		})
		.catch((e)=>{
			console.log(e);
		});
	},

	getOrderedSamples(){
		this.$store.dispatch(this.getStore('myHm')+'/getOrderedSamples_a',{
			proj_id: this.proj_id,
		})
		.then((rspns)=>{
			// console.log(rspns);
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