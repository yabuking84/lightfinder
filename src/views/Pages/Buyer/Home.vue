<template>
<div>

	<!-- CHANGE THIS!! THIS IS HOME VIEW FROM ADMIN -->
	<!-- CHANGE THIS!! THIS IS HOME VIEW FROM ADMIN -->
	<!-- CHANGE THIS!! THIS IS HOME VIEW FROM ADMIN -->

		<v-container fluid grid-list-xl>

			<v-layout row wrap justify-space-between align-center>
				
				<inquiry-counter :totalInqs="totalInqs" :maxInqs="maxInqs" :package_type="package_type"></inquiry-counter>
				
				<v-btn 
				flat
				value="Create Inquiry" 
				title="Create Inquiry"  
				@click="checkUserInquiry()"
				style=""
				:loading="inqBtnLoading"
				class="black white--text">
					<v-icon style="font-size: 1em;" class="ma-0">fas fa-plus-circle</v-icon>
					Create Inquiry
			    </v-btn>		            
		        
			</v-layout>

			<v-layout row wrap>
		        <v-flex xs12>
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

import InquiryCounter from "@/views/Components/App/Buyer/InquiryCounter";

import NoInqRemainingDialog from "@/views/Components/App/Buyer/NoInqRemainingDialog";
import inqEvntBs from "@/bus/inquiry"

export default {
	
components: {
    BarCards,
    InquiriesTableGrid,
    PendingPaymentTable,
    SampleOrderTable,
    ConfirmedOrderTable,
    InquiryCreate,
    InquiryCounter,
    NoInqRemainingDialog,
},

data: () => ({
	title: 'Home',
	openInquiryCreate: false,
	successSnackbar:false,
	noInqRemainingDialog: false,
	
	'defaultMaxInqs': 1,
	'totalInqs': 0,
	'maxInqs': 0,
	'package_type': 'free',

	inqBtnLoading: false,
}),

computed: {

},

created() {
	this.setMaxInqs();
	this.setTotalInqs();

	inqEvntBs.onFormSubmitted(()=>{
		this.setMaxInqs();
		this.setTotalInqs();		
	});	
},

methods:{

	checkUserInquiry(){
		this.inqBtnLoading = true;

		this.setMaxInqs().then((rspns)=>{			
			this.setTotalInqs().then((rspns)=>{
				// this.cnsl(this.maxInqs+" - "+this.totalInqs);
				if(this.maxInqs-this.totalInqs > 0)
				this.openInquiryCreate = true;
				else {
					this.openInquiryCreate = false;
					this.noInqRemainingDialog = true;					
				}
				
				this.inqBtnLoading = false;
			});
		});
	},


	setMaxInqs(){
		return new Promise((resolve, reject) => {			
			this.$store.dispatch(this.getStore()+'/getActiveSubscription_a')
			.then((rspns)=>{
				this.cnsl('rspns',rspns);
				
				if(rspns) {
					this.maxInqs = rspns.inclusions.max_inquiry;
					this.package_type = rspns.package_type;
				}
				else {
					// if no / free subscription
					this.maxInqs = this.defaultMaxInqs;
					this.package_type = 'free';
				}

				resolve();
			})
			.catch((e)=>{
				this.cnsl(e);
				reject(e);
			});
		});
	},

	setTotalInqs(){
		return new Promise((resolve, reject) => {			
			this.$store.dispatch(this.getStore()+'/getInquiries_a')
			.then((rspns)=>{
				// this.cnsl('Inquiries ',rspns);
				if(rspns.length)
				this.totalInqs = rspns.length;
				else
				this.totalInqs = 0;
				resolve();
			})
			.catch((e)=>{
				this.cnsl(e);
				reject(e);
			});
		});
	},	
},


}

</script>

