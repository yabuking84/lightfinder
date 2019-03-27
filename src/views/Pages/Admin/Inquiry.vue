<template>
	<div>
		<v-layout row wrap>
			<v-container fluid>	

				<!-- inquiry table -->
					<inquiries-table> </inquiries-table>
				<!-- inquiry table -->
				
			</v-container>	
		</v-layout>
	</div>
	
</template>

<script>
	
	import InquiriesTable from '@/views/components/app/Admin/InquiriesTable'

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

			InquiriesTable,

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