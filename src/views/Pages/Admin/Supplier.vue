<template>
	<div>
		<v-layout row wrap>
			<v-container fluid>
				<!-- supplier table -->
					<supplier-table> </supplier-table>
				<!-- supplier table -->

			</v-container>	
		</v-layout>
	</div>
	
</template>

<script>
	
	import SupplierTable from '@/views/components/app/Admin/SupplierTable'

	export default {

		data () {
			return {
			}
		},

		components: {

			SupplierTable,

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