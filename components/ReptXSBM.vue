<template>
  <div>
    <div class="ui segment">
        <div class="ui four column stackable grid">
            <div class="column left aligned">
                <div class="block">
                    <el-date-picker
                    v-model="value1"
                    type="date"
                    placeholder="开始日期"
                    :picker-options="pickerOptions1">
                    </el-date-picker>
                </div>
            </div>
            <div class="column left aligned">
                <div class="block">
                    <el-date-picker
                    v-model="value2"
                    align="right"
                    type="date"
                    placeholder="结束日期"
                    :picker-options="pickerOptions1">
                    </el-date-picker>
                </div>
            </div>
            <div class="column left aligned">
                <div>
                    <a id="query" href="javascript:" class="ui primary button" @click="getSaleEnrolStat()">搜索</a>
                </div>
            </div>
            <div class="column right aligned">
            </div>
        </div>
    </div>
    <div id="map" v-if="this.start==1" class="ui segment">
         <div style="text-align:center"><img src="http://tlgc.oss-cn-shanghai.aliyuncs.com/assert/img/loading.gif" width="40px" height="40px"></div>
    </div>
    <div class="ui segment" v-if="data">
            <div class="ui two column stackable grid">
                <div class="column left aligned">
                    <table  class="ui celled table">
                        <thead>
                            <tr class="positive">
                                <th colspan="2" >
                                    <div class="ui ribbon label">汇总</div>
                                </th>
                            </tr>
                                <tr>
                                <th>中心名称</th>
                                <th>报名汇总</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="d of data" v-if="d.type==1">
                                <td  v-text="d.gym"></td>
                                <td  v-text="d.detail"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="column left aligned">
                    <table class="ui celled table">
                        <thead>
                            <tr class="positive">
                                <th colspan="2" >
                                    <div class="ui ribbon label">明细</div>
                                </th>
                            </tr>
                                <tr>
                                <th>中心名称</th>
                                <th>报名详细</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="d of data" v-if="d.type==2">
                                <td  v-text="d.gym"></td>
                                <td  v-text="d.detail"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
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
      data:[],
      pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        value1: '',
        value2: '',
    }
  },
  methods: {
        getSaleEnrolStat(){
            var me = this;
            if(this.dtBegin==""||this.dtEnd==""){
                    this.$alert('<strong style="padding-left:20px;font-size:25px">请选择日期！</strong>',"警告", {
                        title:"警告",
                        dangerouslyUseHTMLString: true,
                        center:true,
                        type:'error',
                        confirmButtonText:"确定",
                        roundButton:true
                    })
                    return -1;
            }
            this.start =1;
            //alert(Date.parse(this.dtEnd)/1000)
            me.$jsonp('http://ots.thelittlegym.com.cn:81/addUserModule/api/saleCourse/',{
               dtBegin:Date.parse(this.value1)/1000,dtEnd:Date.parse(this.value2)/1000
            }).then(json => {
               me.data=json;
               this.start =2;
            }).catch(err => {
                this.start =2;
            　　console.log(err)
            })
   
        }
  },
  mounted () {
  }
 }
</script>

<style lang="scss" scoped>
   
  
    
 
 


</style>
