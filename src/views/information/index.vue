<template>
  <div>
    <el-card>
      <div slot="header" class="header-box">
        <span>要闻资讯-添加要闻</span>
        <el-button size="small" type="primary" @click="handleRelease">发布</el-button>
      </div>
      <el-row>
        <el-form ref="form" :model="articleForm" label-width="80px">
          <div>
            <el-form-item label="标题">
              <el-input v-model="articleForm.title"></el-input>
            </el-form-item>
            <el-form-item label="要闻来源">
              <el-input v-model="articleForm.resource"></el-input>
            </el-form-item>
            <el-form-item label="内容">
              <quill-editor v-model="articleForm.content"
                ref="myQuillEditor"
                :options="editorOption"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @ready="onEditorReady($event)">
              </quill-editor>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="图片">
              <el-upload
                class="upload-demo"
                action="/api/file/uploadImg"
                :on-success="handleSuccess"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
              </el-upload>
            </el-form-item>
          </div>
        </el-form>
      </el-row>
    </el-card>
   </div>
</template>
<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

import { newsAdd } from '@/api/information'
export default {
  name: 'InformationIndex',
  data () {
    return {
      articleForm: {
        title: '',
        content: '',
        resource: '',
        img: '',
      },
      editorOption: {},  // 富文本配置
      dialogVisible: false,
      fileList: []
    }
  },
  components: {
    quillEditor
  },
  computed: {},
  mounted () {},
  methods: {
    async onEditorBlur () {},
    async onEditorFocus () {},
    async onEditorReady () {},
    // 上传图片
    handleSuccess (response, file, fileList) {
      this.articleForm.img = file.response.result.slice(7)
    },
    handleRemove (file, fileList) {
      console.log(file, fileList);
    },
    handlePreview (file) {
      console.log(file);
    },
    async handleRelease () {
      try {
        const release = this.articleForm
        const res = await newsAdd(release)
        if(res.data.status) {
          this.$message({
            message: '添加要闻成功',
            type: 'success'
          })
          this.articleForm = ''
        } else {
          this.$message.error('添加失败')
        }
      } catch (error) {
        
      }
    }
  },
  watch: {}
}
</script>

<style lang="less" scoped>
.header-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-form {
  display: flex;
}
</style>
