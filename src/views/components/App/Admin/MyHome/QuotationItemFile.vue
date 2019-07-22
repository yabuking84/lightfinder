<template>
	<v-layout row wrap>
	<v-flex xs12>
		<vue-dropzone 
		id="dropzone_images" 
		:options="dropzoneOptions" 
		:useCustomSlot="useCustomSlot"
		:awss3="getAWSS3('add-project-files')"
		@vdropzone-success="vdz_success($event,'add-project-files')">
			<div class="dropzone-custom-content">
				<h3 class="dropzone-custom-title">Drag and drop to upload your image here</h3>
				<!-- <div class="subtitle">...or click to select a file from your computer</div> -->
			</div>
		</vue-dropzone>
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
            thumbnailWidth: 100,
            maxFilesize: 100,
            headers: {},
            addRemoveLinks: true,            
            dictDefaultMessage: "<i class='fa fa-cloud-upload'></i>UPLOAD ME",
        },


    // dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    // dddddddddddddddddddddddddddddddddddddddddddddddddddd
    // Dropzone



}},


created(){

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
                filegroup: 'add-project-files',
                filesize: _.round((file.size/1000), 2),
            };

            this.cnsl('attachment xxxxx',attachment);

            // for the preview when uploaded
            // this.inquiry_images.push(attachment);

        	
        	this.projectFiles.push(attachment);


        }

    },
    // dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    // dddddddddddddddddddddddddddddddddddddddddddddddddddd
    // Dropzone


},

};
</script>



<style scoped lang="scss">
/deep/ .v-list__tile--avatar {
	height: 40px;
}
	

.dropzone {
	padding: 10px;
	min-height: 100px;
	/deep/ .dz-message {
		margin: 0px;
	}
}


</style>