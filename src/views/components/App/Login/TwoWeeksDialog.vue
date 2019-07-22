<template>
<span>
	



<v-dialog 
:value="dialog" 
@input="closeDialog()"
width="1200px">
	<v-card>
		<v-card-title class="headline white black--text py-2" primary-title>
			<v-layout row wrap justify-end>			  
				<v-btn 
				@click="closeDialog()"
				fab small flat
				class="white black--text">
					<v-icon>fas fa-close</v-icon>
				</v-btn>
			</v-layout>
		</v-card-title>

		<v-card-text>

			<v-container>
				<v-layout row wrap>				
					<v-flex xs12>					

		                <v-layout 
		                wrap row pb-4>
		                	<v-flex xs12>
								
								<p style="font-size: 1.2em; text-align: center;">
									Currently we are still in the process of making BuyAnyLight available on mobile. 
								</p>
								<p style="font-size: 1.2em; text-align: center;">
									In the mean time please use a <strong>Desktop / Laptop browser</strong> to fully use BuyAnyLight's features.
								</p>

								<p style="font-size: 1.5em; text-align: center;">
									Thank you.
								</p>

		                	</v-flex>
		                </v-layout>
					  
					</v-flex>

				</v-layout>
				

			</v-container>

		</v-card-text>

		<!-- <v-card-actions>
			<v-layout row wrap justify-end>			  
				<v-btn 
				@click="closeDialog()"
				fab small 
				class="black white--text ma-3">
					<v-icon>fas fa-close</v-icon>
				</v-btn>
			</v-layout>
		</v-card-actions> -->
	</v-card>
</v-dialog>



</span>
</template>

<script>

export default {

props:[
	'dialog',
],

data(){return{
	
}},


methods:{
	closeDialog(){
		this.$emit('update:dialog', false);
	},
},

}
	
</script>