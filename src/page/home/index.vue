<template>
  <div class="profile">
    <el-main>
      <el-button type="primary" @click="centerDialogVisible = true"
        >弹框按钮</el-button
      >
    </el-main>
    <el-dialog
      title="批量添加"
      :visible.sync="centerDialogVisible"
      width="50%"
      center>
      <el-form
        :model="dynamicValidateForm"
        ref="dynamicValidateForm"
        label-width="100px"
      >
        <div
          v-for="(item, index) in newarray"
          :key="index"
        >
          <el-form-item label="时间">
            <el-input
              class="select_four input_common input_border_left"
              v-model="item.selectInput"
            ></el-input>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="deleteData(item.index)"
            ></el-button>
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              v-if="newarray.length - 1 === index"
              @click="add"
            ></el-button>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'profile',
  data () {
    return {
      centerDialogVisible: false,
      dynamicValidateForm: {
        typeSelect: ''
      },
      newarray: [
        {
          selectInput: ''
        }
      ]
    }
  },
  created () {
  },
  methods: {
    // 增加
    add () {
      if (this.newarray.length + 1 > 6) {
        this.$alert('最多输入6项')
      } else {
        this.newarray.push({
          index: this.newarray.length,
          value: ''
        })
      }
    },
    // 删除
    deleteData (index) {
      if (this.newarray.length - 1 < 2) {
        this.$alert('至少输入2项')
      } else {
        this.newarray.splice(index, 1)
      }
    },
    submit () {
      console.log(this.newarray)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
