<template>
  <div class="ec">
    <div class="el-nav">
      <el-scrollbar wrap-class="list">
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          @select="handleSelect"
          background-color="#304156"
          text-color="#BFCBD9"
          active-text-color="#409EFF"
          router>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>我的客户</span>
            </template>
            <el-menu-item index="/createuser" >新增客户</el-menu-item>
            <el-submenu index="1-2">
              <template slot="title">我的客户</template>
              <el-menu-item index="/alluser">全部</el-menu-item>
            </el-submenu>
            <!-- <el-menu-item-group title="分组" > -->
            <el-submenu index="1-3">
              <template slot="title">其他</template>
              <el-menu-item index="1-4">合并重复客户</el-menu-item>
              <el-menu-item index="1-5">公司大公海</el-menu-item>
              <el-menu-item index="1-6">客户重置</el-menu-item>
            </el-submenu> 
            
            <!-- </el-menu-item-group > -->
            
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>销售管理</span>
            </template>
            <el-submenu index="2-1">
              <template slot="title">客户分析</template>
              
              <el-menu-item index="1-3-1">选项1</el-menu-item>
            </el-submenu>
            <!-- <el-menu-item-group title="分组"> -->
            <el-submenu index="2-2">
              <template slot="title">工作分析</template>
              <el-menu-item index="/way">渠道统计分析</el-menu-item>
              <el-menu-item index="/phone">电话联系分析</el-menu-item>
              <el-menu-item index="/sale">销售计划分析</el-menu-item>
              <el-menu-item index="/wechat">微信联系分析</el-menu-item>
       
            </el-submenu> 
            <el-submenu index="2-3">
              <template slot="title">电话分析</template>
              <el-menu-item index="1-3-1">选项1</el-menu-item>
            </el-submenu> 
            <!-- </el-menu-item-group> -->
          </el-submenu>

          <el-menu-item index="3">
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="/setting">
            <i class="el-icon-setting"></i>
            <span slot="title">功能设置</span>
          </el-menu-item>
        </el-menu>
      </el-scrollbar>  
    </div>
      <div class="con">
        <el-container>
          <el-header>
            <el-menu default-active="handle" class="el-menu-demo" mode="horizontal">
              <!-- <el-menu-item index="1">EC客户端</el-menu-item> -->
              <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">EC客户端</el-breadcrumb-item>
                <el-breadcrumb-item>{{$route.query&&$route.query.name||$route.name}}</el-breadcrumb-item>
              </el-breadcrumb>
            </el-menu>
          </el-header>
          <el-main>

            <nuxt/>

          </el-main>
        </el-container>
      </div>
  </div>  
</template>
<script>
export default {
  data(){
    return{
      navTitle:'',
    }
  },
  computed:{
    // changeNavTitle:function(){
    //   if(this.navTitle==''){
    //     return ''
    //   }else{
    //     return this.navTitle;
    //   }
    // }
  },
  methods:{
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleSelect(key, keyPath) {
        console.log(this.$route.name)
         console.log(key, keyPath);
      }
  },
  mounted(){
    //console.error(JSON.stringify(this.$route.query))
  }
}
</script>
<style lang="scss" scoped>
.ec{
  // 导航部分
  .el-nav{
    width: 240px;
    position: fixed;
    left: 0;
    top: 0;
    height:100%;
    
    .list{
        overflow-x: hidden;
    //  max-height: 100%;
    }
    // overflow-y: auto;
    // .el-col-12{
    //   width: 100%;;
    // }
    ul{
      height: 100%;
    }
  }
  // 主体部分
  .con{
    margin-left: 240px;
 
  }
}
</style>

