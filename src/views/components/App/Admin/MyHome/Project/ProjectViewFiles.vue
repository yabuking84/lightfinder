<template>
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

		<v-list style="height: 255px; overflow-y: auto; border: 1px solid gainsboro;">
		    <template v-for="(projectFile, index) in projectFiles">

		        <v-list-tile :key="'projectfile_'+index" avatar @click="">
		            <v-list-tile-avatar>
						<v-icon color="red">fas fa-file-pdf</v-icon>
		            </v-list-tile-avatar>

		            <v-list-tile-content>		            	
		                <v-list-tile-sub-title>
		                	{{ projectFile.filename }}
		                </v-list-tile-sub-title>
		            </v-list-tile-content>
		        </v-list-tile>


		    </template>
		</v-list>

	</v-flex>

	</v-layout>	
</template>



<script>
import config from '@/config/index'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import vue2Dropzone from 'vue2-dropzone'

export default {
components:{
    vueDropzone: vue2Dropzone,
},

data() { return {

    projectFiles:[],

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


created(){
	this.getProjectFiles();
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
        // this.cnsl("vdz_success file = ",file);
        // this.cnsl("vdz_success upload_group = ",upload_group);

        if(file.status=='success') {

            var attachment = {
                location: file.s3ObjectLocation,
                filename: file.name,
                filetype: file.type,
                filegroup: 'add-project-files',
                filesize: _.round((file.size/1000), 2),
            };

            // this.cnsl('attachment xxxxx',attachment);
            // this.cnsl('this.formData.attachments xxxxx',this.formData.attachments);

            // for the preview when uploaded
            // this.inquiry_images.push(attachment);

        	
        	this.projectFiles.push(attachment);


        }

    },
    // dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    // dddddddddddddddddddddddddddddddddddddddddddddddddddd
    // Dropzone

    getProjectFiles(){
    	this.$store.dispatch(this.getStore('myHm')+'/getProjectFiles_a')
    	.then((rspns)=>{
    		// this.cnsl(rspns);
    		this.projectFiles = rspns;
    	})
    	.catch((e)=>{
    		console.log(e);
    	});
    }

},

};
</script>



<style scoped lang="scss">
/deep/ .v-list__tile--avatar {
	height: 40px;
}
	
</style>