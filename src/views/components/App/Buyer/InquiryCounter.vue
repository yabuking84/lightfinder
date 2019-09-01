<template>
<div>
		
	<!-- <v-alert 
	class="mx-3"
	color="black" 
	icon="fas fa-clipboard-list"
	:value="true">
	</v-alert> -->

	<v-layout 
	style=""
	row justify-center align-center mx-3 my-0 px-4 py-2>
		
		<v-flex pr-4>
			<v-layout row wrap justify-center align-center>		  
				<h3 
				style="width: 200px;text-align: left;" 
				class="mr-3">PACKAGE: {{ packageType(package_type) }}
				</h3>				

				<v-btn 
				@click="openDialog=true"				
				color="green darken-2" 
				class="white--text">
					UPDGRADE NOW!
				</v-btn>
			</v-layout>
		</v-flex>

		<v-flex py-1 pl-5>
			<h3 class="mr-3">
				<template v-if="max_inquiry - totalInqs > 1 || max_inquiry - totalInqs == 0">
					<v-icon class="mr-2">fas fa-clipboard-list</v-icon>
					LightFinder Inquiries: {{ max_inquiry - totalInqs }} remaining out of {{ max_inquiry }}
				</template>
				<template v-else-if="max_inquiry - totalInqs == 1">
					<v-icon class="mr-2">fas fa-clipboard-list</v-icon>
					<!-- Only 1 Inquiry remaining. -->
					LightFinder Inquiries: {{ max_inquiry - totalInqs }} remaining out of {{ max_inquiry }}
				</template>
				<template v-else>
					<v-icon class="mr-2">fas fa-clipboard-list</v-icon>
					<!-- Only 1 Inquiry remaining. -->
					LightFinder Inquiries: {{ max_inquiry - totalInqs }} remaining out of {{ max_inquiry }}
				</template>
			</h3>			
		</v-flex>
	</v-layout>

	<upgrade-account-dialog :openDialog.sync="openDialog"></upgrade-account-dialog>

		
</div>
</template>

<script>

import UpgradeAccountDialog from "@/views/Components/App/Buyer/UpgradeAccountDialog";
import inqMixin from "@/mixins/inquiry";
import inqEvntBs from "@/bus/inquiry"

export default {
mixins:[
	inqMixin,
],

components:{
	UpgradeAccountDialog,
},


props:[	
],

data(){return{
	openDialog:false,

	
	
	'totalInqs': 0,
	'max_inquiry': 0,
	'package_type': 'free',

}},

created(){
	this.setMaxAndTotalInqs();	

	inqEvntBs.onFormSubmitted(()=>{
		this.setMaxAndTotalInqs();
	});
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


	setMaxAndTotalInqs(){
		this.getMaxInqs().then((rspns)=>{
			this.max_inquiry = rspns.max_inquiry;
			this.package_type = rspns.package_type;

			this.getTotalInqs().then((rspns)=>{
				this.totalInqs = rspns;
			});
		});
	},

	setTotalInqs(){
		
	},
},



}
</script>

<style scoped lang="scss">
	
</style>