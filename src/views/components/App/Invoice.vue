<template>
<div>


	<br><br><br>


    <div class="invoice-box" ref="invoiceBox">
        <table cellpadding="0" cellspacing="0">
            <tr class="top">
                <td colspan="2">
                    <table>
                        <tr>
                            <td class="title">
                            	<v-layout align-center justify-start row>
                                <img 
                                class="mr-3"
                                style="width:100%; max-width:110px;"
                                src="/static/logos/logo-black.png" 
                                id="nav_logo_square" 
                                title="BuyAnyLight.com">
                                <h3>BuyAnyLight</h3>
                            	</v-layout>
                            </td>
                            
                            <td>
                                Invoice #: 5612332479<br>
                                Created: January 1, 2015<br>
                                Due: February 1, 2015
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            
            <tr class="information">
                <td colspan="2">
                    <table>
                        <tr>
                            <td>
                                Sparksuite, Inc.<br>
                                12345 Sunny Road<br>
                                Sunnyville, CA 12345
                            </td>
                            
                            <td>
                                Acme LED Corp.<br>
                                Ryan Dakoutin<br>
                                r.dakoutin@alc.com
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr class="heading">
                <td>Payment Method</td>                
                <td>Bank Transfer #</td>
            </tr>
            
            <tr class="details">
                <td>Bank Transfer</td>                
                <td>100-234-2321-12</td>
            </tr>
            
        </table>


        <table class="itemsTable" cellpadding="0" cellspacing="0">            

            <tr class="heading">
                <td>Item</td>                
                <td>Quantity / Length</td>                
                <td>Price</td>
            </tr>
            
            <tr
            v-for="(item, i) in items"
            :key="'items_'+i"
            class="item">
                <td>{{ item.title }}</td>
                <td>{{ item.qty }}</td>
                <td>{{ item.price }}</td>
            </tr>
            
            <tr class="total">
                <td></td>                
                <td></td>                
                <td>Total: $112201.15</td>
            </tr>
        </table>
    </div>

    <br>
	
	<h3 style="text-align:center;">
    <v-btn @click="convertToPDF()">Download PDF</v-btn>
	</h3>

    <br><br>



</div>
</template>

<script>
import html2pdf from "html2pdf.js";
export default {

	data: function() {return{
		items:[
			{
				title:  "LED lights",
				qty:    "40pcs",
				price:  "$3001.05",
			},
			{
				title:  "Strip Lights",
				qty:    "120m",
				price:  "$750.00",
			},
			{
				title:  "Park Lights",
				qty:    "12pcs",
				price:  "$1450.10",
			},
			{
				title:  "Garden Lights",
				qty:    "120pcs",
				price:  "$10450.10",
			},

		],
	}},


	methods:{
		convertToPDF: function() {
			// var element = document.getElementById(test);
			// html2pdf(this.$refs.invoiceBox, {
			// 	margin:       [0.5, 0, 0, 0,],
			// 	filename:     'invoice_5612332479.pdf',
			// 	image:        { type: 'jpeg', quality: 1 },
			// 	html2canvas:  { dpi: 192, letterRendering: true },
			// 	jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
			// });

			const doc = new jsPDF();
			/** WITHOUT CSS */
			const contentHtml = this.$refs.content.innerHTML;
			doc.fromHTML(
				contentHtml, 
				15, 
				15, 
				{
					width: 170
				},
			);
			doc.save("invoice_5612332479.pdf");
		}	
	},

}
</script>


<style scoped lang="scss">
.invoice-box {
    // max-width: 800px;
    // border: 1px solid #eee;
    // box-shadow: 0 0 10px rgba(0, 0, 0, .15);
    max-width: 90%;
    border: 0;
    margin: auto;
    padding: 30px;
    font-size: 16px;
    line-height: 24px;
    font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
    color: #555;
}

.invoice-box table {
    width: 100%;
    line-height: inherit;
    text-align: left;
}

.invoice-box table td {
    padding: 5px;
    vertical-align: top;
}

.invoice-box table tr td:nth-child(2) {
    text-align: right;
}

.invoice-box table tr.top table td {
    padding-bottom: 20px;
}

.invoice-box table tr.top table td.title {
    font-size: 45px;
    line-height: 45px;
    color: #333;
}

.invoice-box table tr.information table td {
    padding-bottom: 40px;
}

.invoice-box table tr.heading td {
    background: #eee;
    border-bottom: 1px solid #ddd;
    font-weight: bold;
}

.invoice-box table tr.details td {
    padding-bottom: 20px;
}

.invoice-box table tr.item td{
    border-bottom: 1px solid #eee;
}

.invoice-box table tr.item.last td {
    border-bottom: none;
}

.invoice-box table tr.total td:nth-child(2) {
    border-top: 2px solid #eee;
    font-weight: bold;
}

.invoice-box table.itemsTable {
	tr td:nth-child(2) {
		text-align: left;		
	}
	tr td:nth-child(3) {
		text-align: right;
	}
	tr.total td:nth-child(3) {
	    border-top: 2px solid #eee;
	    font-weight: bold;
	}
}


@media only screen and (max-width: 600px) {
    .invoice-box table tr.top table td {
        width: 100%;
        display: block;
        text-align: center;
    }
    
    .invoice-box table tr.information table td {
        width: 100%;
        display: block;
        text-align: center;
    }
}

/** RTL **/
.rtl {
    direction: rtl;
    font-family: Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
}

.rtl table {
    text-align: right;
}

.rtl table tr td:nth-child(3) {
    text-align: left;
}
</style>