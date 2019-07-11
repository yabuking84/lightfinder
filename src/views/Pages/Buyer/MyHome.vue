<template>
	<div>
		<v-container fluid grid-list-xl>
			<v-layout row wrap>
				<v-flex>
					<h3 class="white--text">My Home</h3>
				</v-flex>
				<v-flex xs12>
					<project-inquiry-table></project-inquiry-table>
				</v-flex>
			</v-layout>
		</v-container>
	</div>
</template>



<script>


import ProjectInquiryTable from '@/views/Components/App/Buyer/MyHome/ProjectInquiryTable'


export default {
	components: {
		ProjectInquiryTable,
	},

	data: () => ({
	
	}),

}
	
</script>



