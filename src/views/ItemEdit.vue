<template>
  <div class="ItemEdit">
    <h1>{{id?'编辑':'新建'}}物品</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="类别编号">
<!--        <el-input v-model="model.categoryType"></el-input>-->
        <el-select v-model="model.categoryType" placeholder="请选择">
          <el-option v-for="item in parents" :key="item.categoryType" :label="item.categoryName" :value="item.categoryType"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="model.productDescription"></el-input>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.productName"></el-input>
      </el-form-item>
      <el-form-item label="价格">
        <el-input v-model="model.productPrice"></el-input>
      </el-form-item>
      <el-form-item label="库存">
        <el-input v-model="model.productStock"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload
          class="items-uploader"
          :action="mixin_getUploadUrl"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="model.productIcon" :src="model.productIcon" class="items" />
          <i v-else class="el-icon-plus items-uploader-icon"></i>
        </el-upload>
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
      parents: []
    }
  },
  created() {
    this.parentfetch()
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
      const res = await this.$http.get(`seller/product/show?productId=${this.id}`)
      this.model = res.data.data
    },
    async parentfetch() {
      const res = await this.$http.get(`seller/category/list`)
      this.parents = res.data.data.categoryList
    },
  },

}
</script>


<style>
</style>
