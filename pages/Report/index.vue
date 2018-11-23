<template>
 <main>
    <Menu></Menu>
    <div class="pusher" id="box">
        <div class="ui masthead  segment">
            <div class="ui container">
                <div class="ui breadcrumb">
                    <a class="section" id="menu">报表</a>
                    <i class="right chevron icon divider"></i>
                    <div class="active section" v-text="cur_menu.name"></div>
                </div>
            </div>
        </div>
        <div class="ui container">
            <div class="ui segments">
                <div class="ui segment">
                    <div class="ui one column stackable grid">
                        <div class="column">
                            <div class="ui tabular menu">
                                <a v-for="s of cur_menu.submenus" class="item" :data-id="s.id" @click="submenu=s.id"  :class="{'active':s.active}">
                                {{s.name}}</a>
                            </div>
                        </div>
                    </div>
                </div>
                <component :is="submenu" > </component>    
            </div>
        </div>
    </div>
    
 </main>
 
</template>

<script>

 
import ReptXSBM from '~/components/ReptXSBM'
import Menu from '~/components/Menu'
import Form from '~/components/Form'
import { mapMutations } from 'vuex'
import { mapActions } from 'vuex'

export default {
  head:{
    title:"OTS报表",
	script: [
        {src: 'js/gym.js'}
        
    ]
  },
  computed:{
    cur_menu(){
      return this.$store.state.cur_menu;
    },
    menu(){
      return this.$store.state.menu;
    },
    loginInf(){
      return this.$store.state.cur_user;
    }
  },
  data () {
    return {
      submenu:'ReptXSBM'
    }
  },
  components: {
    ReptXSBM,
    Menu,
    Form
  },
  
  methods: {
    test(){
       //alert(JSON.stringify(this.cur_menu))
    },
    ...mapMutations([
      "tester"
      ]),
    ...mapActions([
      "incrementAsync"
      ])
  },
  mounted(){
    if(!this.loginInf.auth){
        this.$alert('<strong style="padding-left:20px;font-size:25px">请登陆系统！</strong>',"警告", {
            title:"警告",
            dangerouslyUseHTMLString: true,
            center:true,
            type:'error',
            confirmButtonText:"确定",
            roundButton:true
        })
        this.$router.push('/')
    }
    $("#menu").on('click', function () {
        $(".ui.sidebar").sidebar('toggle');
    });
  } 
 
}
</script>

<style scoped>

   .ui.container{
       width:85%!important;
   }
  
  @media screen and (max-width:767px){
    main {
      margin-top: 8%;
    }
  }

 
</style>