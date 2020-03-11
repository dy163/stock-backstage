<template>
   <div>
      <el-card>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="添加管理" name="first">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" >
              <el-form-item label="账户">
                <el-input v-model="formInline.username" placeholder="请输入账号"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input v-model="formInline.password" placeholder="请输入密码"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="handleUserAdd">添加</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <!-- <el-tab-pane label="用户列表" name="second" @click.native="handleClick"> -->
          <el-tab-pane label="用户列表" name="second">
            <el-table
            :data="tableData"
            style="width: 100%">
              <el-table-column
                label="账户"
                prop="username">
              </el-table-column>
              <el-table-column
                label="状态"
                width="200">
                  <template slot-scope="scope">
                    <el-tag class="normal"
                    :type="statTypes[scope.row.is_pass].type">
                    {{ statTypes[scope.row.is_pass].label }}
                    </el-tag>
                  </template>
              </el-table-column>
              <el-table-column
                label="操作">
                <template>
                  <el-button size="mini" type="primary" plain @click="handleRevise">修改</el-button>
                  <el-button size="mini" type="danger" plain @click="handleProhibit">禁用</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-card>
   </div>
</template>

<script>
import { userAdd, userGetList, userUpdate } from '@/api/user'

export default {
  name: '',
  data () {
    return {
      activeName: 'first',
      formInline: {
        username: '',
        password: ''
      },
      tableData: [],
      statTypes: [
        {
          type: 'danger',
          label: '禁止'
        },
        {
          type: 'success',
          label: '正常'
        }
      ]
    }
  },
  components: {},
  computed: {},
  mounted () {
    this.handleUserGetList()
  },
  methods: {
    handleClick (tab, event) {
      // console.log(tab)
    },
    async  handleUserAdd () {
      try {
        const formData = new FormData()
        formData.append('username', this.formInline.username)
        formData.append('password', this.formInline.password)
        const res = await userAdd(formData) 
        if(res.data.status) {
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          this.handleUserGetList()
          this.formInline.username = ''
          this.formInline.password = ''
        } else {
          this.$message.error('缺少参数')
        }
      } catch (err) {
        this.$message.error('添加失败')
      }
    },
         // 获取超级管理者列表
    async handleUserGetList () {
      try {
        const formData = new FormData()
        const res = await userGetList(formData)
        this.tableData = res.data.result
      } catch (error) {
        this.$message.error('获取管理者数据失败')
      }
    },
    // 管理员状态修改(正常)
    async handleRevise () {
      try {
        const formData = new FormData()
        formData.append('is_pass', 1)
        await userUpdate(formData)
      } catch (error) {
        this.$message.error('正常状态修改失败')
      }
    },
    async handleProhibit () {
      try {
        const formData = new FormData()
        formData.append('is_pass', 0)
        await userUpdate(formData)
      } catch (error) {
        this.$message.error('禁止状态修改失败')
      }
    }
  },
  watch: {}
}
</script>

<style lang="less" scoped>

</style>
