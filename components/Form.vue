<template>  
  <el-form ref="form" :model="form" label-width="80px">  
    <nuxt-link class="button--green" to="/demo" >返回</nuxt-link>  
    <el-form-item @click="onClick()"  label="姓名">  
      <el-input v-model="form.name"></el-input>  
    </el-form-item>  
    <el-form-item label="生日">  
      <el-date-picker type="date" placeholder="选择日期" v-model="form.birthday" style="width: 100%;"></el-date-picker>  
    </el-form-item>  
    <el-form-item label="身高">  
      <el-input-number v-model="form.stature"></el-input-number>  
    </el-form-item>  
    <el-form-item label="性别">  
      <el-radio class="radio" v-model="form.gender" label="female">女</el-radio>  
      <el-radio class="radio" v-model="form.gender" label="male">男</el-radio>  
    </el-form-item>  
    <el-form-item label="婚否">  
      <el-checkbox v-model="form.isMarried">已婚</el-checkbox>  
    </el-form-item>  
    <el-form-item label="爱好">  
      <el-checkbox-group v-model="form.favorite">  
        <el-checkbox label="音乐"></el-checkbox>  
        <el-checkbox label="足球"></el-checkbox>  
        <el-checkbox label="篮球"></el-checkbox>  
        <el-checkbox label="禁用" disabled></el-checkbox>  
        <el-checkbox label="选中且禁用" disabled></el-checkbox>  
      </el-checkbox-group>  
    </el-form-item>  
    <el-form-item label="活动区域">  
      <el-select v-model="form.region" placeholder="请选择活动区域">  
        <el-option label="昆明" value="kunming"></el-option>  
        <el-option label="呈贡" value="chenggong"></el-option>  
      </el-select>  
    </el-form-item>  
    <el-form-item label="活动区域">  
      <el-select v-model="form.language" multiple placeholder="掌握的编程语言">  
        <el-option value="Basic">Basic</el-option>  
        <el-option value="C">C</el-option>  
        <el-option value="C++">C++</el-option>  
        <el-option value="C#">C#</el-option>  
        <el-option value="Java">Java</el-option>  
        <el-option value="Javascript">Javascript</el-option>  
        <el-option value="Python">Python</el-option>  
        <el-option value="Ruby">Ruby</el-option>  
      </el-select>  
    </el-form-item>  
    <div>  
      <el-button @click="showForm">获取数据</el-button>  
      <el-button @click="onClick">ajax</el-button>  
    </div>  
  </el-form>  
</template>  
<script>  
export default {  
  data () {  
    return {  
      form: {  
        name: '反转的分针',  
        birthday: new Date('1985-04-06'),  
        stature: 173,  
        gender: 'male',  
        isMarried: false,  
        favorite: ['音乐'],  
        region: 'chenggong',  
        language: ['C', 'Java']  
      }  
    }  
  },  
  methods: {  
    showForm () {  
      this.$alert(JSON.stringify(this.form))  
    },  
    onClick () {  
      var me = this  
      // https://zh.nuxtjs.org/guide/assets  
      me.$http.get('/test.json').then((response) => {  
        me.$alert(response.body)  
        me.$alert(response.body.name)  
      })  
    }  
  }  
}  
</script>  