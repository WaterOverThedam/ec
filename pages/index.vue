<template>
<main>
 <div class="ui middle aligned center aligned grid" >
    <div class="column" id='body'>
        <h2 class="ui teal header">
            <img class="img" src="logo.jpg" />
            <div class="content">OTS报表登录</div>
        </h2>
        <form class="ui large form">
            <div class="ui stacked segment">
                <div class="field">
                    <div class="ui left icon input">
                        <i class="user icon"></i>
                        <input id="username" type="text" name="email" v-model='user' placeholder="E-mail address" />
                    </div>
                </div>
                <div class="field">
                    <div class="ui left icon input">
                        <i class="lock icon"></i>
                        <input id="password" type="password" name="password" @keyup.enter="login()" v-model='pwd' placeholder="Password" />
                    </div>
                </div>
                <div id="login" class="ui fluid large teal submit button" @click="login()">登录</div>
            </div>

            <div class="ui error message"></div>

        </form>

    </div>
  </div>
</main>
 
</template>

<script>
 
import { mapMutations } from 'vuex'

export default {
  head:{
    title:"登陆",
	script: [
        {src: 'js/gym.js'}
    ],
    link: [
        { rel:'stylesheet',type:'text/css',href:'css/index.css'},
    ]
  },
  computed:{
    cur_menu(){
      return this.$store.state.cur_menu;
    },
    menu(){
      return this.$store.state.menu;
    },
    logins(){
      return this.$store.state.login;
    }
  },
  data () {
    return {
      user:"",
      pwd:""
    }
  },
  
  methods: {
    ...mapMutations([
      "auth",
      "menuChange"
      ]),
          
      login(){
           this.logins.map(log =>{
              if(log.user==this.user && log.pwd==this.pwd){
                  log.auth=true;
              }
           })
           //alert(JSON.stringify(this.logins))
           this.auth();
           if(this.logins[0].auth){
              this.$router.push('/home')
              return 1;
           }
           if(this.logins[1].auth){
              this.menuChange(this.menu[1])
              this.$router.push('/sales')
              return 1;
           }

            this.$alert('<strong style="padding-left:20px;font-size:25px">用户密码不正确</strong>',"警告", {
                    title:"警告",
                    dangerouslyUseHTMLString: true,
                    center:true,
                    type:'error',
                    confirmButtonText:"确定",
                    roundButton:true
            })
            this.user="";
            this.pwd="";
      }
  }
}
</script>

<style scoped>
 
#body{
    position:absolute;
    left:0;
    right:0;
    top:20%;
    bottom:0;
    margin:auto;
}
.column {
    max-width: 450px;
}
 
 
</style>