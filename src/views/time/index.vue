<template>
   <div>
        <el-card class="filter-card">
            <div slot="header" class="clearfix">
                <span>添加闭市事件</span>
                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="时间">
                    <el-input v-model="formInline.date" placeholder="yyyymmdd"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="formInline.remark" placeholder="请输入备注"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleSuccess">添加</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="centerDialogVisible = true">批量添加</el-button>
                </el-form-item>
            </el-form>
            <!-- 批量弹框 -->
            <el-dialog
              title="批量添加"
              :visible.sync="centerDialogVisible"
              width="500px"
              center
              class="dialog">
              <el-form
                :model="dynamicValidateForm"
                ref="dynamicValidateForm"
                label-width="100px"
                :inline="true"
                class="demo-form-inline"
              >
                <div
                  v-for="(item, index) in newarray"
                  :key="index"
                >
                  <el-form-item label="时间">
                    <el-input
                      class="time-dialog"
                      v-model="item.selectInput"
                    ></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button
                        type="danger"
                        icon="el-icon-delete"
                        circle
                        @click="deleteData(item.index)"
                      ></el-button>
                    </el-form-item>
                     <el-form-item>
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
                <el-button type="primary" @click="handleBatch">确 定</el-button>
              </span>
            </el-dialog>
        </el-card>
        <!-- 列表展示 -->
        <el-card>
            <div slot="header">
                <span>时间设置</span>
            </div>
            <el-table :data="tableTime">
                <el-table-column label="ID" prop="id">
                </el-table-column>
                <el-table-column label="时间" prop="date">
                </el-table-column>
                <el-table-column label="备注" prop="remark">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="info" plain @click="handleCloseDateEdit(scope.row)">修改备注</el-button>
                        <el-button size="mini" type="danger" plain @click="handleCloseDateDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog title="修改备注" :visible.sync="dialogFormVisible">
                <el-form :model="edit">
                <el-form-item label="备注">
                    <el-input v-model="edit.name" autocomplete="off"></el-input>
                </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleEditSuccess">确 定</el-button>
                </div>
            </el-dialog>
          <div>
            <el-pagination
              :current-page="page"
              background
              layout="prev, pager, next"
              :page-size="pageSize"
              :total="totalCount"
              @current-change="handleCurrentChange">
            </el-pagination>
          </div>
       </el-card>
   </div>
</template>

<script>
import {
  closeDateGetList,
  closeDate,
  batchAdd,
  closeDateEdit,
  closeDateDelete
} from '@/api/stock'

export default {
  name: 'TimeIndex',
  data () {
    return {
      tableTime: [],
      dialogFormVisible: false,
      formLabelWidth: '120px',
      state: '',
      page: 1,  // 当前页数
      pageSize: 3,  // 每页条数
      totalCount: 0,  // 总数
      formInline: {
        date: '',
        remark: ''
      },
      edit: {
        name: ''
      },
      batch: {
        date: ''
      },
      centerDialogVisible: false,
      dynamicValidateForm: {
        typeSelect: ''
      },
      newarray: [
        {
          selectInput: ''
        },
        {
          selectInput: ''
        }
      ]
    }
  },
  components: {},
  computed: {},
  mounted () {
    this.handlecloseDateGetList()
  },
  methods: {
    // 获取时间列表
    async handlecloseDateGetList () {
      try {
        const formData = new FormData()
        formData.append('pageNum', this.page)
        formData.append('pageSize', this.pageSize)
        const res = await closeDateGetList(formData)
        this.tableTime = res.data.result.list
        this.totalCount = res.data.result.total
      } catch (error) {
        this.$message.error('获取时间列表失败!请重新登录')
      }
    },
    // 添加
    async handleSuccess () {
      try {
        const formData = new FormData()
        formData.append('date', this.formInline.date)
        formData.append('remark', this.formInline.remark)
        await closeDate(formData)
        this.formInline.date = ''
        this.formInline.remark = ''
        this.handlecloseDateGetList() // 更新列表
      } catch (error) {
        this.$message.error('添加失败!')
      }
    },
    // 批量添加
    async handleBatch () {
      try {
        this.centerDialogVisible = false
        const res = this.newarray
        const arr = []
        res.forEach(element => {
          arr.push(element.selectInput)
        })
        await batchAdd(arr)
        this.handlecloseDateGetList()
      } catch (error) {
        this.$message.error('批量添加失败!')
      }
    },
    // 增加
    add () {
      if (this.newarray.length + 1 > 6) {
        this.$alert('最多输入6项')
      } else {
        this.newarray.push(this.newarray.length)
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
    // 修改闭市备注
    handleCloseDateEdit (q) {
      this.dialogFormVisible = true
      this.state = q.id
    },
    async handleEditSuccess () {
      try {
        const formData = new FormData()
        formData.append('id', this.state)
        formData.append('remark', this.edit.name)
        await closeDateEdit(formData)
        this.dialogFormVisible = false
        this.edit.name = ''
        this.handlecloseDateGetList() // 更新列表
      } catch (error) {
        this.$message.error('修改闭市备注失败!')
      }
    },
    // 删除
    handleCloseDateDelete (g) {
      this.$confirm('确认删除?', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const formData = new FormData()
        formData.append('id', g.id)
        await closeDateDelete(formData)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.handlecloseDateGetList() // 更新列表
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 分页
    handleCurrentChange (page) {
      this.page = page
      // 重新加载
      this.handlecloseDateGetList()
    }
  },
  watch: {}
}
</script>

<style lang="less" scoped>
.filter-card {
  margin-bottom: 15px;
}
</style>
