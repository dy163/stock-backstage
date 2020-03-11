<template>
   <div class="increase">
      <el-card class="filter-card">
        <div slot="header" class="clearfix">
          <span>添加股票</span>
          <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
        </div>
        <el-form :inline="true" :model="increaseInline" class="demo-form-inline" label-position="right">
          <el-form-item label="股票全称">
            <el-input v-model="increaseInline.fullname" placeholder="请输入股票全称"></el-input>
          </el-form-item>
          <el-form-item label="股票简称">
            <el-input v-model="increaseInline.shortname" placeholder="请输入股票简称"></el-input>
          </el-form-item>
          <el-form-item label="股票首拼">
            <el-input v-model="increaseInline.initial_name" placeholder="请输入股票首拼"></el-input>
          </el-form-item>
          <el-form-item label="股票代码">
            <el-input v-model="increaseInline.stock_code" placeholder="请输入股票代码"></el-input>
          </el-form-item>
          <el-form-item label="英文标识">
            <el-input v-model="increaseInline.symbol" placeholder="请输入英文标识"></el-input>
          </el-form-item>
          <el-form-item label="发行价">
            <el-input v-model="increaseInline.pub_price" placeholder="请输入发行价"></el-input>
          </el-form-item>
          <el-form-item label="总股本">
            <el-input v-model="increaseInline.all_capital" placeholder="请输入总股本"></el-input>
          </el-form-item>
          <el-form-item label="流通股本">
            <el-input v-model="increaseInline.cir_capital" placeholder="请输入流通股本"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleStockAdd">添加</el-button>
          </el-form-item>
        </el-form>
      </el-card>
      <el-card>
        <div slot="header">
          <span>股票设置</span>
        </div>
          <el-table :data="increase">
            <el-table-column label="代码" prop="stock_code">
            </el-table-column>
             <el-table-column label="名称" prop="shortname">
            </el-table-column>
            <el-table-column label="英文代码" prop="symbol">
            </el-table-column>
            <el-table-column label="价格" prop="pub_price">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="info" plain @click="handleToUpdate(scope.row)">编辑</el-button>
                <el-button size="mini" type="info" plain @click="handleAmend(scope.row)">设置</el-button>
                <el-button size="mini" type="danger" plain @click="handleStockDelete(scope.row)">退市</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 编辑更新股票内容 -->
          <el-dialog title="更新股票内容" :visible.sync="dialogToUpdate">
            <el-form :model="update">
              <el-form-item label="股票全称">
                <el-input v-model="update.fullname" placeholder="请输入股票全称"></el-input>
              </el-form-item>
              <el-form-item label="股票简称">
                <el-input v-model="update.shortname" placeholder="请输入股票简称"></el-input>
              </el-form-item>
              <el-form-item label="股票首拼">
                <el-input v-model="update.initial_name" placeholder="请输入股票首拼"></el-input>
              </el-form-item>
              <el-form-item label="英文标识">
                <el-input v-model="update.symbol" autocomplete="off" placeholder="请输入英文标识"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogToUpdate = false">取 消</el-button>
              <el-button type="primary" @click="handleUpSuccess">确 定</el-button>
            </div>
          </el-dialog>
          <!-- 重新设置开盘价格 -->
          <el-dialog title="设置开盘价格" :visible.sync="dialogFormVisible">
            <el-form :model="amend">
              <el-form-item label="开盘价格">
                <el-input v-model="amend.price" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="handleSuccess">确 定</el-button>
            </div>
          </el-dialog>
       </el-card>
   </div>
</template>

<script>
import { stockGetAllList, setOpenPrice, stockAdd, stockDelete, stockUpdate } from '@/api/stock'

export default {
  name: 'Increase',
  data () {
    return {
      increase: [],
      dialogFormVisible: false,
      formLabelWidth: '120px',
      dialogToUpdate: false,
      state: '',
      amend: {
        price: ''
      },
      increaseInline: {
        fullname: '',
        shortname: '',
        initial_name: '',
        stock_code: '',
        symbol: '',
        pub_price: '',
        all_capital: '',
        cir_capital: '',
      },
      update: {
        id: '',
        fullname: '',
        shortname: '',
        initial_name: '',
        symbol: ''
      }
    }
  },
  components: {},
  computed: {},
  mounted () {
    this.handleStockGetAllList()
  },
  methods: {
    // 获取列表
    async handleStockGetAllList () {
      try {
        const formData = new FormData()
        const res = await stockGetAllList(formData)
        this.increase = res.data.result
      } catch (error) {
        this.$message({
          message: '警告哦，修改失败',
          type: 'warning'
        })
      }
    },
    // 修改
    handleAmend (item) {
      this.dialogFormVisible = true
      this.state = item.stock_code
    },
    async handleSuccess () {
      try {
        const formData = new FormData()
        formData.append('stock_code', this.state)
        formData.append('open', this.form.name)
        const res = await setOpenPrice(formData)
        console.log(res)
        this.dialogFormVisible = false
        this.form.name = ''
      } catch (error) {

      }
    },
    // 添加股票
    async handleStockAdd () {
      try {
        const data = this.increaseInline
        await stockAdd(data)
        this.increaseInline.fullname =  '',
        this.increaseInline.shortname = '',
        this.increaseInline.initial_name = '',
        this.increaseInline.stock_code = '',
        this.increaseInline.symbol = '',
        this.increaseInline.pub_price = '',
        this.increaseInline.all_capital = '',
        this.increaseInline.cir_capital = '',
        this.handleStockGetAllList()
      } catch (error) {
        q
      }
    },
    // 退市操作q
    handleStockDelete (q) {
      this.$confirm('确认退市?', '退市提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const formData = new FormData()
        formData.append('id', q.id)
        await stockDelete(formData)
        this.handleStockGetAllList()
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    },
    // 更新股票信息
    handleToUpdate (q) {
      this.dialogToUpdate = true
      this.update.id = q.id
    },
    async handleUpSuccess () {
      try {
        const update = this.update
        await stockUpdate(update)
        this.handleStockGetAllList()
        this.update.fullname = ''
        this.update.shortname = ''
        this.update.initial_name = ''
        this.update.symbol = ''
        this.dialogToUpdate = false
      } catch (error) {
        
      }
      
    }
  },
  watch: {}
}
</script>

<style lang="less" scoped>
.filter-card {
  margin-bottom: 15px;
  .el-form-item {
    width: 350px;
  }
}
</style>
