<template>
	<div>
		<v-layout row wrap>
			<v-container fluid>

				<v-layout row wrap>
					<v-spacer></v-spacer>
				    <div> <v-btn @click="dialog=true" class="font-weight-light" dark color="grey darken-4"><i class="fas fa-user-plus white--text"></i>&nbsp Add Supplier </v-btn> </div>
				</v-layout>
				
				<!-- supplier table -->
					<supplier-table> </supplier-table>
				<!-- supplier table -->

			</v-container>	
		</v-layout>

		<!-- supplier dialog -->
		<supplier-dialog :dialog.sync="dialog"> </supplier-dialog>
		<!-- supplier dialog -->

	</div>
	
</template>

<script>
	
	import SupplierTable from '@/views/components/app/Admin/SupplierTable'
	import SupplierDialog from '@/views/components/app/Admin/SupplierDialog'

	export default {

		data () {
			return {
				dialog: false,
				items: [
		        {
		          text: 'Dashboard',
		          disabled: false,
		          href: 'breadcrumbs_dashboard'
		        },
		        {
		          text: 'Link 1',
		          disabled: false,
		          href: 'breadcrumbs_link_1'
		        },
		        {
		          text: 'Link 2',
		          disabled: true,
		          href: 'breadcrumbs_link_2'
		        }
		      ],
			}
		},

		components: {

			SupplierTable,
			SupplierDialog

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