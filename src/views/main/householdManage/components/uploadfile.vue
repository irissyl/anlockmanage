<template>
  <el-dialog title="上传文件" :visible.sync="dialogVisible" width="40%" @close="handleClose">
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
        :file-list="fileList"
        :limit="1"
        accept=".xlsx"
      >
        <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
        <div slot="tip" class="el-upload__tip">只能上传xlsx格式的表格文件</div>
      </el-upload>
  </el-dialog>
</template>

<script>
export default {
  name: 'AnlockmanageUploadfile',

  data () {
    return {
        dialogVisible: false,
        fileList: []  
    };
  },

  mounted () {

  },

  methods: {
    showEdit(){
      this.dialogVisible = true
    },
     handleSuccess(response, file, fileList) {
      // 上传成功后的处理逻辑
      console.log(response);
    },
    beforeUpload(file) {
      // 文件类型、大小等的校验逻辑
      const isXLSX = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      if (!isXLSX) {
        this.$message.error('只能上传xlsx格式的表格文件');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过 2MB');
      }
      return isXLSX && isLt2M;
    },
    handleClose() {
      this.dialogVisible = false
    }
  },
};
</script>

<style lang="scss" scoped>
</style>