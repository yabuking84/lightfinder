<template>
  
  <v-layout row column>
    
      <a class="socialbox pinterest"  href="javascript:void(0)">
        <div class="social-icon">
          <i style="color: white !important" class="fa fa-fw fa-google"></i>
        </div>
        <div class="description">
          <span class="ng-binding"></span>
          <span>SIGN UP WITH GOOGLE</span>
        </div>
      </a>

      <a class="white--text socialbox linkedin" href="javascript:void(0)">
        <div class="social-icon white--text">
          <i  style="color: white !important" class="fa fa-fw fa-linkedin"></i>
        </div>
        <div class="description">
          <span class="ng-binding"></span>
          <span>SIGN UP WITH LINKEDIN</span>
        </div>
      </a>
  </v-layout>
    

</template>


<style scoped>

.ls-1 {
  letter-spacing: 1px;
}

  a.socialbox {
  font-weight: 500;
  display: inline-block;
  text-decoration: none;
  color: white;
  padding: 12px 51px;
  width: 320px;
  margin: 24px 0 0 24px;
}

a.socialbox.pinterest {
  background-color: #c0392b;
  -webkit-transition: background-color 0.25s ease-in-out;
  transition: background-color 0.25s ease-in-out;
  border-radius: 50px;
  letter-spacing: 1px;
  font-weight: 300;
}

a.socialbox.linkedin {
  background-color: #1076bc;
  -webkit-transition: background-color 0.25s ease-in-out;
  transition: background-color 0.25s ease-in-out;
  border-radius: 50px;
  letter-spacing: .5px;
  font-weight: 300;
}

a.socialbox .social-icon {
  line-height: 32px;
  font-size: 20px;
  display: inline-block;
  vertical-align: middle;
  border-right: 1px solid rgba(255, 255, 255, 0.25);
  padding-right: 15px;
}

a.socialbox .description {
  display: inline-block;
  vertical-align: middle;
  padding-left: 10px;
  font-size: 13px;
}

a.socialbox .description span {
  display: block;
  line-height: 16px;
}

</style>
