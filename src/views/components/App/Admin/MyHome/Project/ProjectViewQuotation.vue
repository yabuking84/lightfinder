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
			<p class="mt-2">{{ project.description }}</p>
		</v-flex>
	</v-layout>

</span>	
</template>


<script>

export default {

components:{
},

props:{
	'project':{
		type: Object,
		required: true,
	},
},

data(){return{

}},



}
</script>