<template>
<div>

 <el-col :span="18">
<el-card class="box-card">
   <el-form @dblclick.native="goEdit()" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
 
          <el-form-item ref="username" label="家长姓名"  prop="name" class="w-50">
            <el-input :readonly="readonly" v-model="ruleForm.name" size="100"></el-input>
          </el-form-item> 
       
      
          <el-form-item label="孩子"  prop="othername" class="w-50">
            <el-input :readonly="readonly" v-model="ruleForm.othername" size="100"></el-input>
          </el-form-item> 
        
          <el-form-item label="性别" :readonly="readonly" prop="sex" class="w-50">
            <el-radio-group v-model="ruleForm.sex">
            <el-radio :disabled="readonly" label="男"></el-radio>
            <el-radio :disabled="readonly" label="女"></el-radio>
            <el-radio :disabled="readonly" label="未知"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="生日" prop="birth" class="w-50">
            <el-date-picker :readonly="readonly" type="date" placeholder="选择日期" v-model="ruleForm.birth" style="width: 100%;"></el-date-picker>
          </el-form-item>
      
          <el-form-item label="来源" prop="channel" class="w-50">
            <el-select :disabled="readonly" v-model="ruleForm.channel" value-key="id" filterable placeholder="请选择">
                <el-option v-for="c of channels" :key="c.id" :label="c.name" :value="c"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="分组" prop="group_selected" class="w-50">
            <el-select :disabled="readonly" v-model="ruleForm.group_selected" filterable placeholder="请选择">
              <el-option v-for="(g,index) of clientlGrps" :key="index" :label="g.name" :value="g.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="手机" prop="phone"  class="w-50">
              <el-input :readonly="readonly" v-model="ruleForm.phone" size="100"></el-input>
          </el-form-item>

          <el-form-item label="邮箱" :readonly="readonly" prop="email" class="w-50">
              <el-input :readonly="readonly" v-model="ruleForm.email" size="100"></el-input>
          </el-form-item>
      
        <!-- <el-form-item label="座机" prop="tel"  class="w-50">
            <el-input v-model="ruleForm.tel" size="100"></el-input>
        </el-form-item> -->
      
        <el-form-item label="行业" :readonly="readonly" prop="industry">
            <el-input :readonly="readonly" v-model="ruleForm.industry" size="100"></el-input>
        </el-form-item>
       <el-form-item label="地址" :readonly="readonly" prop="address">
            <el-input :readonly="readonly" v-model="ruleForm.address" size="100"></el-input>
        </el-form-item>
      
        <el-form-item label="备注" :readonly="readonly" prop="memo">
            <el-input :readonly="readonly" type="textarea" v-model="ruleForm.memo" :rows="10"></el-input>
        </el-form-item>

     
        <el-form-item label="负责老师" prop="ls_selected" class="w-50">
                <el-select style="margin-left: 20px;" :disabled="account.acl!='系统管理员'" v-model="ruleForm.ls_selected" default-first-option filterable placeholder="请选择老师">
                    <el-option
                      v-for="item in tutors"
                      :key="item.id"
                      :label="item.username"
                      :value="item.id">
                    </el-option>
                </el-select>
        </el-form-item> 
        <el-form-item label="中心" prop="gym_selected" class="w-50">
                <el-select style="margin-left: 20px;" :disabled="readonly" v-model="ruleForm.gym_selected" default-first-option filterable @change="get_ls()" 
                placeholder="请选择中心">
                    <el-option
                      v-for="item in account.gyms"
                      :key="item.code"
                      :label="item.name"
                      :value="JSON.stringify(item)">
                    </el-option>
                </el-select>
        </el-form-item> 
        <el-form-item>
            <el-button v-show="!readonly" type="primary" @click="submitForm('ruleForm')">保存</el-button>
            <el-button v-show="!readonly" @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
  </el-form>
</el-card>
</el-col>
<el-col :span="6">
<el-card class="card-right">
  <div slot="header" class="clearfix">
    <span>客户标签</span>
      <el-popover
        placement="bottom"
        width="400"
        height="500"
        v-model="visible2">
      
        <el-row  :key="index" v-for="(item,index) of labelGrps">
          <div>
            <el-checkbox v-model="item.checked" :style="'color:'+color[index%3]">{{item.name}}</el-checkbox>
            <i class="el-icon-arrow-up"></i>
          </div>
          <div>
            <el-button  class="btnn" autofocus :disabled="!item.checked" :class="{'color':tag.iscolor,'nocolor':!tag.iscolor}" size="mini" :key="i" v-for="(tag,i) of item.tags"  @click="addTag(index,i)">{{tag.name}}</el-button>
          </div>
        </el-row>

        <div style="text-align: right; margin: 0">
          <el-button type="primary" size="mini" @click="saveTage">确定</el-button>
          <el-button size="mini" type="text" @click="clearTag">取消</el-button>
          
        </div>
        <el-button slot="reference" style="float: right; padding: 3px 50px 3px 5px" type="text" @click="setTag()">添加</el-button>
      </el-popover>
   
  </div>

</el-card>

  <el-tag
      :key="id"
      v-for="(tag,id) in ruleForm.Tags"
      closable
      :disable-transitions="false"
      @close="handleClose(id)">
      {{tag.label}}
  </el-tag>

</el-col>
</div>
</template>
<script>
import { mapState } from 'vuex';
  export default {
    data() {
      var validate_phone = (rule, value, callback) => {
        var reg =/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
        if (!(reg).test(value)) {
          //console.log(11)
          callback(new Error('手机格式不正确！'));
        }else{
          callback();
        } 
      };
      var validate_mail = (rule, value, callback) => {
        var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); 
        if (!(reg).test(value)) {
          //console.log(11)
          callback(new Error('邮箱格式不正确！'));
        }else{
          callback();
        }  
      };
 
      return {
        count:0,
        tutors:[],
        readonly: false,
        visible2: false,
        color:[
          "#5199EB",
          "#54B983",
          "#E7A12A",
          "#9568CE"
        ],
        labelGrps:[],
        clientlGrps:[],
        channels:[],
        ruleForm: {
          name: '',
          othername:'',
          channel: '',
          birth: '',
          industry: '',
          sex: '',
          memo: '',
          email:'',
          phone:'',
          address:'',
          group_selected:'',
          gym_selected:"",
          ls_selected:"",
          Tags:[],
        },
        rules: {
          gym: [{ required: true, message: '请输选择中心', trigger: 'blur' }],
          ls: [{ required: true, message: '请选择负责老师', trigger: 'blur' }],
          name: [
            { required: true, message: '请输入客户名称', trigger: 'change' },
            { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
          ],
          channel: [
            { required: true, message: '请选择客户来源', trigger: 'change' }
          ],
          group_selected: [
            { required: true, message: '请选择分组', trigger: 'change' }
          ],
          phone:[
            { required: true, message: '请输入手机号',trigger:'blur'},
            { validator: validate_phone, trigger: 'blur' }
            
          ],
          email:[
            { required: true, message: '请输入邮箱',trigger:'blur'},
            { validator: validate_mail, trigger: 'blur' }
            
          ],
          birth: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          sex: [
            { required: true, message: '选择性别', trigger: 'change' }
          ]
        }
      };
    },
    computed:{
      ...mapState([
        'account'
      ]),
      obj_cur_gym:function(){
          return  this.gym_selected &&
                  JSON.parse(this.gym_selected)||
                  {id:'',name:'',code:''}
      },
      Temp:function(){
        var self=this;
        var arr=self.labelGrps.map(function(o){
          if(o.checked){
            var tag =o.tags.find(function(t){
                return t.iscolor;
            })
            if(tag){
                return {"key":o.name,"label":tag.name}
            }
          }
        })
        return self.clearNullAr(arr);
      }
    },
    methods: {
      ruleFormConv(){
        var label_string = JSON.stringify(this.ruleForm.Tags);
        var obj=this.extend({label:label_string,birth:this.fmtDate(this.ruleForm.birth)},this.ruleForm);
        return obj;
      },
      tag_select(){
        if(this.ruleForm.Tags.length==0) return;
        var arr_tags=[];
        this.ruleForm.Tags.map(function(t){
            arr_tags[t.key]=t.label;
        })
        var self=this;
        var arr=self.labelGrps.map(function(o){
            if(arr_tags[o.name]){
               o.tags.map(function(t){
                 if(arr_tags[o.name]==t.name){
                    t.iscolor=true;
                 }
              })
            }

        })
      },
      goEdit(){
        if(!this.readonly) return true;
        this.$confirm('是否要进入可编辑状态？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.readonly=false;
          this.ruleForm.readonly=0;
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已放弃'
          });       
        });
      },
      setTag(){
        if(this.labelGrps.length>0) return;
        this.$confirm('请先设置标签, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push({path: '/setting'});
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已放弃'
          });          
        });
      },
      clearTag(){
        this.visible2 = false;
      },
      saveTage(){
        //console.log("save",JSON.stringify(this.Temp))
        //console.log("save",JSON.stringify(this.labelGrps))
        this.ruleForm.Tags = this.Temp;
        this.visible2 =false;
      },
      async handleClose(id){
          await this.goEdit();
          if(!this.readonly){
             this.ruleForm.Tags.splice(id, 1);
          }
      },
      addTag(index,i){
        this.labelGrps[index].tags.map(function(t,j){
          //console.log(i+"||"+j)
          if(j==i){
            t.iscolor=!t.iscolor;
          }else{
            t.iscolor=false;
          }
        }) 
      },
      submitForm(formName) {
        var self=this;
        self.$refs[formName].validate((valid) => {
          if (valid) {
              self.saveUser(formName);
          } else { 
              this.$message({
                type: 'error',
                message: `内容输入不正确！`
              });
              return false;
          }
        });
      },
      saveUser(formName){
        var self=this;
        var sql_createuser = "declare @data varchar(max)=quot;@formquot;;declare @flag int =isnull((select top 1 1 from crm_zdytable_238592_27128_238592_view ec where crm_name=JSON_VALUE(@data,quot;$.phonequot;) and crmzdy_82326474=JSON_VALUE(@data,quot;$.gym_selectedquot;)),0);"
        if(this.ruleForm.readonly===0){
           sql_createuser = "update crm_zdytable_238592_27128_238592_view set isdelete=1 where crm_name='@phone';"+sql_createuser
        }
        sql_createuser += "insert into crm_zdytable_238592_27128_238592(org_id,cust_id,crm_syrID,create_time,crm_name/*phone*/,crmzdy_82068889/*name*/,crmzdy_82068921/*othername*/,crmzdy_82068894/*sex*/,crmzdy_82068891/*birth*/,crmzdy_82068892/*email*/,crmzdy_82068895/*addr*/,crmzdy_82068918/*industry*/,crmzdy_82068893/*group*/,crmzdy_82068919/*label*/,crmzdy_82068896/*memo*/,crmzdy_82326474/*gym*/,crmzdy_82068917/*channel*/)";
        sql_createuser += "select top 1 238592,quot;@iduserquot;,JSON_VALUE(@data,quot;$.ls_selectedquot;),getdate(),JSON_VALUE(@data,quot;$.phonequot;),JSON_VALUE(@data,quot;$.namequot;),JSON_VALUE(@data,quot;$.othernamequot;),JSON_VALUE(@data,quot;$.sexquot;),JSON_VALUE(@data,quot;$.birthquot;),JSON_VALUE(@data,quot;$.emailquot;),JSON_VALUE(@data,quot;$.addressquot;),JSON_VALUE(@data,quot;$.industryquot;),JSON_VALUE(@data,quot;$.group_selectedquot;),JSON_VALUE(@data,quot;$.labelquot;),JSON_VALUE(@data,quot;$.memoquot;),JSON_VALUE(@data,quot;$.gym_selectedquot;),JSON_query(@data,quot;$.channelquot;) from crm_yh_238592_view where @flag=0;";
        sql_createuser += "select case when @flag=1 then 2 else 0 end errmsg for json path";

        //console.log(JSON.stringify(obj));return;
        sql_createuser = sql_createuser.replace('@form',JSON.stringify(self.ruleFormConv()));
        sql_createuser = sql_createuser.replace('@phone',self.ruleForm.phone);
        self.$store.commit({
            type:"get_data",
            sql:sql_createuser,
            func:function(data){
              if(data&&data[0].errmsg==0){
                  self.$message({
                    showClose: true,
                    message: '保存成功！',
                    type: 'success'
                  });
                  self.updateStore();
                  self.resetForm(formName);
              }else if(data&&data[0].errmsg==2&&!self.$route.query.name){
                  self.$message({
                    showClose: true,
                    message: '该手机号的客户记录已存在！请勿重复录入！',
                    type: 'warning'
                  });
              }else{
                  self.$message({
                    showClose: true,
                    message: '保存失败！',
                    type: 'error'
                  });
              }
            }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.ruleForm.Tags=[];
        this.$refs.username.$el.querySelector('input').focus();
        this.ruleForm.gym_selected=JSON.stringify(this.account.gyms[0]);
        this.ruleForm.ls_selected=this.account.id;
      },
      getChannel(){
        var self=this;
        var sql = "select crm_name name,id from crm_zdytable_238592_25112_238592_view where crmzdy_81755551=1 and crmzdy_81620405_id=0 union all select crm_name,id from crm_zdytable_238592_25112_238592_view where crmzdy_81755551=1 and crmzdy_81620405_id=@idgym for json path;";
        self.$store.commit({
            type:"get_data",
            sql:sql,
            func:function(data){
              self.channels=data;
            }
        })
       },
       get_ls(){
          var cur_gym = null;
          if(this.gym_selected){
             cur_gym = this.obj_cur_gym && this.obj_cur_gym.name;
          }
          var self=this;
          self.$store.commit({
              type:"get_ls",
              cur_gym:cur_gym,
              func:function(data){
                if(data){
                  self.tutors=data
                  //console.log(JSON.stringify(data))
                }
              }
          })
      },
      init(){
        if(this.ruleForm.readonly && this.ruleForm.readonly==1){
           this.readonly=true;
        }
        //console.error(JSON.stringify(this.ruleForm))
        this.get_tag();
        this.getChannel();
        this.get_clie_group();
        this.ruleForm.gym_selected=JSON.stringify(this.account.gyms[0]);
        this.get_ls();
        this.ruleForm.ls_selected=this.account.id;
        //this.Temp=this.ruleForm.Tags;
      },
      updateStore:function(){
          var phone=this.ruleForm.phone;
          var clientData = this.$store.state.tbl.clientData;
          if(clientData){
              var id=clientData.findIndex(function(v){
                  return v.phone==phone;
              });
              if(id!=-1){
                 this.$store.state.tbl.clientData[id]=this.ruleFormConv();
              }
              // console.log(id)
              // console.log(this.$store.state.tbl.clientData)
              // console.log(this.$store.state.tbl.clientData[id])
          }
       }
    },
    watch:{
        account:function(){
          this.get_tag();
          this.init();
        }
    },
    mounted(){
      //console.log(JSON.stringify(this.$store.state.client))
      if(this.$store.state.client){
         this.ruleForm=this.$store.state.client;
      }
      this.init();
    },
    destroyed(){
      //alert(this.ruleForm.readonly===undefined)
      if(this.ruleForm.readonly===undefined){
         this.$store.state.client=this.ruleForm;
      }else{
         this.$store.state.client=null;
      }
      this.readonly=false;
    }
  }
</script> 


<style lang="scss" scoped>
  .color{
    color:#409eff;
    background-color: #ecf5ff;
    border-color: #c6e2ff;
  }
  .nocolor{
    background: #fff;
    border: 1px solid #dcdfe6;
    color: #606266;
  }
  .box-card{
    .w-50{
      width: 48%;
      display: inline-block;
    }
    
    // width: 70%;
  }
  .card-right{
    height:100%;
    box-shadow:none;
    border-bottom: none;
    border-right: none;
    position: relative;
   
  }
  .btnn{
      margin: 10px 5px 5px 10px !important;
    }
  
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
 
 
</style>

