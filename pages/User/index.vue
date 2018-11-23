<template>
  <div>
    <el-menu :default-active="tbl.activeIndex" class="el-menu-demo" mode="horizontal" style="margin-bottom:1%">
      <el-menu-item index="attr" @click="tbl.activeIndex='attr'">属性搜索</el-menu-item>
      <el-menu-item index="adv" @click="tbl.activeIndex='adv'">高级搜索</el-menu-item>
    </el-menu>
    <el-container>
        <el-header v-if="tbl.activeIndex=='attr'">
              <el-row :gutter="20">
                  <el-col :span="12"> 标 签：</el-col>
                  <el-col :span="12"> </el-col>
              </el-row>

        </el-header>
        <el-header v-if="tbl.activeIndex=='adv'">   
              <el-row :gutter="5">
                  <el-col :span="6"> 
                    <el-date-picker
                        v-model="tbl.dtzx"
                        :picker-options="pickerOptions2"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        range-separator="-"
                        type="daterange"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :default-time="['00:00:00', '23:59:59']"
                        align="right">
                    </el-date-picker>
                  </el-col>
                  <el-col :span="6"> 
                    <el-select style="margin-left: 20px;" v-model="tbl.gym_selected" clearable filterable @change="get_ls()" placeholder="中心">
                        <el-option
                          v-for="item in tbl.gyms"
                          :key="item.code"
                          :label="item.name"
                          :value="JSON.stringify(item)">
                        </el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="6">
                    <el-select v-model="tbl.ls_selected" filterable clearable placeholder="老师">
                        <el-option
                          v-for="item in tbl.tutors"
                          :key="item.id"
                          :label="item.username"
                          :value="item.id">
                        </el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="6">
                    <el-button @click="get_info()" icon="el-icon-search" style="margin-left: 20px;">查询</el-button>
                    <el-button @click="sync_info()" icon="el-icon-upload" style="margin-left: 20px;">同步</el-button>
                  </el-col>
              </el-row>  
        </el-header>
        <el-main>
        <el-table v-loading="loading" height='460px' :data="tbl.clientData" border style="width: 100%" @selection-change="handleSelectionChange">>
              <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column fixed prop="name" label="家长" align="center" width="80">
            </el-table-column>
            <el-table-column prop="phone" label="手机" align="center"  width="110">
            </el-table-column>
            <el-table-column prop="othername" label="孩子姓名" align="center"  width="80">
            </el-table-column>
            <el-table-column prop="sex" label="性别"  align="center"  width="60">
            </el-table-column>
            <el-table-column label="生日" align="center" width="110">
              <template slot-scope="scope">
                <!-- <i class="el-icon-time"></i> -->
                <span style="margin-left: 10px">{{ scope.row.birth|fmtDate}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="channel" label="来源" width="150">
              <template slot-scope="scope">
                <span>{{json(scope.row.channel,'name')}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="addr" label="地址" width="150">
            </el-table-column>
            <el-table-column prop="memo" label="备注" width="300">
            </el-table-column>
            <el-table-column prop="create_time" label="录入日期" align="center" width="110">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
                <el-button @click="handleLook(scope.row)" type="text" size="small">查看</el-button>
                <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
            </template>
            </el-table-column>
        </el-table>
        </el-main>
        <el-footer>
        <div class="block">
            <!-- <span class="demonstration">完整功能</span> -->
            <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="tbl.currentPage"
            :page-sizes="[10,50,100, 200, 300]"
            :page-size="tbl.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tbl.total">
            </el-pagination>
        </div>
        </el-footer>
    </el-container>
  </div>
</template>

<script>
  import { mapMutations,mapState } from 'vuex';
  export default {
    data() {
      return {
        loading:false,
        multipleSelection:[],
        pickerOptions2: {
            shortcuts: [{
            text: '最近一个月',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
            }
            }, {
            text: '最近三个月',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
            }
            }, {
            text: '最近六个月',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
                picker.$emit('pick', [start, end]);
            }
            }, {
            text: '最近一年',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
                picker.$emit('pick', [start, end]);
            }
            }]
        },
        tbl:{
          activeIndex:'adv',
          dtzx:[],
          currentPage: 1,
          pageSize:100,
          total:0,
          gyms:[],
          gym_selected:"",
          ls_selected:"",
          tutors:[],
          clientData:[]
        }
      }  
    },
    computed:{
      ...mapState([
        'account'
      ]),
      pager:function(){
          return "declare @size int="+this.tbl.pageSize+",@pageNum int="+this.tbl.currentPage+";";
      },
			where_all:function(){
          let condition=[];
			    if(this.tbl.gym_selected){
				     condition.push("crmzdy_82326474='"+this.tbl.gym_selected+"'");
          }
          if(this.tbl.ls_selected){
             condition.push("crm_syrID="+this.tbl.ls_selected);
          } 
          if(this.tbl.dtzx.length>0){
             condition.push("create_time between '"+this.tbl.dtzx[0]+"' and '"+this.tbl.dtzx[1].slice(0,-8)+"23:59:59'");
          } 
          if(condition==[]){
            return "";
          }
          return " where " + condition.join(" and ");
			},
      obj_cur_gym(){
          return  this.tbl.gym_selected &&
                  JSON.parse(this.tbl.gym_selected)||
                  {id:'',name:'',code:''}
      }
    },
	 	watch:{
        account:function(){
          this.get_gyms();
        }
    },
    mounted(){
      console.log(JSON.stringify(this.$route.query))
        if(this.$store.state.tbl){
           this.tbl=this.$store.state.tbl;
        }
        if(this.tbl.gyms.length==0){
           this.get_gyms();
        }
    },
    destroyed(){
        this.$store.state.tbl=this.tbl;
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
        //console.log(JSON.stringify(this.multipleSelection ))
        console.log(this.json2Sql(val));
      },
      get_gyms(){
        var self=this;
        self.$store.commit({
            type:"get_gyms",
            func:function(data){
              if(data){
                self.tbl.gyms=data
                //console.log(JSON.stringify(data))
              }
            }
        })
      },
      get_ls(){
        var self=this;
        if(this.obj_cur_gym.name){
          self.$store.commit({
              type:"get_ls",
              cur_gym:this.obj_cur_gym.name,
              func:function(data){
                if(data){
                  self.tutors=data;
                }
              }
          })
        }
      },
      async sync_info(){
        var self=this;
        const p =function(){
          return new Promise(function(resolve,reject){          
              if(self.multipleSelection.length==0){
                  this.$message({
                    type: 'error',
                    message: `请选择需要同步的记录！`
                  });
                  return;
              }
              self.getDataAsync({sql1:self.json2Sql(self.multipleSelection)},function(res) {  
                resolve(res);
              },'put')
          })
        }
        let res = await p();
        if(res.errcode==0){
            this.$message({
              type: 'success',
              message: `同步成功`
            });
        }else{
            this.$message({
              type: 'error',
              message: `同步失败`
            });
        }

      },
      get_info(){
        var self=this;
        if(this.tbl.gym_selected==""&&this.tbl.ls_selected==""){
            this.$message({
              type: 'error',
              message: `请选择中心！`
            });
            return;
        }
        self.loading=true;
        let sql = this.pager+"select isnull(crmzdy_82068889,'') name,isnull(crm_name,'') phone,isnull(crmzdy_82068921,'') othername,isnull(crmzdy_82068893,'') group_selected,isnull(crmzdy_82068894,'') sex,convert(varchar(10),crmzdy_82068891,120) birth,isnull(crmzdy_82068917,'') channel,isnull(crmzdy_82068895,'') addr,isnull(crmzdy_82068896,'') memo,isnull(crmzdy_82068919,'') label,convert(varchar(10),create_time,120)create_time,crm_syrID ls_selected,isnull(crmzdy_82326474,'') gym_selected,isnull(crmzdy_82068892,'') email into #tmp from crm_zdytable_238592_27128_238592_view ec @where_all;declare @str varchar(max)=(select @@rowcount total,* from #tmp order by create_time desc offset (@pageNum-1)*@size rows fetch next @size rows only for json path);select isnull(@str,quot;[]quot;)";
        sql = sql.replace("@where_all",this.where_all);
        //console.log(sql);
        self.$store.commit({
              type:"get_data",
              sql:sql,
              func:function(data){
                if(data){
                  if(data && data.length>0){
                     self.tbl.clientData=data;
                     self.tbl.total=data[0].total;
                  }else{
                     self.tbl.clientData=[];
                     self.tbl.total=0;
                  }
                }
                self.loading=false;
              }
        })
   
      },
      setFormData(row,readonly){
        var label=row.label;
        var channel=row.channel;

        try {
          if(typeof label=='string')  label=JSON.parse(label);
          if(typeof channel=='string') channel= JSON.parse(channel);
        } catch (e) {
           console.error(e);
           label=channel='{}';
        } 
        console.log("lable："+label)
        console.log("channel"+channel)
        var obj=this.extend({readonly:readonly,birth:new Date(row.birth),Tags:label,channel:channel},row);
        console.log(JSON.stringify(obj));
        var name =!readonly?"客户信息修改":"客户信息详情";
        this.$store.state.client=obj;
        this.$router.push({
            path:"/createuser", 
            query: { 
              name:name,              
            }

        })
      },
      handleLook(row) {
        this.setFormData(row,1);
      },
      handleEdit(row) {
        this.setFormData(row,0);
      },
      handleSizeChange(val) {
        this.pageSize=val;
        this.get_info();
        console.log(`每页 ${val} 条`);
         console.log(`每页 ${this.pageSize} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage=val;
        this.get_info();
        console.log(`当前页: ${val}`);
      }

    }
  }
</script>
<style scoped>
  .head{
    background-color: #F7F7F7;
    width:12%;
    font-weight:700;
    text-align: center;
    vertical-align: middle;
    padding-left: 3%!important;
  }

</style>