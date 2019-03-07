<template>
	<div>
		<v-layout row wrap>
			<v-container fluid>

				<v-layout row wrap>
					<v-spacer></v-spacer>
				    <div> <v-btn @click="dialog=true" class="font-weight-light" dark color="grey darken-4"><i class="fas fa-search white--text"></i>&nbsp Add Inquiry </v-btn> </div>
				</v-layout>

				<!-- inquiry table -->
					<inquiry-table> </inquiry-table>
				<!-- inquiry table -->
				
			</v-container>	
		</v-layout>
	</div>
	
</template>

<script>
	
	import InquiryTable from '@/views/components/app/Admin/InquiryTable'

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

			InquiryTable,
			

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