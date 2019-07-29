<template>
<span>
	<v-layout row wrap>
	<v-flex xs6>
		<vue-dropzone 
		id="dropzone_files" 
		ref="dropzone_files" 
		:options="dropzoneOptions" 
		:useCustomSlot="useCustomSlot"
		:awss3="getAWSS3('add-project-attachments')"
		@vdropzone-success="vdz_success($event,'add-project-attachments')"
		@vdropzone-queue-complete="vdz_queue_complete($event,'add-project-attachments')">
			<div class="dropzone-custom-content">
				<h3 class="dropzone-custom-title">Drag and drop to upload your files here</h3>
				<div class="subtitle">...or click to select a file from your computer</div>
			</div>
		</vue-dropzone>
	</v-flex>
	<v-flex xs6> 	

		<template v-if="project.attachments.length">
			<v-list 		
			style="height: 255px; overflow-y: auto; border: 1px solid gainsboro;">
			    <template v-for="(projectFile, index) in project.attachments">

			        <v-list-tile :key="'projectfile_'+index" avatar @click="">
			            <v-list-tile-avatar>
							<v-icon color="red">{{ getFileTypeIcon(projectFile.filetype) }}</v-icon>
			            </v-list-tile-avatar>

			            <v-list-tile-content>		            	
			                <v-list-tile-sub-title>
			                	<v-tooltip right>
				        		<template #activator="{ on }">

				                	<a target="_blank" :href="projectFile.location">
					                	<span  v-on="on">{{ projectFile.filename }}</span>
				                	</a>
	                            </template>
					    		<!-- <span>{{ projectFile.filename }}<br>{{ projectFile.filetype }}</span> -->
					    		<span>{{ projectFile.filename }}</span>
	                        	</v-tooltip>		                	
			                </v-list-tile-sub-title>
			            </v-list-tile-content>

			            <v-list-tile-action>			              
		                	<v-btn 
		                	fab small flat
		                	@click="confirmDeleteAttachment(index,projectFile.filename)"
		                	class="black white--text delete-btn">
		                		<v-icon>fas fa-trash-alt</v-icon>
		                	</v-btn>
			            </v-list-tile-action>
			        </v-list-tile>
			    </template>
			</v-list>
		</template>

    	<div
    	v-else
    	style="height: 255px; overflow-y: auto; border: 1px solid gainsboro;">
	    	<h3 class="mt-5" style="text-align: center;">No files...</h3>
    	</div>


	</v-flex>

	<!-- <v-flex xs12>
		<v-btn 
		class="black white--text" 
		:loading="addFilesLdng"
		@click="editProject()">Add files</v-btn>
	</v-flex> -->

	<!-- <v-flex xs12><pre>{{ project }}</pre></v-flex> -->

	</v-layout>	




<v-dialog v-model="attachmentToDelete.dialog" width="800px">
    <v-card>

        <v-card-text>
        	<h3 class="mt-2 ml-3">Are you sure to delete:</h3>
        	<h1 class="text-sm-center my-3">{{ attachmentToDelete.filename }}</h1>
        </v-card-text>
        <v-card-actions>
        	<v-btn 
        	@click="deleteAttachment()"
        	class="red white--text">
        		DELETE FILE
        	</v-btn>
        	<v-spacer></v-spacer>
        	<v-btn 
        	@click="attachmentToDelete.dialog = false"
        	class="black white--text">
        		NO
        	</v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>

	


</span>
</template>



<script>
import config from '@/config/index'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import vue2Dropzone from 'vue2-dropzone'

export default {
components:{
    vueDropzone: vue2Dropzone,
},

props:{
	proj_id: String, 
},

data() { return {

	addFilesLdng: false,	
	attachmentToDelete: {
		dialog: false,
		index: null,
		filename: '',
	},

    project:{
    	attachments: [],
    },

    // forAttachments: [],

    // Dropzone
    // dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    // dddddddddddddddddddddddddddddddddddddddddddddddddddd

        useCustomSlot: true,
        dropzoneOptions: {
            url: config.main.awss3.urls.inquiry,
            // thumbnailWidth: 50,
            // thumbnailHeight: 50,
            maxFilesize: 100,
            headers: {},
            addRemoveLinks: true,            
            dictDefaultMessage: "<i class='fa fa-cloud-upload'></i>UPLOAD ME",
            previewTemplate:`
				<div style="width:100%; min-height: 50px;">
				  	<div class="dz-details">
				    	<div class="dz-filename"><span data-dz-name></span></div>
				    	<div class="dz-size" data-dz-size></div>				    	
				  	</div>
				  	<div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>
				</div>
            `,
        },


    // dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    // dddddddddddddddddddddddddddddddddddddddddddddddddddd
    // Dropzone



}},


created(){
	this.getProject();
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
                project_id: this.proj_id,
            },
            sendFileToServer : true,
            withCredentials: false
        };

        return awss3;
    },

    vdz_s3UploadSuccess: function(s3ObjectLocation){
        // console.log("vdz_s3UploadSuccess",s3ObjectLocation);
        // console.log();
    },
    vdz_success(file, upload_group){
        // console.log("vdz_success file = ",file);
        // console.log("vdz_success upload_group = ",upload_group);

        if(file.status=='success') {

            var attachment = {
                location: file.s3ObjectLocation,
                filename: file.name,
                filetype: file.type,
                filegroup: upload_group,
                filesize: _.round((file.size/1000), 2),
            };

            console.log('attachment xxxxx',attachment);
            // console.log('this.formData.attachments xxxxx',this.formData.attachments);

            // for the preview when uploaded
            // this.inquiry_images.push(attachment);
        	
        	// this.forAttachments.push(attachment);

        	this.project.attachments.push(attachment);        	

        }

    },
    vdz_queue_complete(file, upload_group){
        console.log("vdz_queue_complete file = ",file);
        // console.log("vdz_queue_complete upload_group = ",upload_group);
        this.editProject();
    },
    // dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    // dddddddddddddddddddddddddddddddddddddddddddddddddddd
    // Dropzone

    getProject(){
    	this.$store.dispatch(this.getStore('myHm')+'/getProject_a',{
    		proj_id: this.proj_id,
    	})
    	.then((rspns)=>{
    		// console.log(rspns);
    		this.project = rspns;
    	})
    	.catch((e)=>{
    		console.log(e);
    	});
    },

    editProject(){

    	this.addFilesLdng = true;

    	// this.project.attachments = [
    	// 	...this.project.attachments,
    	// 	...this.forAttachments,
    	// ];

    	this.$store.dispatch(this.getStore('myHm')+'/editProject_a',{
    		proj_id: this.proj_id,
    		formData:{
    			...this.project,
    		},    		
    	})
    	.then((rspns)=>{
    		// this.$refs.dropzone_files.removeAllFiles();
    	})
    	.catch((e)=>{
    		console.log(e);
    	});
    },


    getFileTypeIcon(filetype){

    	var retVal = "fas fa-file";

    	if(filetype.includes('image'))
    	retVal = "fas fa-image";
    	if(filetype.includes('pdf'))
    	retVal = "fas fa-file-pdf";
    	if(filetype.includes('zip'))
    	retVal = "fas fa-file-archive";
    	if(filetype.includes('spreadsheet'))
    	retVal = "fas fa-file-excel";
    	if(filetype.includes('wordprocessing'))
    	retVal = "fas fa-file-word";

    	return retVal;
    },

    confirmDeleteAttachment(index,filename){
    	this.attachmentToDelete.filename = filename;    	
    	this.attachmentToDelete.index = index;
    	this.attachmentToDelete.dialog = true;

    },

    deleteAttachment(){
    	this.$delete(this.project.attachments,this.attachmentToDelete.index);
    	this.editProject();
    	this.attachmentToDelete.dialog = false;
    },

},

};
</script>



<style scoped lang="scss">
/deep/ .v-list__tile--avatar {
	height: 40px;
}
	

.delete-btn {
	height: 30px;
    width: 30px;	

    /deep/ .v-icon {
		font-size: 12px;
    }
}


/deep/ .dropzone {
	.dz-preview {
		width: 100%;
	}
}
</style>