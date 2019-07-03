<template>
<div>
		
	<!-- <v-alert 
	class="mx-3"
	color="black" 
	icon="fas fa-clipboard-list"
	:value="true">
	</v-alert> -->

	<v-layout 
	style="border: 1px solid #000;"
	column justify-center align-start mx-3 my-0 px-4 py-2>
		
		<v-flex>		  
			<v-layout row wrap justify-center align-center>		  
				<h3 
				class="mr-3">
					{{ packageType(package_type) }}
				</h3>				

				<v-btn 
				@click="openDialog=true"				
				color="green darken-2" 
				class="white--text">
					UPDGRADE NOW!
				</v-btn>
			</v-layout>
		</v-flex>

		<v-flex py-1>
			<h3 class="mr-3">
				<template v-if="maxInqs - totalInqs > 1 || maxInqs - totalInqs == 0">
					<v-icon class="mr-2">fas fa-clipboard-list</v-icon>
					{{ maxInqs - totalInqs }} out of {{ maxInqs }} Inquiries remaining.
				</template>
				<template v-if="maxInqs - totalInqs == 1">
					<v-icon class="mr-2">fas fa-clipboard-list</v-icon>
					Only 1 Inquiry remaining.
				</template>
			</h3>			
		</v-flex>
	</v-layout>

	<upgrade-account-dialog :openDialog.sync="openDialog"></upgrade-account-dialog>

		
</div>
</template>

<script>

import UpgradeAccountDialog from "@/views/Components/App/Buyer/UpgradeAccountDialog";

export default {
components:{
	UpgradeAccountDialog,
},

props:[	
	'totalInqs',
	'maxInqs',
	'package_type',
],

data(){return{
	openDialog:false,
}},

created(){

},


methods:{

	packageType(p_type){
		var retVal = "FREE TRIAL";

		if(p_type=='monthly.mini')
		retVal = 'MINI / Monthly';
		else if(p_type=='yearly.mini')
		retVal = 'MINI / Yearly';

		else if(p_type=='monthly.standard')
		retVal = 'STANDARD / Monthly';
		else if(p_type=='yearly.standard')
		retVal = 'STANDARD / Yearly';
	
		else if(p_type=='monthly.premium')
		retVal = 'PREMIUM / Monthly';
		else if(p_type=='yearly.premium')
		retVal = 'PREMIUM / Yearly';

		return retVal;
	},

},



}
</script>

<style scoped lang="scss">
	
</style>