<template>
	<div>
		<v-layout row wrap>
			<v-container fluid>	

					<inquiries-grid> </inquiries-grid>
				
			</v-container>	
		</v-layout>
	</div>
	
</template>

<script>
	
	import InquiriesGrid from '@/views/components/app/Admin/InquiriesGrid'

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

			InquiriesGrid,

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