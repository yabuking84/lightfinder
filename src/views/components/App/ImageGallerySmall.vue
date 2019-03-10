<template>
<div>
        <v-card id="product" >
            <swiper :options="swiperOptionTop" class="gallery-top" ref="swiperTop" style="">
                <swiper-slide v-for="(image,i) in images" :key="'image_'+i" class="slide-img" >
                    <img :src="image.link" alt="" :style="imgStyle">
                </swiper-slide>
                <div class="swiper-button-next" slot="button-next">
                	 <v-icon>fas fa-chevron-right</v-icon>
                </div>
                <div class="swiper-button-prev" slot="button-prev">
                	 <v-icon>fas fa-chevron-left</v-icon>
                </div>
            </swiper>
            <!-- swiper2 Thumbs -->
            <swiper :options="swiperOptionThumbs" class="gallery-thumbs" :class="{hide:noThumbnails}" ref="swiperThumbs">
                <swiper-slide v-for="image in images" :key="image.index" class="slide-img">
                    <img :src="image.link" alt="">
                </swiper-slide>
            </swiper>
        </v-card>
</div>
</template>















<script>
	
// require styles
import 'swiper/dist/css/swiper.css'


import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
	components: {
		swiper,
		swiperSlide
	},

	props:{
		noThumbnails:{
			type: Boolean,
			default: false,
		},
		height: {
			type: String,
			default: null,
		}
	},

	data: ()=>({
        images: [ 
	        {
	            index: 0, 
	            link: "https://almani.ae/assets/images/products/led-downlights-heitersheim-al-do-0001-7599.jpg?v=1.58"
	        }, 
	        {
	            index: 1, 
	            link: "https://almani.ae/assets/images/products/led-downlights-heitersheim-al-do-0001-7598.jpg?v=1.58"
	        }, 
	        {
	            index: 2, 
	            link: "https://almani.ae/assets/images/products/led-downlights-heitersheim-al-do-0001-7600.jpg?v=1.58"
	        }, 
	        {
	            index: 3, 
	            link: "https://almani.ae/assets/images/products/led-downlights-heitersheim-al-do-0001-7021.jpg?v=1.58"
	        }
        ],

	    imgStyle: null,

	    swiperOptionTop: {
	        initialSlide: 1, 
	        spaceBetween: 20, 
	        navigation: {
	            nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev"
	        }
	    }, 
	    swiperOptionThumbs: {
	        initialSlide: 1, 
	        spaceBetween: 20, 
	        centeredSlides: true, 
	        slidesPerView: "auto", 
	        touchRatio: 0.2, 
	        slideToClickedSlide: true,
	    }
	}),

	created(){


		this.images = this.images.sort( () => Math.random() - 0.5);

		// set height of images
		if(this.height) {
			this.imgStyle = {
				height: this.height,
				width: 'auto',
		    };
		} else {
			this.imgStyle = {
				height: 'inherit',
				width: 'inherit',
		    };			
		}
		
	},

	mounted() {
	    this.$nextTick(()=> {
	        const swiperTop=this.$refs.swiperTop.swiper;
	        const swiperThumbs=this.$refs.swiperThumbs.swiper;
	        swiperTop.controller.control=swiperThumbs;
	        swiperThumbs.controller.control=swiperTop;
	    }
	    );
	}    	
}
</script>





<style scoped lang="scss">
.gallery-top {
  height: auto;
  width: 80%;
}
.gallery-thumbs {
  height: 20% !important;
  width: 80%;
}
.gallery-thumbs .swiper-slide {
  width: 100px;
  height: 100px;
  opacity: 0.4;
  cursor: pointer;
}
.gallery-thumbs .swiper-slide-active {
  	opacity: 1;
	
}

img {
  width: inherit;
  height: inherit;
}
.swiper-button-prev {
  // background-image: url("data:image/svg+xml;charset=utf-8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 27 44'><path d='M0,22L22,0l2.1,2.1L4.2,22l19.9,19.9L22,44L0,22L0,22L0,22z' fill='#E78127'/></svg>") !important;
}

.swiper-button-next {
  // background-image: url("data:image/svg+xml;charset=utf-8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 27 44'><path d='M27,22L27,22L5,44l-2.1-2.1L22.8,22L2.9,2.1L5,0L27,22L27,22z' fill='#E78127'/></svg>") !important;
}
#product {
  width: auto;
}

.swiper-button-prev ,
.swiper-button-next {
	outline: none;
    cursor: pointer;
    background-image: none;
    color: #000;
}

.swiper-button-prev, 
.swiper-container-rtl .swiper-button-next {
    left: 0px;
    right: auto;	
}


.swiper-button-next, 
.swiper-container-rtl .swiper-button-prev {
	right: 0px;
    left: auto;
}


.swiper-slide {
	text-align:center;
}

.hide {
	opacity: 0 !important;
}

.theme--light.v-icon {
    color: #000;
}

</style>


<style lang="scss">
	.application--wrap {
		min-height: 0;
	}
</style>
