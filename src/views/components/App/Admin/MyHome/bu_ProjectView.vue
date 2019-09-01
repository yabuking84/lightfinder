<template>
	<div>
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
					<h3 class="d-inline-block ml-2">Project</h3>
				</v-flex>
				
				<v-flex xs8>
					<v-card>
						<v-card-title>
							<v-layout row wrap justify-space-between>
								<h3 class="ma-2">Quotation {{ proj_id }}</h3>
								<create-quotation></create-quotation>
							</v-layout>
						</v-card-title>
						<v-card-text style="height:308px">
							
							<v-layout row wrap>
								<v-flex xs6>                			
									<span class="body-1 mr-2">Project Type: </span>
									<span class="subheading font-weight-bold">{{ project.project_type }}</span>
								</v-flex>
								<v-flex xs6>                			
									<span class="body-1 mr-2">Target Budget: </span>
									<span class="subheading font-weight-bold">${{ currency(project.target_budget) }}</span>
								</v-flex>
							</v-layout>
							<p class="mt-2" style="min-height: 150px;">{{ project.description }}</p>

						</v-card-text>
					</v-card>
				</v-flex>

				<v-flex xs4>
					<v-card>
						<v-card-title>
							<h3>Ordered Samples</h3>
							<!-- <create-quotation></create-quotation> -->
						</v-card-title>
						<v-card-text style="height:300px">


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
import Messaging from "@/views/Components/App/Admin/MyHome/ProjectMessagingBox"
import Files from "@/views/Components/App/Admin/MyHome/ProjectFiles"
import CreateQuotation from "@/views/Components/App/Admin/MyHome/CreateQuotation"

import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import vue2Dropzone from 'vue2-dropzone'

import config from '@/config/index'

export default {
components:{
	Messaging,
	Files,
	CreateQuotation,
	vueDropzone: vue2Dropzone,
},

data(){ return {

	projectFiles:[],
	project: {
		project_name: null,
		project_no: null,
		project_type: null,
		target_budget: null,
		shipping_method: null,
		description: null,
	},

}},



computed:{
	proj_id(){
		return this.$route.params.proj_id;
	},

},


created(){
	this.getProject();
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

},

}	
</script>