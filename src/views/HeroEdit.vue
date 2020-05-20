<template>
  <div class="ItemEdit">
    <h1>{{id?'编辑':'新建'}}订单</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="用户名">
        <el-input v-model="model.buyerName"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="model.buyerPhone"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="model.buyerAddress"></el-input>
      </el-form-item>
      <el-form-item label="订单号">
        <el-input v-model="model.mealCode"></el-input>
      </el-form-item>
      <el-form-item label="订单数">
        <el-input v-model="model.orderAmount"></el-input>
      </el-form-item>
      <el-form-item label="订单状态">
        <el-input v-model="model.orderStatus"></el-input>
      </el-form-item>
      <el-form-item label="支付状态">
        <el-input v-model="model.payStatus"></el-input>
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
    afterUpload(res) {
      this.$set(this.model, 'productIcon', res.fileDownloadUri)
    },
    //保存分类
    async save() {
      let sss = Qs.stringify(this.model)
      await this.$http.post('seller/product/save', sss)
      
      this.$router.push('/items/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    async fetch() {
      const res = await this.$http.get(`seller/order/detail?orderId=${this.id}`)
      this.model = res.data.data
    },
  },

}
</script>


<style>
</style>
