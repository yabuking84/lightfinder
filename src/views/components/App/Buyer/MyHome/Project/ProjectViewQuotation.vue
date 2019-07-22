<template>
<span>
		
	
	<v-layout row wrap>
		<v-flex xs6>                			
			<span class="body-1 mr-2">Project Type: </span>
			<span class="subheading font-weight-bold">{{ project.type }}</span>
		</v-flex>
		<v-flex xs6>                			
			<span class="body-1 mr-2">Target Budget: </span>
			<span class="subheading font-weight-bold">${{ currency(project.budget) }}</span>
		</v-flex>
		<v-flex xs12>
			<p class="mt-2" style="min-height: 150px;">{{ project.description }}</p>
		</v-flex>
		
		<v-flex xs12>

		</v-flex>
	</v-layout>

</span>	
</template>


<script>


export default {

props:[
	'project',
],

data(){return{
	// project: {
	// 	project_name: null,
	// 	project_no: null,
	// 	project_type: null,
	// 	target_budget: null,
	// 	shipping_method: null,
	// 	description: null,
	// },
}},



}
</script>