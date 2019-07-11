<template>
	<div>
		<v-container fluid grid-list-xl>
			<v-layout row wrap>
				
				<v-flex xs12 class="white--text">
					<router-link :to="{name:'BuyerMyHome'}">
						<h3 
						class="white--text d-inline-block mr-2"
						style="border-bottom: 1px solid;">
							My Home
						</h3>
					</router-link> 
					/
					<h3 class="d-inline-block ml-2">Project Inquiry {{ proj_ref }}</h3>
				</v-flex>
				
				<v-flex xs8>
					<v-card>
						<v-card-title>
							<v-layout row wrap justify-space-between>
								<h3 class="ma-2">Quotation</h3>
								<v-btn small class="black white--text">
									create quotation
								</v-btn>
							</v-layout>
						</v-card-title>
						<v-card-text style="height:300px">
						</v-card-text>
					</v-card>
				</v-flex>

				<v-flex xs4>
					<v-card>
						<v-card-title>
						  	<h3>Samples</h3>
						</v-card-title>
						<v-card-text style="height:300px">
						</v-card-text>
					</v-card>
				</v-flex>

				<v-flex xs6>
					<v-card>
						<!-- <v-card-title>
						  	<h3>Chat</h3>
						</v-card-title> -->
						<v-card-text>
								<!-- message box -->
								<messaging :proj_ref="proj_ref">
								</messaging>
								<!-- message box -->						  	
						</v-card-text>
					</v-card>					
				</v-flex>

				<v-flex xs6>
					<v-card>
						<v-card-title>
						  	<h3>Attached Files</h3>
						</v-card-title>
						<v-card-text style="height:300px">
							<v-layout row wrap>
							<v-flex xs6>
								<vue-dropzone 
								id="dropzone_images" 
								:options="dropzoneOptions" 
								:useCustomSlot="useCustomSlot"
								:awss3="getAWSS3('add-project-files')"
								@vdropzone-success="vdz_success($event,'add-project-files')">
									<div class="dropzone-custom-content">
										<h3 class="dropzone-custom-title">Drag and drop to upload your files here</h3>
										<div class="subtitle">...or click to select a file from your computer</div>
									</div>
								</vue-dropzone>
							</v-flex>
							<v-flex xs6>
							 	
							</v-flex>

								<v-list two-line>
								    <template v-for="(item, index) in items">
								        <v-subheader v-if="item.header" :key="item.header">
								            {{ item.header }}
								        </v-subheader>

								        <v-divider v-else-if="item.divider" :key="index"></v-divider>

								        <v-list-tile v-else :key="item.title" avatar @click="">
								            <v-list-tile-avatar>
								                <img :src="item.avatar">
								            </v-list-tile-avatar>

								            <v-list-tile-content>
								                <v-list-tile-title v-html="item.title"></v-list-tile-title>
								                <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
								            </v-list-tile-content>
								        </v-list-tile>
								    </template>
								</v-list>

							</v-layout>
						</v-card-text>
					</v-card>
				</v-flex>

			</v-layout>
		</v-container>
	</div>	
</template>

<script>
import Messaging from "@/views/Components/App/MessagingBoxExtraPackages"

import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import vue2Dropzone from 'vue2-dropzone'

import config from '@/config/index'

export default {
components:{
	Messaging,
    vueDropzone: vue2Dropzone,
},

data(){ return {

    // Dropzone
    // dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    // dddddddddddddddddddddddddddddddddddddddddddddddddddd

        useCustomSlot: true,
        dropzoneOptions: {
            url: config.main.awss3.urls.inquiry,
            thumbnailWidth: 200,
            maxFilesize: 100,
            headers: {},
            addRemoveLinks: true,            
            dictDefaultMessage: "<i class='fa fa-cloud-upload'></i>UPLOAD ME",
        },


    // dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    // dddddddddddddddddddddddddddddddddddddddddddddddddddd
    // Dropzone


    projectFiles:[],

}},

computed:{
	proj_ref(){
		return this.$route.params.proj_ref;
	},
},


methods: {


    // Dropzone
    // dddddddddddddddddddddddddddddddddddddddddddddddddddd
    // dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    getAWSS3(upload_group){


        var awss3 =  {
            signingURL: config.main.awss3.signingURL,
            headers: {
                token:localStorage.access_token,
            },
            params : {
                action: upload_group,
            },
            sendFileToServer : true,
            withCredentials: false
        };

        return awss3;
    },

    vdz_s3UploadSuccess: function(s3ObjectLocation){
        // this.cnsl("vdz_s3UploadSuccess",s3ObjectLocation);
        // this.cnsl();
    },
    vdz_success(file, upload_group){
        this.cnsl("vdz_success file = ",file);
        this.cnsl("vdz_success upload_group = ",upload_group);

        if(file.status=='success') {

            var attachment = {
                location: file.s3ObjectLocation,
                filename: file.name,
                filetype: file.type,
                filegroup: upload_group,
                filesize: _.round((file.size/1000), 2),
            };

            this.cnsl('attachment xxxxx',attachment);
            this.cnsl('this.formData.attachments xxxxx',this.formData.attachments);

            // for the preview when uploaded
            // this.inquiry_images.push(attachment);

        	
        	this.projectFiles.push(attachment);


        }

    },
    // dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    // dddddddddddddddddddddddddddddddddddddddddddddddddddd
    // Dropzone	
},

}	
</script>