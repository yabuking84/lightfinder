<template>
<span>


	
</span>
</template>

<script>
import Foloosi from "@/assets/foloosipay.v2.js";

export default {

data(){return{
	paymentResponse:null,
	faloosi:null,
}},

mounted(){
    var options = {
        "reference_token" : "U0sjdGVzdF8kMnkkMTAkLjBURmxxRnhNN3kuM0dvSGtESXFXZU8tMmJUMmVCejh0ODZQVlVrSHdIOXpNZ2hEbTVQTGkcVE4jRkxTQVBJNWQ0MmUwZDc4ZTczMRxSVCMkMnkkMTAkL0Mway5tLmRTMTBkZlRVTlVOTUFDdUEwTFVkTC5oS0pRcUREdkNIamEybks5d05seEdYMTY=", //which is get from step2
        "merchant_key" : "test_$2y$10$6y-ZLiiHp69EUB2xA85U2e2rKj.OgKo6MWYgxsqDifTqmxzLbUAN2"
    }
    
    this.faloosi = new Foloosi.Foloosipay(options);
    this.paymentResponse = this.faloosi.open();
},


}</script>

<style scoped lang="scss">
	
</style>