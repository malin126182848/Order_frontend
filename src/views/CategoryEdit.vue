<template>
  <div class="CategoryEdit">
    <h1>{{id?'编辑':'新建'}}类别</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="类别编号">
        <el-input v-model="model.categoryType"></el-input>
      </el-form-item>
      <el-form-item label="类别名称">
        <el-input v-model="model.categoryName"></el-input>
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
  name: 'CategoryEdit',
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
    this.id && this.fetch()
  },
  methods: {
    //保存分类
    async save() {
      this.model.categoryId = this.model.categoryType
      let sss = Qs.stringify(this.model)
      await this.$http.post('seller/category/save', sss)

      this.$router.push('/categories/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    async fetch() {
      const res = await this.$http.get(`seller/category/show?categoryId=${this.id}`)
      this.model = res.data.data.category
    }
  },

}
</script>


<style scoped>
</style>
