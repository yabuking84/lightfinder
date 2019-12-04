

export default {

	computed:{

		package(){

			if(this.$route.meta.package_type=='my-home') {
				
				if(this.$route.meta.role == 3)
				return {
					title: 'My Home',
					routeName: {
						main:'BuyerMyHome',
						project:'BuyerMyHomeProject',
						orderSamples:'BuyerMyHomeOrderSamples',
						revisionView:'BuyerMyHomeRevisionView',
					},
				};
				else 
				if(this.$route.meta.role == 1)
				return {
					title: 'My Home',
					routeName: {
						main:'AdminMyHome',
						project:'AdminMyHomeProject',
						orderSamples:'AdminMyHomeOrderSamples',
						revisionView:'AdminMyHomeRevisionView',
						revisionEdit:'AdminMyHomeRevisionEdit',
						revisionCopy:'AdminMyHomeRevisionCopy',
					},
				};

			}
			else if(this.$route.meta.package_type=='my-tower') {
				if(this.$route.meta.role == 3)
				return {
					title: 'My Tower',
					routeName: {
						main:'BuyerMyTower',
						project:'BuyerMyTowerProject',
						orderSamples:'BuyerMyTowerOrderSamples',
						revisionView:'BuyerMyTowerRevisionView',
					},
				};
				else 
				if(this.$route.meta.role == 1)
				return {
					title: 'My Tower',
					routeName: {
						main:'AdminMyTower',
						project:'AdminMyTowerProject',
						orderSamples:'AdminMyTowerOrderSamples',
						revisionView:'AdminMyTowerRevisionView',
						revisionEdit:'AdminMyTowerRevisionEdit',
						revisionCopy:'AdminMyTowerRevisionCopy',
					},
				};
			}
			else 
			return {
				title: '',
				routeName: {},
			};
		},		
	},


}