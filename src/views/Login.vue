<template>
  <div class="login-container">
    <el-card header="请先登录" class="login-card">
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="model.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>


<script>
import Qs from 'qs'
export default {
  name: 'Login',
  data(){
    return{
      model: {
        password:'',
        username:''
      }
    }
  },
  methods:{
    async login(){
      let sss = Qs.stringify(this.model)
      await this.$http.post('user/login', sss).then((res)=>{
        if(res.data.code == '200'){
          if(res.data.userType==1){
          this.$router.push('/')
          }else{
            this.$router.push('/cook')
          }
          localStorage.token = res.data.token
          this.$message({
            type: 'success',
            message: '登录成功，欢迎您'
          })
        }else{
          this.$message({
            type: 'success',
            message: '登录成功，欢迎您'
          })
        }
      })
    }
  }
}
</script>


<style scoped>
.login-card {
  width: 25rem;
  margin: 5rem auto;
}
</style>
