<template>
  <div>
    <div class="ui segment">
        <div class="ui three column stackable grid">
            <div class="column left aligned">
                <div  id="gym" class="ui fluid search selection dropdown">
                    <input name="gym" type="hidden">
                    <i class="dropdown icon"></i>
                    <div class="default text" >请选择中心</div>
                    <div class="menu">
                        <div class="item" v-for="gym in gyms" :data-value="gym">{{gym}}</div>
                    </div>
                </div>
            </div>
            <div class="column left aligned">
                <div  id="course" class="ui fluid search selection dropdown">
                    <input name="course" type="hidden">
                    <i class="dropdown icon"></i>
                    <div class="default text" >请选择课程</div>
                    <div class="menu">
                        <div class="item" v-for="c in courses" :data-value="c.id">{{c.courseName}}</div>
                    </div>
                </div>
            </div>
            <div class="column right aligned" v-if="false">
                <div class="ui search">
                    <a class="ui icon input" id="1">
                        <input class="prompt" type="text" v-model="search" placeholder="关键字"/>
                        <i style="cursor:pointer" class="search icon"></i>
                    </a>
                </div>
                <div class="results"></div>
            </div>
            <div class="column left aligned">
                <div>
                    <a id="query" href="javascript:" class="ui primary button" @click="getUserGrade()">搜索</a>
                </div>
            </div>
        </div>
    </div>
    <div id="map" v-if="this.start==1" class="ui segment">
         <div style="text-align:center"><img src="http://tlgc.oss-cn-shanghai.aliyuncs.com/assert/img/loading.gif" width="40px" height="40px"></div>
    </div>
    <div class="ui segment" v-if="users">
        <table class="ui selectable celled table">
            <thead>
            <tr class="positive">
                <th v-for="(value,key) in users[0]" v-text="key"></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="user of users">
                <td v-for="(value,key) in user" v-text="value||'待提交'"></td>
            </tr>
            <tr v-if="users.length==0">
                <td  v-if="start==2" colspan="6" style="text-align: center">
                    <div  class="ui pointing red  label">
                        OOPS! No Record!
                    </div>
                </td>
                <td v-if="start==0" colspan="6" style="text-align: center">
                    <div  class="ui pointing   label">
                        请选择查询条件！
                    </div>
                </td>
            </tr>
            </tbody>
         
            <tfoot v-if="this.users.length">
                <tr>
                    <th colspan="8">
                        <div class="ui compact menu">
                            <a class="item">
                                <i class="icon users"></i> 老师人数
                                <div class="floating ui red label" v-text="this.users.length"></div>
                            </a>
                        </div>
                    </th>
                </tr>
            </tfoot>
        </table>
    </div>
</div>
</template>

<script>
 
export default {
  props:['bgColor'],
  computed:{
    menu(){
      return this.$store.state.menu;
    }
  },
  data(){
    return{
      start:0,  
      gyms:[],
      courses:[],
      users:[],
      search:'' 
    }
  },
  methods: {
        getGyms(){
            var me = this;
            // https://zh.nuxtjs.org/guide/assets  
            me.$jsonp("http://ots.thelittlegym.com.cn:81/addUserModule/api/gym",{
                 
            }).then(json => {
                me.gyms=json;
            　　// 返回数据 json， 返回的数据就是json格式
            }).catch(err => {
            　　console.log(err)
            })
        },
        getCourses(){
            var me = this;
            // https://zh.nuxtjs.org/guide/assets  
            me.$jsonp("http://ots.thelittlegym.com.cn:81/addUserModule/api/course/",{
                 
            }).then(json => {
            　　me.courses=json;
            }).catch(err => {
            　　console.log(err)
            })
        },
        
        getUserGrade(){
            this.start =1;
            var gymSelect = $('#gym').dropdown('get value');
            var courseSelect = $('#course').dropdown('get value');
            var me = this;
            me.$jsonp('http://ots.thelittlegym.com.cn:81/addUserModule/api/user/'+gymSelect,{
                  course:courseSelect
            }).then(json => {
               me.users=json;
               this.start =2;
            }).catch(err => {
                this.start =2;
            　　console.log(err)
            })
   
        }
  },
  mounted () {
      this.getGyms();
      this.getCourses();
      $('.ui.dropdown').dropdown();
  }
 }
</script>

<style lang="scss" scoped>
   
  


</style>
