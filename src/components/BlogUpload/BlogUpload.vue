<template>
  <div>
    <Upload
      :before-upload="handleUpload"
      action="">
      <Button icon="ios-cloud-upload-outline">选取图片</Button>
      <span class="tips">只能上传 jpg 、 jpeg 、 png 文件名不能包含中文 文件</span>
    </Upload>
    <img class="upload-img" v-if="fileImage" width="100" :src="fileImage" alt="">
    <Button class="upload-btn" v-if="fileImage" type="success" @click="upload">点击上传</Button>
  </div>
</template>

<script>
  export default {
    name: "BlogUpload",
    props: {
      value: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        file: null,
        fileImage: this.value || '',
        formData: null
      }
    },
    methods: {
      handleUpload (file) {
        this.file = file;
        this.formData = new FormData()
        this.formData.append('image', file)
        const reader = new FileReader()
        reader.readAsDataURL(this.file)
        reader.onload = (fileEvent) => {
          this.fileImage = fileEvent.target.result
        }
        return false;
      },
      upload() {
        this.$store.dispatch('article/upload', this.formData).then(res => {
          this.$emit('response', res.data[0])
          if (res.state === 0) {
            this.$Message.success('上传成功')
          }
        })
      }
    },
    watch: {
      value(val) {
        this.fileImage = val
      }
    }
  }
</script>

<style lang="less" scoped>
  .upload-img {
    display: block;
  }
  .upload-btn {
    margin-top: 8px;

  }
  .tips {
    font-size: 12px;
    margin-left: 10px;
    color: #ddd;
  }
</style>
