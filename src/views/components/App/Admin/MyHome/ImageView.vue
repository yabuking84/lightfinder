<template>
<div 
:class="customClass" 
style="cursor: pointer;"
:style="{height:height,width:width,}">
	<v-img
	:src="src"
	aspect-ratio="1"
	class="grey lighten-2"
	@click="openDialogImage(src)">
		<template v-slot:placeholder>
		<v-layout
		fill-height
		align-center
		justify-center
		ma-0>
			<v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
		</v-layout>
		</template>
	</v-img>


	<v-dialog v-model="dialog" width="800">
	    <v-card>

	        <v-card-text>
				<v-img
				:src="dialogImage"
				aspect-ratio="1"
				class="grey lighten-2"
				max-width="750px"
				max-height="80vh"
				style="margin: auto;"
				@click="dialog=true">
					<template v-slot:placeholder>
					<v-layout
					fill-height
					align-center
					justify-center
					ma-0>
						<v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
					</v-layout>
					</template>
				</v-img>	            
	        </v-card-text>

	    </v-card>
	</v-dialog>

</div>	
</template>


<script>
		
export default{

	props:{
		src: String,
		width: {
			type: String,
			default: '100px',
		},
		customClass: {
			type: String,
			default: 'mr-4 my-4',
		},
		height: {
			type: String,
			default: '100px',
		},
	},
	
	data(){return{
		dialog: false,
		dialogImage: '',
	}},

	methods:{

	    openDialogImage(src){
	    	this.dialogImage = src;
	    	this.dialog = true;
	    },

	},
}		
</script>