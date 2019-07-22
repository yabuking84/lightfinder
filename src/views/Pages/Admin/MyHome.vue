<template>
	<div>
		<v-container fluid grid-list-xl>
			<v-layout row wrap>
				<v-flex>
					<h3 class="white--text">My Home</h3>
				</v-flex>
				<v-flex xs12>
					<project-table></project-table>
				</v-flex>
			</v-layout>
		</v-container>
	</div>
</template>



<script>


import ProjectTable from '@/views/Components/App/MyHome/ProjectTable'


export default {
	components: {
		ProjectTable,
	},

	data: () => ({
	
	}),

}
	
</script>



