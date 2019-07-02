<template>
  
  <v-layout row column>
    
      <a class="socialbox pinterest" @click=LoginwithGoogle>
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

<script>

        let OAUTHURL    =  "https://accounts.google.com/o/oauth2/auth?"
        let VALIDURL    =  "https://www.googleapis.com/oauth2/v1/tokeninfo?access_token="
        let SCOPE       =  "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email"
        let CLIENTID    =  "767693280692-o91eaup2r5ubtt23bks9re4oe9i46ujm.apps.googleusercontent.com"
        let REDIRECT    =  "https://buyanylight.com"
        let LOGOUT      =  "http://accounts.google.com/Logout"
        let TYPE        =  "token"
        let URL         =  OAUTHURL + 'scope=' + SCOPE + '&client_id=' + CLIENTID + '&redirect_uri=' + REDIRECT + '&response_type=' + TYPE
        let ACTOKEN     =  ""
        let TOKENTYPE   =  ""
        let EXPIRESIN   =  ""
        let USER        =  ""
        let LOGGEDIN    =  false

  export default {

    data() {
      return { } ;  
    },

     methods: {

        LoginwithGoogle() {

              var win         =   window.open(URL, "windowname1", 'width=600, height=600'); 
              var pollTimer   =   window.setInterval(function() { 

               try {

                      if (win.document.URL.indexOf(REDIRECT) != 1) {
                          window.clearInterval(pollTimer);
                          var url =   win.document.URL;
                          ACTOKEN =   Gup(url, 'access_token');
                          TOKENTYPE = Gup(url, 'token_type');
                          EXPIRESIN = Gup(url, 'expires_in');
                          this.ValidateToken(ACTOKEN);
                          win.close();

                      }
                  } catch(e) {
                    this.cnsl(e)
                  }
              }, 100);

        },

        ValidateToken(token) {


              axios({
                  method: 'post',
                  url: VALIDURL + token,
                  data: null,
              })
              .then(response => {
                  alert(response)
                  resolve(response);
              })
              .catch(error => {
                  reject(error)
              })

        },


        GetGoogleInfo() {
            axios({
                method: 'post',
                url: "https://www.googleapis.com/oauth2/v1/userinfo?access_token" + ACTOKEN,
                data: null,
            })
            .then(response => {
                alert(response)
                resolve(response);
            })
            .catch(error => {
                reject(error)
            })

        },

        Gup(url, name) {

          name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
          var regexS = "[\\#&]"+name+"=([^&#]*)";
          var regex = new RegExp( regexS );
          var results = regex.exec( url );
          if( results == null )
              return "";
          else
              return results[1];
        },

        LogoutPolling() {

        },

        /////////////////////////////////////////////////////////////////////////////////

        LoginwithLinkedin() {
          
        },

        GetProfileDataforLInkedin() {
            LOGGEDIN = false;
        },

    },

    computed: {


    }
  }
</script>



















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
