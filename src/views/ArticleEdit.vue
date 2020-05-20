<template>
  <div class="ItemEdit">
    <h1>{{id?'编辑':'新建'}}二维码</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="店铺名">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="座位号">
        <el-input v-model="model.address"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>

import Qs from 'qs'
export default {
  name: 'ItemEdit',
  props: {
    id: {}
  },
  data() {
    return {
      model: {
      },
    }
  },
  created() {
    this.id && this.fetch()//有id就拉取数据进行编辑
  },

  methods: {
    
    //保存分类
    async save() {
      let sss = Qs.stringify(this.model)
      await this.$http.post('seller/QRcode/create', sss)
      this.$router.push('/articles/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
   
  },

}
</script>


<style>
</style>
