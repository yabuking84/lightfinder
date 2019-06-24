<template>
	<div>
		<v-layout row wrap>
			<v-container fluid>
				<!-- buyer table -->
					<buyer-table> </buyer-table>
				<!-- buyer table -->
			</v-container>	
		</v-layout>

	</div>

</template>

<script>
	
	import BuyerTable from '@/views/Components/app/Admin/BuyerTable'

	export default {

		data () {
			return {
				
			}
		},

		components: {

			BuyerTable,

		},
		methods: {
			Sort: (param) => {
				alert(param);
			},	
			Refresh: (param) => {
				alert(param);
			}
		}
	}

</script>