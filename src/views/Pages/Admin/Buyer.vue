<template>
	<div>
		<v-layout row wrap>
			<v-container fluid>
				
				<v-layout row wrap>
					<v-spacer></v-spacer>
				    <div> <v-btn @click="dialog=true" class="font-weight-light" dark color="grey darken-4"><i class="fas fa-user-plus white--text"></i>&nbsp Add Buyer </v-btn> </div>
				</v-layout>
					
				<!-- buyer table -->
					<buyer-table> </buyer-table>
				<!-- buyer table -->

			</v-container>	

		</v-layout>

		<!-- buyer dialog -->
		<buyer-dialog :dialog.sync="dialog"> </buyer-dialog>
		<!-- buyer dialog -->
		
	</div>

</template>

<script>
	
	import BuyerTable from '@/views/components/app/Admin/BuyerTable'
	import BuyerDialog from '@/views/components/app/Admin/BuyerDialog'

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

			BuyerTable,
			BuyerDialog

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