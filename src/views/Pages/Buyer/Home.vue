<template>
<div>

	<v-container fluid grid-list-xl pt-3>

		<v-layout row wrap justify-end align-center mb-0 mt-0>

				<user-details-dev></user-details-dev>

				<v-btn 
				large
				value="Create Inquiry" 
				title="Create Inquiry"  
				@click="checkUserInquiry()"
				style="width:170px; height:55px;"
				:loading="inqBtnLoading"
				class="black white--text">
					<v-icon style="font-size: 1.7em;" class="ma-0 mr-4">
						fas fa-plus-circle
					</v-icon>
					<span style="text-align:left; line-height: 1em;">
						CREATE<br>&nbsp;INQUIRY
					</span>
			    </v-btn>

		</v-layout>

		<v-layout row wrap>
	        <v-flex xs12 style="position: relative;">

	            <bar-cards></bar-cards>
	        </v-flex>
		</v-layout>


		<v-layout row wrap align-space-around justify-space-between fill-height>
            <v-flex xs7>
           		<inquiries-table-grid>
           			<template v-slot:statuses>&nbsp;</template>
           		</inquiries-table-grid>
            </v-flex>

			<v-flex xs5>
           		 <pending-payment-table> </pending-payment-table>	
		    </v-flex>
		</v-layout>


		<v-layout row wrap align-space-around justify-space-between fill-height>
            <v-flex xs6>
           		<sample-order-table></sample-order-table>
            </v-flex>

			<v-flex xs6>
           		<confirmed-order-table> </confirmed-order-table>	
		    </v-flex>
		</v-layout>

	</v-container>


<inquiry-create :snackBar.sync="successSnackbar" :dialog.sync="openInquiryCreate"></inquiry-create>
<no-inq-remaining-dialog :openDialog.sync="noInqRemainingDialog"></no-inq-remaining-dialog>
</div>
</template>

<script>

import BarCards from '@/views/Components/App/Buyer/BarCards'
import InquiriesTableGrid from '@/views/Components/App/InquiriesTableGrid'
import PendingPaymentTable from '@/views/Components/App/Buyer/PendingPaymentTable'
import SampleOrderTable from '@/views/Components/App/Buyer/SampleOrderTable'
import ConfirmedOrderTable from '@/views/Components/App/Buyer/ConfirmedOrderTable'
import InquiryCreate from "@/views/Components/App/Buyer/InquiryCreate";


import UserDetailsDev from '@/views/Components/App/UserDetailsDev'

import NoInqRemainingDialog from "@/views/Components/App/Buyer/NoInqRemainingDialog";
import inqEvntBs from "@/bus/inquiry"

import config from "@/config/main"
import tblBs from "@/bus/table"
import VueTimers from 'vue-timers/mixin'

import inqMixin from "@/mixins/inquiry"

export default {

mixins: [
	VueTimers,
	inqMixin,
],
	
components: {
    BarCards,
    InquiriesTableGrid,
    PendingPaymentTable,
    SampleOrderTable,
    ConfirmedOrderTable,
    InquiryCreate,
    NoInqRemainingDialog,    
	UserDetailsDev,
},


// so there tables will refresh every 5min regardless
timers: [{
    name: 'RefershTables',
    time: config.polling.default.time,
    repeat: true,
    autostart: true,
    callback: function() {
    	tblBs.emitRefreshTablePolling();
    },
}],

data: () => ({
	title: 'Home',
	openInquiryCreate: false,
	successSnackbar:false,
	noInqRemainingDialog: false,

	inqBtnLoading: false,
}),

computed: {

},

created() {

	// start polling
	this.$timer.start('RefershTables');
},

methods:{

	checkUserInquiry(){
		this.inqBtnLoading = true;

		this.getMaxInqs().then((rspns)=>{
			var max_inquiry = rspns.max_inquiry;
			var package_type = rspns.package_type;

			this.getTotalInqs().then((rspns)=>{
				var totalInqs = rspns;

				if(max_inquiry-totalInqs > 0) {
					this.openInquiryCreate = true;					
				}
				else {
					this.openInquiryCreate = false;
					this.noInqRemainingDialog = true;					
				}
				
				this.inqBtnLoading = false;
			});
		});
	},

	
},


}

</script>

