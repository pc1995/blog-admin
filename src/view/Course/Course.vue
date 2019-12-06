<template>
  <wrapper>
    <div class="video" slot="content">
      <Card>
        <Form inline :label-width="100">
          <FormItem label="文章标题">
            <Input placeholder="文章标题" type="text" style="width: 200px"/>
          </FormItem>
          <FormItem label="发布时间">
            <DatePicker type="date" placeholder="Select date" style="width: 200px"></DatePicker>
          </FormItem>
          <FormItem :label-width="0">
            <Button type="primary">查询</Button>
          </FormItem>
        </Form>
        <Button type="primary" @click="add">新增教程</Button>
      </Card>

      <div class="table-content">
        <Table :columns="columns" width="100%" :data="dataSource"></Table>
        <div class="page-wrapper">
          <Page :total="page.total" show-sizer />
        </div>
      </div>
      <Modal class="add-modal" v-model="visible" :loading="loading" width="1000px" :title="editType === 'add' ? '新增' : '修改'" @on-ok="save">
        <div class="markdown-edit" v-if="visible">
          <div class="markdown-form">
            <Form ref="form" :label-width="80" :model="formData">
              <FormItem label="标题" prop="title">
                <Input v-model="formData.title" placeholder="视频标题"/>
              </FormItem>
              <FormItem label="视频类型" prop="type">
                <Select v-model="formData.type" style="width: 200px">
                  <Option v-for="item in videoType" :value="item.id" :key="item.id">{{ item.label }}</Option>
                </Select>
              </FormItem>
              <FormItem label="上传视频" prop="link">
                <Upload :before-upload="handleUpload" action="">
                  <Button icon="ios-cloud-upload-outline" id="uploadVideo">视频上传</Button>
                </Upload>
                <Progress :percent="progress" status="active" />
              </FormItem>
              <FormItem label="简介" prop="desc">
                <Input v-model="formData.desc" type="textarea" placeholder="视频描述"/>
              </FormItem>
              <FormItem label="封面" prop="imgSrc">
                <blog-upload @response="response" v-model="formData.img_src"></blog-upload>
              </FormItem>

              <FormItem :label-width="0" prop="markdownContent">
                <mavon-editor code-style="github"
                              ref="md"
                              :subfield="subField"
                              @subfieldToggle="subFieldToggle"
                              @save="save"
                              @change="change"
                              @imgAdd="imgAdd"
                              v-model="formData.markdownContent"
                              style="min-height: 500px"
                ></mavon-editor>
              </FormItem>
            </Form>
          </div>
        </div>
      </Modal>
    </div>
  </wrapper>
</template>

<script>
  import Wrapper from '../../components/Wrapper/Wrapper';
  import Columns from './columns';
  import BlogUpload from '../../components/BlogUpload/BlogUpload';
  import md5 from 'blueimp-md5'

  import * as Qiniu from 'qiniu-js'
  const FORM_DATA = {
    title: '',
    type: 1,
    img_src: '',
    desc: '',
    markdownContent: ''
  }
  export default {
    name: "Course",
    data() {
      return {
        dataSource: [],
        page: {
          total: 0
        },
        visible: false,
        columns: Columns(this),
        videoType: [
          {
            label: 'React',
            id: 1,
          },
          {
            label: 'Vue',
            id: 2,
          },
          {
            label: 'Flutter',
            id: 3,
          }
        ],
        loading: true,
        formData: JSON.parse(JSON.stringify(FORM_DATA)),
        editType: 'add',
        subField: true,
        markdown: '',
        content: '',
        videoFile: '',
        progress: 0,
        videoKey: ''
      }
    },
    created() {
      this.getList();
    },
    methods: {
      add() {
        this.visible = true;
      },
      getList() {
        this.$axios('/v1/api/course').then(res => {
          if (res.state === 0) {
            this.dataSource = res.data
          }
        })
      },
      save(value = this.markdown, render = this.content) {
        this.loading = true;
        const body = this.formData;
        body.content = render
        body.markdown = value
        if (this.editType  === 'edit') {
          body.id = this.currentId
        }
        if (this.videoKey) {
          body.video_key = this.videoKey
        }
        this.$axios('/v1/api/course', {
          method: this.editType === 'add' ? 'POST' : 'PATCH',
          body: body
        }).then(res => {
          console.log('upload video', res)
          this.loading = false;
          this.visible = false;
          this.getList()
        })
      },
      response(data) {
        console.log('data', data)
        this.formData.img_src = data
      },
      modify(row) {
        this.formData = {
          title: row.title,
          type: row.type,
          video_key: row.video_key,
          img_src: row.img_src,
          desc: row.desc
        };
        this.currentId = row.id
        this.visible = true;
        this.editType = 'edit'
      },
      delete(row) {

      },
      subFieldToggle(status, value) {
        this.subField = status
      },
      change(value, render) {
        this.markdown = value
        this.content = render
      },
      imgAdd(pos, file) {
        const formData = new FormData()
        console.log('file', file)
        formData.append('image', file)
        console.log('imgAdd', formData.get('image'))
        this.upload(pos, formData)
      },
      handleUpload(file) {
        this.videoFile = file;
        this.uploadVideo()

        return false;
      },
      uploadVideo() {
        this.$axios('/v1/api/token', {
          method: 'POST'
        }).then(res => {
          const key = md5((new Date().getTime()).toString());
          const observable = Qiniu.upload(this.videoFile, key, res.data.token)
          const sub = observable.subscribe(this.next, this.error, this.complete)
        })
      },
      next(res) {
        this.progress = parseInt(res.total.percent)
      },
      error(err) {
      },
      complete(res) {
        console.log('com', res)
        this.videoKey = res.key
      }
    },
    components: {
      Wrapper,
      BlogUpload
    },
    watch: {
      visible(val) {
        if (!val) {
          this.loading = true;
        }
      }
    }
  }
</script>

<style scoped>

</style>
