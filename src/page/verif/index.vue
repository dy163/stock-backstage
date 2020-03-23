<template>
   <div>
      <el-card>
        <div slot="header">
          <span>审核前台用户</span>
        </div>
          <el-table :data="verif">
             <el-table-column label="用户编号" prop="usercode" width="230"></el-table-column>
             <el-table-column label="身份证号" prop="ID_card_number" width="230"></el-table-column>
             <el-table-column label="姓名" prop="username" width="160"></el-table-column>
             <el-table-column label="手机号" prop="phone" width="230"></el-table-column>
             <el-table-column label="教育背景" prop="edu_bg" width="120"></el-table-column>
             <el-table-column label="职业" prop="position" width="150"></el-table-column>
             <el-table-column label="锁定" prop="is_lock" width="120">
                <template slot-scope="scope">
                  <el-tag class="normal"
                  :type="lockType[scope.row.is_lock].type">
                  {{ lockType[scope.row.is_lock].label }}
                  </el-tag>
                </template>
             </el-table-column>
             <el-table-column label="状态" width="100">
              <template slot-scope="scope">
                <el-tag class="normal"
                :type="verifType[scope.row.is_pass].type">
                {{ verifType[scope.row.is_pass].label }}
                </el-tag>
              </template>
             </el-table-column>
             <el-table-column label="操作">
               <template slot-scope="scope">
                 <el-button size="mini" type="info" plain @click="handleInfo(scope.row)">待审</el-button>
                 <el-button size="mini" type="success" plain @click="handleSuccess(scope.row)">通过</el-button>
                 <el-button size="mini" type="danger" plain @click="handleFail(scope.row)">禁止</el-button>
               </template>
             </el-table-column>
          </el-table>
          <!-- 不通过弹框 -->
          <el-dialog title="请输入不通过的原因" :visible.sync="dialogFormVisible">
            <el-form :model="content">
              <el-form-item label="原因" :label-width="formLabelWidth">
                <el-input v-model="content.cause" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="handleDanger">确 定</el-button>
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
import { adminUserList, userVerityUser } from '@/api/user' // 获取列表

export default {
  name: 'VerifIndex',
  data () {
    return {
      dialogFormVisible: false,
      formLabelWidth: '80px',
      verif: [],  // 表格数据
      id: '',   // 不通过id
      page: 1,  // 当前页数
      pageSize: 3,  // 每页条数
      totalCount: 0,  // 总数
      verifType: [    //  操作
        {
          type: 'info',
          label: '待审'
        },
        {
          type: 'success',
          label: '通过'
        },
        {
          type: 'danger',
          label: '禁止'
        }
      ],
      content: {
        cause: ''     // 不通过原因
      },
      lockType: [
        {
          type: 'success',
          label: '未锁定'
        },
        {
          type: 'danger',
          label: '锁定'
        }
      ]
    }
  },
  components: {},
  computed: {},
  mounted () {
    this.handleAdminUserList()
  },
  methods: {
    // 获取前台用户列表
    async handleAdminUserList () {
      try {
        const formData = new FormData()
        formData.append('pageNum', this.page)
        formData.append('pageSize', this.pageSize)
        const res = await adminUserList(formData)
        this.verif = res.data.result.list
        this.totalCount = res.data.result.total
      } catch (error) {
        this.$message.error('获取用户列表失败!请重新登录')
      }
    },
    // 待审核
    async handleInfo (q) {
      try {
        const formData = new FormData()
        formData.append('id', q.id)
        formData.append('is_pass', 0)
        const res = await userVerityUser(formData)
        if (res.data.staus) {
          this.$message('待审核中');
        }
        this.handleAdminUserList()
      } catch (error) {
        this.$message.error('待审核失败')
      }
    },
    // 通过
    async handleSuccess (q) {
      try {
        const formData = new FormData()
        formData.append('id', q.id)
        formData.append('is_pass', 1)
        const res = await userVerityUser(formData)
        if (res.data.staus) {
          this.$message({
            message: '审核通过',
            type: 'success'
          })
          this.handleAdminUserList()
        } else {
          this.$message({
            message: '审核失败，用户账户已存在',
            type: 'warning'
          })
        }
      } catch (error) {
        this.$message.error('审核失败')
      }
    },
    // 不通过
    handleFail (q) {
      this.dialogFormVisible = true
      this.id = q.id
    },
    async handleDanger () {
      try {
        const formData = new FormData()
        formData.append('id', this.id)
        formData.append('is_pass', 2)
        formData.append('no_pass_remark', this.form.name)
        const res = await userVerityUser(formData)
        // if (res.data.staus) {
        //   this.$message.error('审核失败')
        // }
        this.form.name = ''
        this.dialogFormVisible = false
        this.handleAdminUserList()
      } catch (error) {
        this.$message.error('不通过')
      }
    },
    // 分页
    handleCurrentChange (page) {
      this.page = page
      // 重新加载
      this.handleAdminUserList()
    }
  },
  watch: {}
}
</script>

<style lang="less" scoped>
.normal {
  margin-right: 15px;
}
</style>
