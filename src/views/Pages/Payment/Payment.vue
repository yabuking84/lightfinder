<template>
<span>

	
</span>
</template>

<script>
import FoloosiPay from "@/assets/foloosipay.v2.js";

export default {

created(){
    var options = {
        "reference_token" : "U0sjdGVzdF8kMnkkMTAkLjBURmxxRnhNN3kuM0dvSGtESXFXZU8tMmJUMmVCejh0ODZQVlVrSHdIOXpNZ2hEbTVQTGkcVE4jRkxTQVBJNWQ0MmQ1MzRiY2YwMhxSVCMkMnkkMTAkMmkweFMzZGFOc2t2WURFOGdsVzlmdVoxc3ZaZGZJdHRCRUtLMmJGczRFL0ZHU0pITERGUjY=", //which is get from step2
        "merchant_key" : "test_$2y$10$6y-ZLiiHp69EUB2xA85U2e2rKj.OgKo6MWYgxsqDifTqmxzLbUAN2"
    }
    
    var fp1 = new Foloosipay(options);
    fp1.open();

},


}</script>

<style scoped lang="scss">
	
</style>