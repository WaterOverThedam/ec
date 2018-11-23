<template>
 <div class="ui  thin sidebar left inverted vertical menu">
    <div @click="test()" class="header item">
        <img class="logo" src="~/assets/logo.jpg" />
    </div>
    <a href="http://ots.thelittlegym.com.cn:81/plugin/" class="item"><i class="reply icon"></i>返回主页</a>
    <a v-for="m of menu" href="javascript:" class="item" @click="swithPage(m)">{{m.name}}
      <i v-if="m.name==cur_menu.name" class="browser icon"></i>
    </a>
  </div>
</template>

<script>
 
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
    }
  },
  data () {
    return {

    }
  },
  components: {

 
  },
  methods: {
    test(){
       alert(JSON.stringify(this.cur_menu))
    },
    swithPage(m){
      this.menuChange(m);
      this.$router.push('/'+m.id);

    },
    ...mapMutations([
      "menuChange"
      ])
  },
  mounted(){
 
  } 
 
}
</script>