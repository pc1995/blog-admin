<template>
  <div class="article" slot="content">
    <Card>
      <Form inline :label-width="100">
        <FormItem label="所属分类">
          <Select v-model="query.category_type" style="width: 180px">
            <Option v-for="item in categoryData" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </FormItem>
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
      <Button type="primary" @click="addArticle">新增文章</Button>
    </Card>
    <div class="table-content">
      <Table :columns="columns" width="100%" :data="dataSource"></Table>
      <div class="page-wrapper">
        <Page :total="page.total" show-sizer />
      </div>
    </div>
    <!---- 新增 --->
    <Modal class="add-modal" v-model="visible" loading width="1000px" title="新增" @on-ok="save">
      <div class="markdown-edit" v-if="visible">
        <div class="markdown-form">
          <Form ref="form" :label-width="80" :model="formData" :rules="rules">
            <FormItem label="所属栏目" prop="article_type">
              <Select v-model="formData.article_type" v-if="categoryData.length > 0" style="width: 200px">
                <Option v-for="(item, index) in categoryData" v-if="item.id" :value="item.id" :key="index">{{ item.name }}</Option>
              </Select>
            </FormItem>
            <FormItem label="标题" prop="articleTitle">
              <Input v-model="formData.articleTitle" placeholder="文章标题"/>
            </FormItem>
            <FormItem label="选择标签" prop="tagList" >
              <Select v-model.sync="formData.tagList" filterable multiple v-if="tagList.length > 0">
                <Option v-for="(item, index) in tagList" :key="index" v-if="item.name" :value="item.name">{{item.name}}</Option>
              </Select>
            </FormItem>
            <FormItem label="简介" prop="articleDesc">
              <Input v-model="formData.articleDesc" type="textarea" placeholder="文章描述"/>
            </FormItem>
            <FormItem label="封面" prop="imgSrc">
              <blog-upload @response="response" v-model="formData.imgSrc"></blog-upload>
            </FormItem>
            <FormItem label="上传视频" prop="link">
              <Upload :before-upload="handleUpload" action="">
                <Button icon="ios-cloud-upload-outline" id="uploadVideo">视频上传</Button>
              </Upload>
              <Progress :percent="progress" status="active" />
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
    <Modal v-model="delVisible" title="删除分类" loading @on-ok="deleteData">
      <p>是否删除当前文章？点击确认删除</p>
    </Modal>
  </div>
</template>

<script>
  import Wrapper from '../../components/Wrapper/Wrapper'
  import BlogUpload from '../../components/BlogUpload/BlogUpload'
  import Columns from './columns'
  import {formatDate} from '../../utils/format'
  import md5 from 'blueimp-md5'
  import * as Qiniu from 'qiniu-js'
  const FORM_DATA = {
    articleTitle: '',
    articleDesc: '',
    imgSrc: '',
    first_type: '',
    second_type: '',
    category_type: '',
    markdownContent: '',
    article_type: 1,
    tagList: []
  }
  export default {
    name: "Article",
    data() {
      return {
        query: {
          article_type: '',
          category_type: ''
        },
        category_text: '',
        visible: false,
        subField: true,
        markdownContent: '',
        formData: JSON.parse(JSON.stringify(FORM_DATA)),
        dataSource: [],
        columns: Columns(this),
        categoryData: [],
        firstCategory: [],
        secondCategory: [],
        isChange: false,
        currentData: null,
        markdown: '',
        content: '',
        rules: {
          columns_id: [
            {required: true, message: '请选择所属栏目'},
          ],
          articleTitle: [
            {required: true, message: '请输入文章标题'},
          ],
          articleDesc: [
            {required: true, message: '请输入文章描述'},
          ],
          article_type: [
            {required: true, message: '请选择文章类型'},
          ],
          imgSrc: [
            {required: false, message: '请上传封面图片'},
          ],
          markdownContent: [
            {required: true, message: '请输入文章内容'},
          ]
        },
        page: {
          pageSize: 10,
          page: 1,
          total: 0
        },
        delVisible: false,
        videoFile: '',
        progress: 0,
        videoKey: '',
        tagList: []
      }
    },
    created() {
      this.getArticle()
      this.getCategoryList();
      this.getTagList();
    },
    methods: {
      addArticle() {
        this.visible = true
        this.isChange = false
        this.formData = JSON.parse(JSON.stringify(FORM_DATA))
      },
      subFieldToggle(status, value) {
        this.subField = status
      },
      response(data) {
        console.log('data', data)
        this.formData.imgSrc = data
      },
      getArticle() {
        const {page, pageSize} = this.page
        const opt = {
          page: page,
          page_size: pageSize,
          // is_video: 0
        }
        this.$store.dispatch('article/article', {
          body: opt
        }).then(res => {
          this.dataSource = res.data;
          this.page.total = res.attributes.total + 100
        })
      },
      imgAdd(pos, file) {
        const formData = new FormData()
        console.log('file', file)
        formData.append('image', file)
        console.log('imgAdd', formData.get('image'))
        this.upload(pos, formData)
      },
      upload(pos, formData) {
        console.log('formData', formData)
        this.$store.dispatch('article/upload', formData).then(res => {
          this.$emit('response', res.data)
          if (res.state === 0) {
            this.$Message.success('上传成功')
            this.$refs.md.$img2Url(pos, res.data[0])
          }
        })
      },
      save(value = this.markdown, render = this.content) {
        this.$refs.form.validate(valid => {
          if (valid) {
            const payload = {
              title: this.formData.articleTitle,
              desc: this.formData.articleDesc,
              content: render,
              markdown: value,
              img_src: this.formData.imgSrc,
              article_type: this.formData.article_type,
              category_type: this.category_text,
              is_video: false
            }
            console.log('payload', payload)
            payload.category_type = this.formData.tagList.join(',')
            console.log('this.isChange', this.isChange)
            if (this.isChange) {
              payload.id = this.currentData.id
              for (let key in payload) {
                if (!payload[key]) delete payload[key]
              }
              payload.update_time = formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')
            } else {
            }
            if (this.videoKey) {
              payload.video_key = this.videoKey
            }
            console.log('console.log()')

            this.$store.dispatch('article/article', {
              method: this.isChange ? 'PATCH' : 'POST',
              body: payload
            }).then(res => {
              this.visible = false
              this.getArticle()
              this.$Message.success(res.message)
            })
          }
        })
      },
      getCategoryList() {
        this.$store.dispatch('article/category').then(res => {
          this.categoryData = res.data
        })
      },
      async getTagList() {
        const res = await this.$store.dispatch('tag/getTagList');
        this.tagList = res.data;
      },
      modifyArticle(row) {
        this.visible = true
        this.isChange = true
        this.formData = {
          articleTitle: row.title,
          articleDesc: row.desc,
          imgSrc: row.img_src,
          category_type: row.category_type,
          article_type: row.article_type,
          tagList: row.category_type.split(',')
        }
        this.formData.markdownContent = row.markdown
        this.currentData = row
      },
      deleteArticle(row) {
        this.delVisible = true
        this.currentData = row;
        this.deleteData()
      },
      deleteData() {
        this.$store.dispatch('article/article', {
          method: 'DELETE',
          params: {
            id: this.currentData.id
          }
        }).then(res => {
          this.$Message.success(res.message)
          this.getArticle()
          this.delVisible = false
        })
      },
      change(value, render) {
        this.markdown = value
        this.content = render
      },
      update(body) {
        this.$store.dispatch('article/article', {
          method: 'PATCH',
          body: body
        }).then(res => {
          this.$Message.success(res.message)
          this.getArticle()
        })
      },

      handleUpload(file) {
        this.videoFile = file;
        this.uploadVideo()

        return false;
      },
      uploadVideo() {
        console.log('videoFile', this.videoFile)
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
          this.formData = JSON.parse(JSON.stringify(FORM_DATA))
        }
      }
    }

  }
</script>

<style lang="less" scoped>
  .article {
    /deep/.m-content {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      margin: 10px;
    }

  }
  .add-modal {
    /deep/.ivu-select-dropdown {
      z-index: 1600;
    }
  }
</style>
<style>

</style>
